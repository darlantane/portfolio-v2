Generating Text with Neural Networks: from Bigram to Mini-GPT

As part of my deep learning journey, I built several character-level text generation models using PyTorch:

- Bigram (statistical)
- MLP (feedforward network)
- LSTM (sequential model)
- Transformer (attention)

The goal is simple: train a model to generate realistic first names from an existing list.

---

## 1. Load the data

We start by reading a file containing names:

```Python
def load_words(path="names.txt"):
    with open(path, "r", encoding="utf-8") as f:
        return f.read().splitlines()


w = load_words()
words = w[:30]
```

Here we intentionally limit the dataset to keep training fast. 

---

## 2. Build the vocabulary

We extract all unique characters:

```Python
chars = sorted(list(set(''.join(words))))
stoi = {s:i+1 for i,s in enumerate(chars)}
stoi['.'] = 0
itos = {i:s for s,i in stoi.items()}
vocab_size = len(stoi)
```

We introduce a special token:

- . → end of word

Each character becomes an integer.

---

## 3. Transform words into a dataset

We transform each word into a sequence of predictions:

- context → next character

With a context size of 3:

```Python
block_size = 3
X, Y = [], []

for w in words:
    context = [0] * block_size
    for ch in w + '.':
        ix = stoi[ch]
        X.append(context)
        Y.append(ix)
        context = context[1:] + [ix]

X = torch.tensor(X)
Y = torch.tensor(Y)
```

Result:
- X: contexts (inputs)
- Y: target characters

---

## 4. Model 1 - Bigram

The simplest model: P(next_char | current_char)

We count transitions:

```Python
def train_bigram(words):
    N = torch.zeros((vocab_size, vocab_size))

    for w in words:
        chs = ['.'] + list(w) + ['.']
        for ch1, ch2 in zip(chs, chs[1:]):
            i = stoi[ch1]
            j = stoi[ch2]
            N[i, j] += 1
```

Then we normalize to obtain probabilities: 

```Python
    P = (N + 1)
    P /= P.sum(1, keepdim=True)
    return P

P = train_bigram(words)
```

Generation :

```Python
def generate_bigram(P):
    out = []
    ix = 0
    while True:
        p = P[ix]
        ix = torch.multinomial(p, num_samples=1).item()
        if ix == 0:
            break
        out.append(itos[ix])
    return ''.join(out)
```

Limit: the model only looks at one character. 

---

## 5. Model 2 - MLP (Makemore)

### Model creation :

- We introduce a neural network:

```Python
class MakemoreMLP(nn.Module):
    def __init__(self, vocab_size, block_size, n_embd=10,n_hidden=200):
        super().__init__()
```

- Embedding

```Python
        self.embedding = nn.Embedding(vocab_size, n_embd)
        self.fc1 = nn.Linear(block_size * n_embd, n_hidden)
        self.fc2 = nn.Linear(n_hidden, vocab_size)
```

Characters are converted into vectors.

- Flatten

```Python
    def forward(self, x):
        emb = self.embedding(x)
        x = emb.view(emb.shape[0], -1)
```

Concatenates the context embeddings.

- Hidden layer

```Python
        x = torch.tanh(self.fc1(x))
```

Adds nonlinearity.

- Output

```Python
        logits = self.fc2(x)
        return logits

model = MakemoreMLP(vocab_size, block_size)
```

The model outputs a probability distribution over characters. 

### Training the MLP

Classic loop:

```Python
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

for step in range(20000):
    logits = model(X)
    loss = F.cross_entropy(logits, Y)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    if step % 2000 == 0:
        print(f"step {step}: loss = {loss.item():.4f}")
```

Cross-entropy measures the gap between:
- predictions
- ground truth

### Generation with the MLP

```Python
def generate(model, max_length=20):
    out = []
    context = [0] * block_size

    for _ in range(max_length):
        x = torch.tensor([context])
        logits = model(x)
        probs = F.softmax(logits, dim=1)
        ix = torch.multinomial(probs, num_samples=1).item()

        if ix == 0:
            break

        out.append(itos[ix])
        context = context[1:] + [ix]

    return ''.join(out)
```

