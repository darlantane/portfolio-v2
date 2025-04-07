As part of the **Data Analysis Essentials** program at **Jedha Bootcamp**, I worked on a predictive modeling project to estimate a startup’s profitability based on key business factors. This hands-on experience allowed me to apply core data science techniques to a real-world business challenge: understanding what drives profit in early-stage companies.

---

## 🧠 Project Overview

Startups face tough decisions when allocating limited resources. Should they prioritize R&D or pour funds into marketing? Does their geographic location matter? The objective of this project was to build a **regression model** that could provide data-driven answers to such questions by predicting a company’s profit using operational and financial metrics.

---

## 🧪 Methodology

### 🔹 Data Exploration & Preparation

We worked with a dataset of **50 startups**, each described by the following variables:

- **R&D Spending**  
- **Marketing Spend**  
- **Administrative Costs**  
- **Company Location** (a categorical variable)  
- **Profit** (target variable)  

Initial exploration involved visualizing distributions, spotting outliers, and assessing relationships between features. For instance, early scatter plots hinted at a strong positive correlation between R&D investment and profit.

### 🔹 Preprocessing

To prepare the data for modeling:

- ✅ We **encoded the categorical “location” feature** using one-hot encoding.  
- ✅ We **normalized** the numerical features to stabilize the training process and improve model performance.

### 🔹 Model Development

We split the dataset into:

- **80% for training**  
- **20% for testing**  

We then trained a **Linear Regression model**, a reliable and interpretable algorithm ideal for this kind of numerical prediction.

---

## 📊 Model Performance & Visual Insights

The trained model achieved an impressive **93% R² score** on the test set, indicating that it successfully captured the patterns influencing profitability.

### **Model Score:**

![Model Scores](/articles/illustrations/score.png)

The chart above reflects how well the model predicts actual profits, with a near-linear fit between predicted and true values on the test set.

### **Feature Importance:**

![Feature Importance](/articles/illustrations/variables.png)

By examining the regression coefficients, we were able to interpret the influence of each feature:

---

## 📌 Key Insights

### ✅ R&D Investment: The Most Impactful Driver  
Among all variables, **R&D spending stood out as the strongest predictor** of profit. Startups that invested heavily in innovation and product development consistently reported higher profits. This aligns with the idea that strong technical foundations lead to long-term value.

### ✅ Marketing: Still a Key Lever  
While not as powerful as R&D, **marketing expenditure** showed a positive correlation with profitability. Strategic marketing appears to amplify the value of good products, helping startups reach their audience effectively.

### ✅ Administrative Costs: Neutral Influence  
Administrative spending had a weaker and less consistent relationship with profit, suggesting that these costs neither directly hinder nor boost profitability significantly.

### ✅ Location: Surprisingly Irrelevant  
Contrary to expectations, **company location had little to no effect** on profit in this dataset. This could be due to the relatively uniform economic conditions across the sampled regions or a small sample size.

---

## 🛠️ Tools & Technologies

This project was completed using:

- 💻 **Python**  
- 🐼 **Pandas** – Data manipulation  
- 📊 **Seaborn** – Exploratory visualizations  
- 🤖 **Scikit-learn** – Machine learning pipeline  

---

## 🙏 Acknowledgements

Special thanks to **Raphael Rialland** for his mentorship and guidance throughout this project.

📍 [Jedha Bootcamp](https://www.linkedin.com/company/jedhabootcamp/)  
👨‍🏫 [Raphael Rialland](https://www.linkedin.com/in/raphael-rialland/)
