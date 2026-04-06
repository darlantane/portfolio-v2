
For our final project in the **Data Analysis Essentials** program at **Jedha Bootcamp**, I teamed up with **Louis Tronel**, **Myriam Goyet**, and **Lionel TCHAMFONG** to tackle an ambitious challenge: **predicting air pollution levels across the United States using machine learning**.

With serious implications for public health and climate policy, this project combined environmental science with advanced data modeling.

---

## Project Objectives

The goal was to create a model that could:

- Help people anticipate pollution spikes and adapt their behavior  
- Support policymakers in introducing preventive environmental measures

---

## Dataset Overview

- 35,000+ rows  
- 54 US cities  
- 2 years of data  

We used a publicly available Kaggle dataset that included weather metrics, pollution measures (PM2.5, PM10, NO₂, CO, O₃), and temporal patterns.

---

## Data Cleaning & Feature Engineering

To ensure reliable analysis:

- Removed irrelevant columns  
- Created a **composite pollution index**  
- Handled missing values  
- Added temporal features (like previous-day pollution levels)

---

## Visual Correlations

Despite expectations, we found **weak visual correlations** between pollution and weather indicators.

![Correlation Scatterplots](/articles/illustrations/correlations.png)

---

## Modeling Approach

We tested several algorithms, including:

- Linear Regression  
- Random Forest Regressor  

We refined our analysis by excluding **2020 data** (due to COVID-related behavioral anomalies) and ran city-specific models.

---

## Best Model: Random Forest (Los Angeles)

![Model Score & Feature Importance](/articles/illustrations/score2.png)

### R² Scores:
- **Train**: 0.68  
- **Test**: 0.38  

### Mean Error Percentage (MEPA):
- **Train**: 15%  
- **Test**: 17%  

---

## Key Insights

**Wind speed**, **humidity**, and **temperature** were among the top predictors.  
The **proportion of people staying at home** (captured via mobility data) also had significant impact.

---

## Why Predictions Were Limited

Despite solid modeling efforts, performance was hindered by:

- ⚠ **Missing data** (e.g., SO₂, more granular meteorology)  
- ⚠ **Data heterogeneity** across 54 cities  
- ⚠ **Overly broad geographic scale**, diluting local patterns

---

## How to Improve

To enhance accuracy in future versions:

- **Focus on one city at a time** to account for local dynamics  
- **Add more granular data**: industrial activity, vegetation, traffic, local policies, etc.  
- Ensure more consistent and frequent data collection

---

## Technologies Used

- **Python**  
- **Pandas**  
- **Seaborn**  
- **Scikit-learn (RandomForestRegressor)**

---

## Team & Credits

Big thanks to my amazing teammates:

- [Louis Tronel](https://www.linkedin.com/in/louis-tronel-b3b5031b/)  
- [Myriam Goyet](https://www.linkedin.com/in/myriamgoyet/)  
- [Lionel TCHAMFONG](https://www.linkedin.com/in/lionel-tchamfong-productowner/)  

Special thanks to our mentors:

- [Victor Salling](https://www.linkedin.com/company/jedhabootcamp/)  
- [Raphael Rialland](https://www.linkedin.com/in/raphael-rialland/)

---

## Conclusion

While our model didn’t achieve high predictive power, this project was an **incredible hands-on experience** in environmental analytics, data preprocessing, and team-based machine learning.

It also marked the completion of my **Data Analysis Essentials certification** at **Jedha Bootcamp**!
