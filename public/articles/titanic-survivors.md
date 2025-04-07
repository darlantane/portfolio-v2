As part of the **Data Analysis Essentials** program at **Jedha Bootcamp**, I worked on a classification project using the famous **Titanic dataset from Kaggle**. The goal? To build a predictive model that estimates whether a passenger would survive the disaster based on demographic and travel-related information.

---

## 🧠 Project Overview

The Titanic dataset offers a rich snapshot of 891 passengers, detailing:

- Personal details (Name, Gender, Age)
- Ticket and travel information (Class, Fare, Cabin, Embarkation Port)
- Family size (Siblings/Spouses, Parents/Children)
- Survival status

This challenge is a classic introduction to machine learning and a great exercise in **data cleaning**, **feature engineering**, and **model evaluation**.

---

## 🔍 Data Preparation & Cleaning

### 🔹 Feature Selection
To streamline the model, we removed non-essential columns such as:

- Passenger ID  
- Name  
- Ticket Number  
- Cabin Number  

### 🔹 Handling Missing Values
- Age: Replaced missing values with the **mean age**
- Embarked & Fare: Imputed using mode or median
- Categorical encoding: Converted categorical features into numerical using one-hot encoding
- Standardization: Scaled numerical values for model efficiency

---

## 🧪 Model Building

We used a **Logistic Regression** model, ideal for binary classification problems like this one.  
The dataset was split into:

- **Training set (80%)**  
- **Test set (20%)**

### **Model Score:**

![Model Score](/articles/illustrations/score1.png)

📈 The model achieved **80% accuracy**, showing a solid ability to generalize from the training data.

---

## 📊 Key Visual Insights

### **Age Distribution by Survival Status**
Younger passengers—particularly children—had higher survival rates.

![Age Distribution](/articles/illustrations/age.png)

---

### **Embarkation Port vs Survival**

Passengers who boarded in **Cherbourg (C)** were more likely to survive.

![Embarked](/articles/illustrations/embarked.png)

---

### **Gender and Survival**

Clear survival bias: **females had significantly higher survival rates** than males.

![Gender](/articles/illustrations/gender.png)

---

### **Passenger Class**

Higher-class passengers (1st and 2nd class) had much better odds of surviving than those in 3rd class.

![Pclass](/articles/illustrations/pclass.png)

---

## 📌 Key Takeaways

✅ **Gender mattered most** – being female dramatically increased survival odds  
✅ **Class inequality** – 1st class had the highest survival rate  
✅ **Children were prioritized** – especially those under 10  
✅ **Boarding location** – Embarked C > Q > S in survival rate

---

## 🛠 Technologies Used

- 💻 **Python**  
- 🐼 **Pandas** – Data manipulation  
- 📊 **Seaborn** – Visualizations  
- 🤖 **Scikit-learn** – Modeling  

---

## 🙏 Acknowledgements

Thanks to **Victor Salling** and **Raphael Rialland** for their feedback and guidance throughout this project.

🔗 [Jedha Bootcamp](https://www.linkedin.com/company/jedhabootcamp/)  
🔗 [Raphael Rialland](https://www.linkedin.com/in/raphael-rialland/)
