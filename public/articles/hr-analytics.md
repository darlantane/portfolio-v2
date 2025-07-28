*Exploration with Python (`pandas`, `statsmodels`, `scikit‑learn`) — end‑to‑end EDA, modelling and practical recommendations.*

> **Disclaimer.** This analysis uses public/educational datasets and statistical models for learning purposes. It does **not** replace professional HR, legal or clinical advice. Burnout is a serious topic — results show **associations**, not medical diagnoses or causal proofs.

---

## 🧭 Executive Summary

I ran a two‑part study to answer two questions HR teams ask all the time:

1) **Which factors are most associated with employee salary?**  
2) **Given common HR signals (stress, satisfaction, workload…), can we estimate the risk of burnout to trigger early support?**

**What I found**

- 🎓 **Education** and 📈 **experience** are strong salary drivers; **job title** explains a large share of variance; **gender** differences exist but are smaller than role/experience effects.  
- 🔥 **Perceived stress** is the strongest predictor of burnout probability; **very long workweeks** increase risk; **remote ratio** is not automatically protective — without guardrails it can amplify isolation.  
- 📌 The models are intentionally simple (linear & logistic regression) to keep them **interpretable** and easy to deploy as rule‑of‑thumb companions to HR judgement.

---

## 🗂️ Data at a Glance

Two datasets were used:

- **Compensation**: age, gender, education level, job title, years of experience, salary.  
- **Well‑being**: age, gender, role, experience, weekly hours, remote ratio, satisfaction and stress levels, binary **burnout** flag.

> Both were cleaned for missing values and encoded for modelling; code below shows the key steps you can adapt to your own HRIS exports.

---

## 🧪 Part 1 — **Salary Modelling** (Multiple Linear Regression)

### 1) Exploratory Analysis (selected visuals)

**Average salary by education level**  
![Average salary by education (bar chart)](/articles/illustrations/education_level-salary.png)

**Top 20 job titles by average salary**  
![Average salary by job title (bar chart)](/articles/illustrations/job_title-salary.png)

**Correlation scan among numeric fields**  
![Correlation heatmap — Age, Years of Experience, Salary](/articles/illustrations/correlations1.png)

> These figures show a clear **education gradient** (Bachelor → Master → PhD), a **positive relationship to experience**, and non‑trivial gaps across **job families**.

### 2) Reproducible EDA Snippets

```python
import pandas as pd, numpy as np, seaborn as sns, matplotlib.pyplot as plt

# Example load
comp = pd.read_csv("compensation.csv")

# Salary by education
sns.barplot(x="Education Level", y="Salary", data=comp, estimator=np.mean, errorbar=None)
plt.xticks(rotation=45); plt.title("Average salary by education level"); plt.show()

# Top 20 best‑paid job titles
top20 = (comp.groupby("Job Title")["Salary"].mean()
         .sort_values(ascending=False).head(20).reset_index())
sns.barplot(x="Job Title", y="Salary", data=top20, estimator=np.mean, errorbar=None)
plt.xticks(rotation=90); plt.title("Top 20 job titles by average salary"); plt.show()

# Numerical correlations (quick scan)
sns.heatmap(comp.corr(numeric_only=True), annot=True, cmap="coolwarm")
plt.title("Correlations among numeric variables"); plt.show()
```

### 3) Interpretable OLS (statsmodels)

```python
import statsmodels.formula.api as smf

# Fit OLS with categorical encodings handled by Patsy
model = smf.ols(
    'Salary ~ Age + Gender + Q("Education Level") + Q("Job Title") + Q("Years of Experience")',
    data=comp
).fit()

print(model.summary())
```

**Reading the outputs**  
- Coefficients show **marginal effects**, holding other variables constant.  
- Use the first category of each factor as the **reference** to interpret dummies.  
- Focus on **sign**, **magnitude**, **p‑value** and **Adj. R²**.

**Illustrative point prediction**

```python
new_employee = pd.DataFrame({
    "Age": [32.0],
    "Gender": ["Male"],
    "Education Level": ["Bachelor's"],
    "Job Title": ["Software Engineer"],
    "Years of Experience": [5.0],
})
predicted_salary = model.predict(new_employee)
float(predicted_salary.iloc[0])
# → 147782.295088  (illustrative value from a sample run)
```

> Prefer **prediction intervals** (e.g., ±2 SE) around point estimates; salary distributions are noisy and often right‑skewed.

