As part of our final project at **Jedha Bootcamp – Fullstack Data Analyst**, I had the pleasure of working with an amazing team (shoutout to Isa, Ndeye, and Yulia!) on a question many game studios would love to answer:

**What are the real ingredients behind a successful video game?**

We analyzed data from three of the biggest platforms: **Steam, PlayStation, and Xbox**, combining insights on pricing, genres, engagement, and international adoption.

---

## 💰 A Booming Industry

![Gaming Market Overview](/articles/illustrations/market.png)

- 🎮 $184 billion generated in 2023
- 🌍 1 in 3 people on Earth play video games
- 📦 Revenues:
  - Xbox: $16B
  - Steam: $10B
  - PlayStation: $9B

---

## 🧼 From Raw Data to Clean Insights

Analyzing video game performance across platforms means dealing with a lot of different data sources – each with its own format, structure, and quirks. Here's how we built a clean, unified dataset from the ground up.

---

### 📥 1. Importing Raw Data from Multiple Platforms

We loaded CSV datasets from **Steam**, **PlayStation**, and **Xbox**, covering games, prices, achievements, players, history and purchased_games.

```python
games_playstation = pd.read_csv("playstation/games.csv")
games_steam = pd.read_csv("steam/games.csv")
games_xbox = pd.read_csv("xbox/games.csv")
```

This gave us a comprehensive foundation, but the schemas were inconsistent.


### 🏷 2. Adding Platform Metadata

To keep track of each game's origin, we added a `plateforme` column to key datasets:

```python
achievements_playstation['plateforme'] = 'playstation'
achievements_steam['plateforme'] = 'steam'
achievements_xbox['plateforme'] = 'xbox'
```


### 🧹 3. Removing or converting Irrelevant or Corrupted Data

We used :
- `drop_duplicates()` and `drop()` carefully to preserve valid rows while cleaning.

```python
price_without_double = prices.drop_duplicates(subset='gameid')

players.drop('nickname', axis=1, inplace=True)
```

- `fillna()` to replace empty values by 'unknown' and 'Null'.

```python
achievements = achievements.fillna({'title': 'unknown', 'description': 'unknown', 'points':'Null'})
```

- `to_datetime()` to convert date columns.

```python
prices['date_acquired'] = pd.to_datetime(arg = prices['date_acquired'],errors='coerce')
```

This step cleaned up the noise from partially scraped or incomplete rows.


### 🧩 4. Combining Datasets

We then **concatenated** datasets by theme (e.g., achievements across platforms) into unified tables:

```python
achievements = pd.concat(
    [achievements_playstation, achievements_steam, achievements_xbox],
    axis=0, ignore_index=True
)
```


### ✅ Final Result

After all these steps, you ended up with a **clean, multi-platform dataset** of over 1,500 games, fully ready for exploration across pricing, genre, geography, and platform performance.

---

## 🧬 Genre: The DNA of a Best Seller

![Genres by Country](/articles/illustrations/genre.png)

We found that **genre plays a major role in game popularity**. While Action dominates globally, Casual and Adventure titles are regionally successful, suggesting **local preferences drive performance**.

Examples:
- 🎮 *Assassin’s Creed* – Action  
- 🧙 *Final Fantasy Ever Crisis* – Adventure  
- 🎯 *Pinball Wicked* – Casual

---

## 💸 Price vs. Performance: The Sales Sweet Spot

![Sales vs Price](/articles/illustrations/price&perf.png)

- 🎯 Cheaper games perform *extremely* well on **Steam**
- 💵 Titles around $10 can generate strong revenues
- 💣 On **PlayStation/Xbox**, premium titles ($60–70) still rule, e.g. *Red Dead Redemption 2*

🧠 **Conversion rate is highest on Steam**, proving that **affordable pricing drives volume**.

---

## 🌍 The Geography of Engagement

![Title Distribution by Country](/articles/illustrations/titles_distribution.png)

The top 20 countries generate **84% of achievements**. This means:

- Engagement is highest in the **US, Germany, and Japan**
- Broad adoption = international success potential
- Cultural fit is essential to success

---

## 🧭 Strategic Recommendations

![Strategic Insights](/articles/illustrations/strategic_reco.png)

Here’s what we’d recommend to game studios based on our analysis:

1. 🎮 Invest in popular genres (Action, Adventure)
2. 💰 Adjust prices based on platform
3. 🎯 Match platform with budget and audience
4. 🌍 Target countries with high engagement
5. 👥 Prioritize multiplayer or rewarding systems

---

## 🏁 Conclusion: The Next GTA VI?

![GTA V Ingredients](/articles/illustrations/success_gta.png)

If we had to **reverse-engineer the success of a game like GTA V**, the formula would be:

- 🎮 Genre: Action + Adventure
- 🌍 Target: US, Germany, Japan
- 💸 Price: ~$10
- 🧩 Platform: Steam

---

## 🙌 Thank You

Huge thanks to:

- 👩‍💻 [Isa Nyamunongo](https://www.linkedin.com/in/isa-n-95b62823b/)
- 👩‍💻 [Ndeye Ndiémé Dieng](https://www.linkedin.com/in/ndeye-ndiem%C3%A9-dieng-13a7a870/)
- 👩‍💻 [Yulia Kholodova](https://www.linkedin.com/in/yulia-kholodova-4174a688/)

And to our instructors:

- 👨‍🏫 [Victor Salling](https://www.linkedin.com/in/victor-salling/)
- 👨‍🏫 [Julien Gibert](https://www.linkedin.com/in/juliengibert/)
- 👨‍🏫 [The entire Jedha team](https://www.linkedin.com/company/jedhabootcamp/)

This was an incredibly rewarding project that blended **data science**, **storytelling**, and **business strategy** through the lens of one of the most exciting industries today.

