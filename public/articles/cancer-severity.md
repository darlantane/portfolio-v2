
In my Data Analyst Lead program at Jedha, I explored a rich dataset of 50,000 cancer patients (2015–2024) with one objective: **Identify the most influential factors on cancer severity**, using both **statistical correlation** and **machine learning**.

The analysis spanned clinical, environmental, and behavioral data—and was built using Metabase, SQL, and Python’s `RandomForestRegressor`.

---

## 🔍 Dataset Overview

- **50,000 records** of patients
- Quantitative variables: `Age`, `Air_Pollution`, `Alcohol_Use`, `Smoking`, `Obesity_Level`, `Genetic_Risk`
- Categorical variables: `Gender`, `Region`, `Cancer_Type`, `Cancer_Stage`
- Target variable: `Target_Severity_Score` (composite index from 1 to 10)

---

## 🧪 Step 1 – Correlation Analysis with SQL

To quantify the linear relationships between predictors and severity, I wrote custom SQL queries like this one:

```sql
SELECT 
  -- Correlation between Smoking and Severity
  (AVG(Smoking * Target_Severity_Score) - AVG(Smoking) * AVG(Target_Severity_Score)) / 
    (STDDEV(Smoking) * STDDEV(Target_Severity_Score)) AS corr_smoking,

  -- Genetic risk
  (AVG(Genetic_Risk * Target_Severity_Score) - AVG(Genetic_Risk) * AVG(Target_Severity_Score)) / 
    (STDDEV(Genetic_Risk) * STDDEV(Target_Severity_Score)) AS corr_genetic,

  -- Air pollution
  (AVG(Air_Pollution * Target_Severity_Score) - AVG(Air_Pollution) * AVG(Target_Severity_Score)) / 
    (STDDEV(Air_Pollution) * STDDEV(Target_Severity_Score)) AS corr_pollution,

  -- Alcohol consumption
  (AVG(Alcohol_Use * Target_Severity_Score) - AVG(Alcohol_Use) * AVG(Target_Severity_Score)) / 
    (STDDEV(Alcohol_Use) * STDDEV(Target_Severity_Score)) AS corr_alcohol,

  -- Obesity levels
  (AVG(Obesity_Level * Target_Severity_Score) - AVG(Obesity_Level) * AVG(Target_Severity_Score)) / 
    (STDDEV(Obesity_Level) * STDDEV(Target_Severity_Score)) AS corr_obesity,

  -- Age (surprisingly not significant)
  (AVG(Age * Target_Severity_Score) - AVG(Age) * AVG(Target_Severity_Score)) / 
    (STDDEV(Age) * STDDEV(Target_Severity_Score)) AS corr_age
FROM global_cancer_patients;
```

🧠 **Results**: Smoking and genetic risk showed the highest correlations (~0.48 each).

---

## 🌲 Step 2 – Feature Importance with Random Forest

To move beyond linear assumptions, I used a Random Forest model to measure **relative importance**.

```python
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Load data
df = pd.read_csv("global_cancer_patients_2015_2024.csv")

# Features & target
X = df[["Age", "Genetic_Risk", "Air_Pollution", "Alcohol_Use", "Smoking", "Obesity_Level"]]
y = df["Target_Severity_Score"]

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Fit model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Display importance
feature_importance = pd.Series(model.feature_importances_, index=X.columns).sort_values(ascending=False)
print(feature_importance)
```

📊 **Top Factors by Importance**:
- `Smoking`: 0.27  
- `Genetic_Risk`: 0.26  
- `Air_Pollution`: 0.16  
- `Alcohol_Use`: 0.15  
- `Obesity_Level`: 0.09  
- `Age`: 0.04  

---

## 📈 Visual Summary (Metabase Dashboard)

![Cancer Dashboard](/articles/illustrations/dashboard1.png)

---

## ✅ Key Findings

- **Smoking** and **genetic risk** are consistently the most predictive factors, both linearly and via ML.
- **Pollution and alcohol** are moderately influential.
- **Age has minimal direct effect**, despite assumptions.
- **Cancer types** most represented: Breast, Colon, Lung.
- Majority of cases are diagnosed in **early stages (0–II)**.
- **Gender balance** is roughly equal across patients.
- Slight overrepresentation from **USA, India, and Canada**.
- Cost/survival analysis shows **high variance** in treatment paths.

---

## 🧠 Lessons Learned

This project taught me how to:
- Combine **low-code BI tools** with **custom SQL queries**
- Integrate **machine learning** to go beyond linear insights
- Structure a reproducible, visual storytelling workflow

It was a technical, analytical, and human challenge all in one.

