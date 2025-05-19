Cats may look similar at first glance, yet each breed comes with its own proportions, colours and growth patterns.  
To see **how three popular breeds differ — Angora, Maine Coon and Ragdoll —** I built an interactive Tableau dashboard based on **1 071 individual records**.

---

## 🎯 Project Goal  
Create a visual workspace that quickly answers:

1. **How do weight, length and body “thickness” evolve with age?**  
2. **Which fur, eye and pattern traits dominate in each breed?**  
3. **What is an “ideal zone” for length × weight, and which cats fall outside of it?**

---

## 📦 Dataset Snapshot  

| Metric | Value |
|--------|-------|
| Rows   | 1 071 cats |
| Columns | 17 descriptive attributes |
| Key fields | `Breed`, `Age`, `Gender`, `Body_length` (cm), `Weight` (kg), location, fur & eye colours |

Calculated fields created in Tableau:

```tableau
// Body **width** (simplified oval‑body formula)
2 * (([Weight] * 1000) / (PI() * [Body_length])) ^ 0.5

// Breed means & standard deviations
{ FIXED [Breed] : AVG([Body_length]) }
{ FIXED [Breed] : STDEV([Body_length]) }
{ FIXED [Breed] : AVG([Weight]) }
{ FIXED [Breed] : STDEV([Weight]) }

// Z‑Scores
([Body_length] - [Breed Length AVG]) / [Breed Length SD]
([Weight]      - [Breed Weight AVG]) / [Breed Weight SD]

// Ideal Zone Boolean (slider defaults to ±3 SD)
ABS([Length Z]) <= [Z Parameter] AND
ABS([Weight Z]) <= [Z Parameter]
```

---

## 📊 Dashboard Tour  

### 1 · Ideal Body Zone (Scatter)

![Ideal zone – all breeds](/articles/illustrations/zone_ideale_de_poids_et_de_longueur.png)

*Blue* = inside ±3 SD, *orange* = outside. Shapes code the breed.

* **Angora & Ragdoll** are shorter (12–60 cm) and lighter (0.5–9 kg) but show **large variability** — many points sit outside the “ideal” ellipse.  
* **Maine Coon** is the heavyweight champion (up to 12 kg & 86 cm) and tends to cluster more tightly inside its healthy corridor.

Breed‑specific zooms:

* **Angora:**
![Angora zoom](/articles/illustrations/zone_ideale_de_poids_et_de_longueur___angora.png)
* **Maine Coon:** 
![MC zoom](/articles/illustrations/zone_ideale_de_poids_et_de_longueur___maine_coon.png)
* **Ragdoll:**
![Ragdoll zoom](/articles/illustrations/zone_ideale_de_poids_et_de_longueur___ragdoll.png)

---

### 2 · Growth Curves with Age

![Growth curves](/articles/illustrations/evolution_du_poids_et_de_la_longueur_avec_l_age.png)

*Tripled axis*: **length**, **width** and **weight** averages; colours show sex.

* Rapid growth up to **2 years** then a plateau.  
* Males overtake females around month 12 in **all three metrics**.  
* Width (a proxy for body “girth”) stabilises much earlier (~6 months).

---

### 3 · Coat, Eyes & Geography

![Breed specifics](/articles/illustrations/specificites_par_race.png)

* Bubble charts: dominant **fur colour** (top‑left) & **pattern** (bottom‑left).  
  *Angora ⇒ white*, *Maine Coon ⇒ black*, *Ragdoll ⇒ seal / colour‑point*.

* Stacked bars (centre): **eye‑colour counts**.  
  *Maine Coon* features striking **amber/yellow**, whereas *Angora* & *Ragdoll* lean **blue**.

* Right panel: breed distribution across **🇫🇷 France, 🇬🇧 UK, 🇺🇸 USA, 🇩🇪 Germany, 🇨🇦 Canada**  
  *Angora ⇢ France*, *Maine Coon ⇢ UK*, *Ragdoll ⇢ USA & Germany*.

---

## 🔑 Key Takeaways  

| Dimension | Stand‑out Insight |
|-----------|------------------|
| **Size**  | Maine Coon outclasses the others in both length and weight but exhibits less scatter outside its healthy zone. |
| **Growth** | All breeds stabilise length/weight after year 2; males trend larger from year 1 onward. |
| **Fur & Eyes** | Each breed shows a clear signature combo (e.g., *Ragdoll = seal coat + blue eyes*). |
| **Geography** | Breeds have favourite countries, hinting at owner preference or breeding history. |

---

## 🛠 Tools  

* **Tableau Public** – data modelling, calculated fields, dashboard layout  
* **Excel** – initial cleaning (missing weights, unit checks)

---

## 📌 Final Thoughts  

This study demonstrates how a few calculated fields and well‑chosen visuals can reveal **morphological signatures** within feline breeds. Whether you breed cats, work in veterinary science, or just love a good data viz, Tableau makes it easy to turn raw measurements into a story.

---
