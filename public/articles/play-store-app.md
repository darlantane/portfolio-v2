
In this mini‑analytics project I used **BigQuery + Looker Studio** to explore what makes certain Android apps stand out on Google Play – from raw download counts to the tone and length of user reviews.

---

## Project Goals
1. **Quantify popularity**: downloads + ratings  
2. **Profile engagement**: which categories and content‑ratings spark the most feedback?  
3. **Dissect sentiment drivers**: review length, “helpful” votes, and the dreaded word **“ads”**.  
4. **Track reputation over time**: did updates break or save the user experience?

---

## Data Snapshot
| Metric | Value |
| ------ | ----- |
| Apps analysed | **217** |
| User reviews | **≈ 460 000** (July 2022 → Feb 2025) |
| Tables | `apps_info`, `apps_reviews` |
| Key fields | downloads, review_score, helpful_count, dates, category, section, content_rating |

---

## Key SQL Snippets (BigQuery)

```sql
-- Average rating per app
SELECT app_name,
       ROUND(AVG(review_score), 2) AS avg_score,
       COUNT(*) AS n_reviews
FROM   `Play_Market.apps_reviews`
GROUP  BY app_name
ORDER  BY n_reviews DESC;
```

```sql
-- Ratings when reviews mention ads
SELECT app_name,
       ROUND(AVG(review_score), 2) AS avg_score_ads
FROM   `Play_Market.apps_reviews`
WHERE  LOWER(review_text) LIKE '%ads%'
GROUP  BY app_name
ORDER  BY avg_score_ads;
```

```sql
-- Daily score trend (for the line chart)
SELECT DATE(review_date) AS day,
       AVG(review_score) AS daily_score
FROM   `Play_Market.apps_reviews`
GROUP  BY day
ORDER  BY day;
```

---

## Dashboard Walk‑through

### 1 · Popularity at a Glance
![Page 1 – Popularity](/articles/illustrations/page_1.png)

Slack & IMDb lead in **downloads + rating volume**; high correlation between the two.  
*IMDb* alone tops **100 M installs** and almost **1 M written ratings**.

---

### 2 · Where Users Speak Up
![Page 2 – Category breakdown](/articles/illustrations/page_2.png)

* **Communication** & **Entertainment** dominate review counts (10 × Finance).  
* “Business tools” and “News & magazines” show surprisingly high engagement inside the *Store sections* view.  
* As expected, apps rated **“Everyone”** attract the lion’s share of feedback.

---

### 3 · Sentiment & Text Analytics
![Page 3 – Reviews deep‑dive](/articles/illustrations/page_3.png)

* **Score vs Text Length** – verbose reviews aren’t necessarily happier; TikTok Studio gets short but glowing blurbs.  
* **Helpful Votes** – the most “useful” feedback clusters around **3‑4 stars** (balanced criticism over extremes).  
* **The Ad Penalty** – apps like *Google Voice* dip below ★3 whenever ads are mentioned.

Trend line shows a fairly steady ★3.0‑3.2 average, with a dip in late 2023 (likely a buggy release cycle).

---

## Insights Recap

| Theme | What We Learned |
| ----- | --------------- |
| **Popularity** | High install counts almost always deliver high review volume – but not vice‑versa. |
| **Category Dynamics** | Communication & Entertainment are feedback magnets, yet Business utilities punch above their weight in user interaction. |
| **Review Behaviour** | Long rants don’t guarantee high (or low) scores. Balance wins “helpful” votes. |
| **Advertising Impact** | Mentions of *ads* correlate with an average 0.6‑star drop. |
| **Temporal Stability** | App ratings are mostly resilient; big swings are rare and often patch‑related. |

---

## Stack

* **BigQuery** – SQL crunching over 5 GB of JSON exports  
* **Looker Studio** – interactive dashboards, drill‑downs  
* **Google Sheets / Excel** – lightweight data sanity checks  

---

## Take‑aways

Visual exploration + a few targeted SQL queries are enough to turn half a million Play Store reviews into actionable product signals:

* **Product Teams** → watch wording in ad pop‑ups, or watch your star rating drop.  
* **Marketers** → Communication apps remain the loudest arena; success means cultivating review volume, not just installs.  
* **Data Folks** → Looker Studio pairs nicely with BigQuery for rapid iteration when stakeholders need answers *yesterday*.

---
