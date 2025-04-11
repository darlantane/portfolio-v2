As a data analyst working on multiple projects—scripts, notebooks, dashboards, and collaborative workflows—**version control is not optional, it’s essential**. That’s why I completed the “Manage your code with Git & GitHub” course by OpenClassrooms and other online documentation, and integrated those practices directly into my data workflow.

---

## 🚀 Why Git & GitHub Matter for Data Projects

From Jupyter notebooks that evolve with every new insight to collaborative SQL pipelines and Python scripts, keeping track of changes and working cleanly with others is critical. Git gives you structure and flexibility; GitHub gives you scale and visibility.

Here’s how I’m applying what I’ve learned in everyday analytical workflows:

---

## 🔧 Initialize a Git Repository

When starting a new analysis or automation script:

```bash
git init
```

<p align="center">
  <img src="/articles/illustrations/time_travel.gif" style="width: 100%" alt="Time travel"/>
</p>

This command creates a hidden `.git` folder and begins tracking changes in your project. It’s like enabling **time travel** for your work.

---

## 📌 Track and Commit Changes

After making changes (e.g. new plots, model tuning, SQL queries), you’ll want to track your progress.

```bash
git status
git add .
git commit -m "Added SQL extraction query for sales dashboard"
```

- `git status`: shows what’s been changed  
- `git add .`: stages everything  
- `git commit -m "...":` saves a snapshot

---

## 🌐 Push to GitHub

Time to collaborate or simply back up your work.

```bash
git remote add origin https://github.com/yourusername/yourrepo.git
git branch -M main
git push -u origin main
```

---

## ⏮️ Roll Back If Needed

If you pushed things that don’t work (yes, we're still human!), Git lets you go back without fear!

If the bad commit is the last one

```bash
# Revert the most recent commit
git revert HEAD

# Or revert a specific commit
git revert <commit-hash>

# Push the revert commit
git push origin main
```

If you or teammates have already pushed commits after the bad one

```bash
# Find the commit hash of your problematic commit(s)
git log

# Revert the specific commits that introduced the issues
git revert <bad-commit-hash-1>
git revert <bad-commit-hash-2>

# Push your revert commits to the main branch
git push origin main
```

<p align="center">
  <img src="/articles/illustrations/strange_apple.gif" style="width: 100%" alt="Dr Strange Apple"/>
</p>

---

## 🌿 Work with Branches

For features, experiments, or isolated ideas, you can create branches an switch between them:

```bash
# create a new branch named feature/add-automated-cleaning
git branch feature/add-automated-cleaning
```

```bash
# jump to the new branch
git checkout feature/add-automated-cleaning
```

Then push it:

```bash
git push -u origin feature/add-automated-cleaning
```

You can also create a branch and immediately switch to it

```bash
git checkout feature/add-automated-cleaning
```

<p align="center">
  <img src="/articles/illustrations/loki.gif" style="width: 100%" alt="Loki"/>
</p>

📝 Note: In this example, the base branch of feature/add-automated-cleaning is the branch where we were while creating it.

We can change the base branch of a branch like this:

```bash
# First, make sure you have the latest version of both branches
git fetch origin

# Switch to your branch that needs a new base
git checkout your-branch-name

# Rebase your branch onto the new base branch
git rebase new-base-branch-name
```

If the rebased branch was already pushed to the remote repository, you'll need to force push

```bash
# Force push to rewrite the branch commits history
git push --force origin your-branch-name
```

📝 Note: You may get merge conflicts while doing a rebase or pulling code from remote repository.

---

## ✅ Resolve Merge Conflicts Cleanly

Sometimes two people edit the same file. Git will alert you to **conflicts**.

```bash
git pull origin main
# resolve conflicts manually
git add .
git commit -m "Resolved merge conflicts in analysis_summary.ipynb"
```

I also enjoy resolving conflicts with vscode. I provides a clear interface

<p align="center">
  <img src="/articles/illustrations/merge_conflict.png" style="width: 100%" alt="merge conflicts"/>
  <em>Source: https://code.visualstudio.com/docs/sourcecontrol/overview</em>
</p>

---

## 🔄 Collaborate with Pull Requests

Once your feature is ready:

1. Push your branch
2. Open a Pull Request (PR) on GitHub
3. Review and merge after approval

This keeps your main branch clean and production-ready.

---

## 📘 Best Practices for Data Teams

- Use **clear, meaningful commit messages**
- Create **topic branches** (e.g. `feature/improve-model`)
- Never push directly to `main` unless it’s stable
- Regularly **pull and sync** with remote
- Use PRs for **code reviews**, even if it’s just you reviewing your past self

---

## 🧠 Final Thoughts

Git and GitHub are not just for software engineers. For data analysts, they bring **clarity, accountability, and peace of mind**.

Whether it’s a data cleaning script, a dashboard, or a full analysis pipeline, version control ensures your progress is:

- 🕒 Trackable  
- 👥 Collaborative  
- 🔄 Reversible  
- 🧼 Clean and maintainable

Next step? Keep applying these skills in every personal and professional project I take on!

---