---

## 🔥 Part 2 — **Burnout Risk** (Logistic Regression)

### 1) Features & Modelling Strategy

We model a binary outcome **Burnout ∈ {0,1}** using:

- `Age, Gender, JobRole, Experience, WorkHoursPerWeek, RemoteRatio, SatisfactionLevel, StressLevel`.

I start with **logistic regression** for transparency, check multicollinearity with **VIF**, then evaluate **ROC‑AUC** and discuss **operational thresholds**.

```python
import statsmodels.formula.api as smf

wb = pd.read_csv("wellbeing.csv")

logit = smf.logit(
    'Burnout ~ Age + Gender + JobRole + Experience + WorkHoursPerWeek + RemoteRatio + SatisfactionLevel + StressLevel',
    data=wb
).fit()
print(logit.summary())
```

#### Multicollinearity (VIF)

```python
from statsmodels.stats.outliers_influence import variance_inflation_factor
from patsy import dmatrices

y, X = dmatrices(
    'Burnout ~ Age + Gender + JobRole + Experience + WorkHoursPerWeek + RemoteRatio + SatisfactionLevel + StressLevel',
    data=wb, return_type='dataframe'
)

vif = pd.DataFrame({
    "Variable": X.columns,
    "VIF": [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]
})
print(vif)
# Typical outcome from my run:
# Intercept ≈ 51.8; all other VIFs ≈ 1–1.7 → acceptable collinearity levels
```

#### Evaluation (ROC‑AUC, calibration & thresholding)

```python
from sklearn.metrics import roc_auc_score, confusion_matrix

proba = logit.predict(wb)  # predicted probability of Burnout=1
auc = roc_auc_score(wb["Burnout"], proba)

# Set an *operational* threshold (e.g., 0.30) for early‑warning outreach
threshold = 0.30
pred = (proba >= threshold).astype(int)
cm = confusion_matrix(wb["Burnout"], pred)

print({"roc_auc": auc, "confusion_matrix": cm.tolist()})
```

### 2) Interpreting the Coefficients

- **StressLevel** → the largest positive coefficient (strongest association).  
- **WorkHoursPerWeek** → positive, especially above ~55–60 hours.  
- **SatisfactionLevel** → negative (higher satisfaction, lower risk).  
- **RemoteRatio** → mixed; effect depends on context (team rituals, support, role).

### 3) Example Scoring

```python
test_person = pd.DataFrame({
    "Age": [52],
    "Gender": ["Male"],
    "JobRole": ["Sales"],
    "Experience": [8],
    "WorkHoursPerWeek": [61],
    "RemoteRatio": [23],
    "SatisfactionLevel": [1.24],  # scale as per dataset
    "StressLevel": [10]
})
float(logit.predict(test_person).iloc[0])
# → 0.990265  (illustrative probability from a sample run)
```

> 🔎 Treat predicted probabilities as **screening signals**.  
> They are **not** diagnoses; use them to inform support workflows (e.g., nudges to managers, optional well‑being check‑ins).

---

## 🧰 From Insight to Action — HR Playbook

**Compensation**  
- Align salary bands with **education & experience ladders**; quantify role premia per market.  
- Review **title inflation** vs. responsibility to keep pay structures coherent.  
- Monitor **equity** by gender/role/tenure with regular fairness audits.

**Burnout Prevention**  
- Instrument **stress & satisfaction pulses** (short, anonymous, regular).  
- Watch **excessive hours** and create **team‑level guardrails** (rotations, on‑call limits).  
- Make remote effective: **rituals, mentorship, inclusion**, not just tools.  
- Provide **confidential support channels** and train managers on early signals.

---

## 🛠️ Tech Stack & Reproducibility

- **Python** (pandas, seaborn/matplotlib), **statsmodels** (OLS/logit), **scikit‑learn** (metrics).  
- Notebooks and scripts can be bundled as a small pipeline (EDA → modelling → scoring).  
- Keep a **data dictionary** and **model cards** for governance (targets, features, evaluation windows, bias checks).

---

## ✅ Key Takeaways (TL;DR)

- Salary: **education, experience, and job family** matter most; use **interpretable OLS** to expose drivers and ranges.  
- Burnout: **stress and workload** are red flags; **logistic regression** offers a transparent score that HR can review alongside qualitative context.  
- Above all: treat models as **decision support**, not decision makers.

---

*If you’d like the article in French, I can provide a localized version.*