We generate characters one by one until we reach the token.

Limit: fixed context window. 

---

## 6. Model 3 - LSTM

We move to a sequential model:

```Python
class CharLSTM(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.linear = nn.Linear(hidden_dim, vocab_size)

    def forward(self, x):
        emb = self.embedding(x)
        out, _ = self.lstm(emb)
        logits = self.linear(out)
        return logits

model = CharLSTM(vocab_size, embed_dim=16, hidden_dim=128)
```

Advantage: The model can learn long-term dependencies

### Building the LSTM dataset

We adapt the dataset:

```Python
block_size = 8

def build_dataset(words):
    X, Y = [], []

    for w in words:
        chs = ['.'] + list(w) + ['.']
        for i in range(len(chs)-1):
            context = chs[:i+1]
            target = chs[i+1]

            context = context[-block_size:]
            context = ['.'] * (block_size - len(context)) + context

            X.append([stoi[c] for c in context])
            Y.append(stoi[target])

    return torch.tensor(X), torch.tensor(Y)

X, Y = build_dataset(words)
```

We maintain a dynamic window.

### Generation using LSTM

Same principle:

```Python
def generate_lstm(model):
    out = []
    context = [0] * block_size

    while True:
        x = torch.tensor([context])
        logits = model(x)
        probs = torch.softmax(logits[:, -1, :], dim=1)

        ix = torch.multinomial(probs, 1).item()

        if ix == 0:
            break

        out.append(itos[ix])
        context = context[1:] + [ix]

    return ''.join(out)
```

The LSTM generally generates more coherent first names.

---

## 7. Model 4 - Transformer (MiniGPT)

### Model creation

We implement a simplified version of GPT.

```Python
class MiniGPT(nn.Module):
    def __init__(self, vocab_size, block_size, n_embd=64, n_head=4, n_layer=2):
        super().__init__()
```

- Embeddings

```Python
        self.token_embedding = nn.Embedding(vocab_size, n_embd)
        self.position_embedding = nn.Embedding(block_size, n_embd)
```

Add the concept of position.

- Transformer Encoder

```Python
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=n_embd,
            nhead=n_head,
            batch_first=True
        )
```

- Causal mask

```Python
        mask = torch.triu(torch.ones(T, T), diagonal=1).bool()
        x = self.transformer(x, mask=mask)
```

Prevents the model from predicting the future.

- Forward

```Python
    def forward(self, x):
        B, T = x.shape

        tok_emb = self.token_embedding(x)
        pos = torch.arange(T)
        pos_emb = self.position_embedding(pos)

        x = tok_emb + pos_emb

        # causal mask
        mask = torch.triu(torch.ones(T, T), diagonal=1).bool()
        x = self.transformer(x, mask=mask)

        x = self.ln(x)
        logits = self.fc(x)

        return logits
```

### Generation with Transformer

```Python
def generate_transformer(model):
    out = []
    context = [0] * block_size

    while True:
        x = torch.tensor([context])
        logits = model(x)

        probs = F.softmax(logits[:, -1, :], dim=1)
        ix = torch.multinomial(probs, 1).item()

        if ix == 0:
            break

        out.append(itos[ix])
        context = context[1:] + [ix]

    return ''.join(out)
```

The Transformer captures global relationships within the sequence.

---

## 8. What this project helps us understand

- Language modeling: Predicting the next character, the foundation of LLMs

- Embeddings: Characters are represented as continuous vectors.

- Cross-entropy: Key function for training models.

- Sampling: Generation relies on probabilistic sampling.

- Modern architectures
* MLP → simple but limited
* LSTM → sequential memory
* Transformer → global attention

---

## Conclusion

This project demonstrates one essential point: a language model is a model that predicts the next token

From Bigrams to Transformers:

- we understand the evolution of models
- we see why Transformers dominate today
- we build a solid intuition about LLMs

And above all: GPT is simply a massive, optimized version of this pipeline.



