
As part of my deep learning journey, I rebuilt the fundamentals of a neural network without using frameworks like PyTorch or TensorFlow.

The goal is simple: understand what really happens behind modern libraries by implementing a minimal automatic differentiation (autograd) engine, inspired by **Andrej Karpathy’s Micrograd project**.

---

## 1. The key idea: computing gradients automatically

Training a neural network relies on three steps:
- a forward pass (computing the output)
- computing a loss function
- a backward pass (backpropagation of gradients)

Modern frameworks automate this step using autograd:
- They build a computation graph.
- Then apply the chain rule to compute gradients.

Here, we implement this mechanism manually.

---

## 2. The fundamental object: Value

Everything is based on a simple class:

```python
class Value:

    def __init__(self, data, _children=(), _op=''):
        self.data = data
        self.grad = 0
        self._backward = lambda: None
        self._prev = set(_children)
        self._op = _op
```

Each Value object contains:
- **data:** the scalar value
- **grad:** the associated gradient
- **_prev:** parent nodes (the graph)
- **_backward:** the local backpropagation function

In other words, each number knows where it comes from and how to propagate its gradient.

---

## 3. Building the computation graph automatically

Each mathematical operation creates a new node in the graph.

**Example: addition**

```python
    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other), '+')

        def _backward():
            self.grad += out.grad
            other.grad += out.grad
        out._backward = _backward

        return out
```

**Example: multiplication**

```python
    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), '*')

        def _backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
        out._backward = _backward

        return out
```

---

## 4. Backpropagation (backward pass)

The core of the system lies here:

```python
    def backward(self):
        topo = []
        visited = set()
```

**Steps:**

- **Topological ordering:**

```python
        def build_topo(v):
            if v not in visited:
                visited.add(v)
                for child in v._prev:
                    build_topo(child)
                topo.append(v)

        build_topo(self)
```

- **Initialization:**

```python
        self.grad = 1
```

- **Reverse traversal:**

```python
        for v in reversed(topo):
            v._backward()
```

This automatically applies the chain rule across the entire graph.

---

## 5. Building neural network components

Once autograd is in place, we can build a network.

```python
class Module:

    def zero_grad(self):
        for p in self.parameters():
            p.grad = 0

    def parameters(self):
        return []
```

This allows resetting gradients.

---

## 6. Implementing a neuron

```python
class Neuron(Module):

    def __init__(self, nin, nonlin=True):
        self.w = [Value(random.uniform(-1,1)) for _ in range(nin)]
        self.b = Value(0)
        self.nonlin = nonlin
```

A neuron contains:
- weights : w
- a bias : b

Forward pass:

```python
    def __call__(self, x):
        act = sum((wi*xi for wi,xi in zip(self.w, x)), self.b)
```

Then:

```python
        return act.relu() if self.nonlin else act
```

We recover exactly:
- dot product
- bias
- activation function

---

## 7. Building a layer

A layer is simply a list of neurons:

```python
class Layer(Module):

    def __init__(self, nin, nout, **kwargs):
        self.neurons = [Neuron(nin, **kwargs) for _ in range(nout)]
```

Forward:

```python
    def __call__(self, x):
        out = [n(x) for n in self.neurons]
        return out[0] if len(out) == 1 else out
```

---

## 8. Building a full network (MLP)

```python
class MLP(Module):

    def __init__(self, nin, nouts):
        sz = [nin] + nouts
```

Then, stacking layers:

```python
        self.layers = [Layer(sz[i], sz[i+1], nonlin=i!=len(nouts)-1) for i in range(len(nouts))]
```

Forward:

```python
    def __call__(self, x):
        for layer in self.layers:
            x = layer(x)
        return x
```

---

## 9. Training the model

A standard training loop:

```python
xs = [
    [2.0, 3.0, -1.0],
    [3.0, -1.0, 0.5],
    [0.5, 1.0, 1.0],
    [1.0, 1.0, -1.0],
]

ys = [1.0, -1.0, -1.0, 1.0]

model = MLP(3, [4, 4, 1])  # 3 entrées → 1 sortie

for k in range(100):
    # FORWARD PASS 
    y_preds = [model(x) for x in xs]

    # LOSS
    losses = [(y_pred - Value(y_true))**2 for y_pred, y_true in zip(y_preds, ys)]
    loss = sum(losses) 

    # BACKWARD
    model.zero_grad()
    loss.backward()
```

Exactly like in PyTorch… except everything here is written from scratch.

---

## 10. What does this project help us understand

This minimalist implementation highlights essential concepts:
- **Computational graph:** Each operation creates a dependency between variables.
- **Backpropagation:** Gradients propagate via the chain rule.
- **Automatic differentiation:** Gradients are computed automatically, without manual derivation.
- **Neural networks:** A network is ultimately just a composition of scalar operations.

---

## Conclusion

This project shows that behind the apparent complexity of deep learning lies a simple idea:
**a neural network = mathematical operations + automatic differentiation**

By rebuilding these mechanisms:
- We truly understand what frameworks do.
- We demystify backpropagation
- We gain a strong intuition about model training.

And most importantly, we realize that PyTorch or TensorFlow “only” automate what you’ve implemented by hand.