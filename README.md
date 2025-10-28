# 🧩 Assignment 5: Group Test Management — *Word Puzzle Game Plus*

## 🎯 Learning Objectives

By the end of this assignment, you will be able to:

- Develop and manage a **test plan** for a real web-based system.  
- Apply **risk-based testing** and **test prioritization** techniques.  
- Define and evaluate **entry and exit criteria**.  
- Perform **test monitoring and control** using metrics and GitHub issues.  
- Collaborate effectively in a **QA team environment**.

---

## 👥 Group Configuration

Work in **teams of exactly 3 members**.

| Role | Responsibilities |
|------|------------------|
| **Test Manager** | Draft the test plan, schedule activities, and track metrics. |
| **Risk Analyst** | Identify, assess, and prioritize risks. Design high-risk test cases. |
| **Test Executor** | Execute test cases, capture defects, and validate fixes. |

> ⚠️ **Important Group Rule:**  
> Each student must belong to **only one group**.  
> You **may not** appear in two different groups or submit under multiple teams.  
> Duplicate participation or shared submissions will be treated as **academic misconduct**.

> 💡 Collaboration via **GitHub Projects / Issues** is mandatory.  
> Each issue must include a severity level, risk mapping, and evidence (e.g., screenshot).

---

## 🕹️ System Under Test: *Word Puzzle Game Plus*

An upgraded browser-based word puzzle game that challenges players to guess scrambled words.

### 🔧 New Features (Intermediate Scope)

| Feature | Description | Test Focus |
|----------|--------------|-------------|
| **Reset Game** | Resets score and progress instantly | State management, data integrity |
| **Leaderboard** | Stores top 3 scores in `localStorage` | Persistence, boundary values |
| **Bonus Round** | Every 3 puzzles → score × 2 | Logic, arithmetic, event sequencing |

These additions increase testing complexity across functional, UI, and risk dimensions.

---

## 📋 Deliverables

All teams submit **one combined report** named `Group_Test_Management_Report.md`.

### 1️⃣ Test Plan
Include:
- Objectives  
- Scope (in/out)  
- Resources (roles + tools)  
- Schedule (phase timeline)  
- Entry / Exit criteria  
- Environment (Chrome recommended)

### 2️⃣ Risk Analysis
- Identify at least **6 risks** (functional + non-functional).  
- Rate each by **Likelihood × Impact** → Priority.  
- Define **Mitigation / Contingency** actions.  
- Add a **risk-coverage pie chart**.

### 3️⃣ Test Design & Execution
- Minimum **8 test cases** (≥ 5 risk-based).  
- Include **2 negative** and **1 usability** test.  
- Use this format:

```
ID: TC-03
Feature: Leaderboard
Objective: Verify top-3 sorting logic
Steps:

Achieve scores 5, 12, 8 → check order
Expected: Scores sorted descending
Risk Priority: High
```


### 4️⃣ Defect Reporting
- Log at least **3 defects** on GitHub Issues.  
- Each issue must specify:
  - **Title**
  - **Steps to Reproduce**
  - **Expected / Actual**
  - **Severity**
  - **Risk Impact ID**
  - **Screenshot or evidence**

### 5️⃣ Test Monitoring & Metrics
Track and visualize:
- Test Case Pass %  
- Defect Density (defects / test cases)  
- Risk Coverage Ratio  
- Regression Success Rate

Represent these via tables or simple charts.

### 6️⃣ Reflection
Discuss briefly:
- How risk analysis shaped your testing focus.  
- Trade-offs between coverage, time, and depth.  
- How collaboration improved (or hindered) test effectiveness.

---

## 📊 Suggested Metrics Reference

| Metric | Formula | Example |
|---------|----------|----------|
| **Defect Density** | Defects / Test Cases |  5 / 25 = 0.2 |
| **Risk Coverage** | (Tested Risks / Total Risks) × 100 |  5 / 6 = 83 % |
| **Pass Rate** | (Passed / Total) × 100 |  18 / 20 = 90 % |

---

## 📎 Submission Checklist

✅ `Group_Test_Management_Report.md` (single file)  
✅ 3 GitHub issues (defects) linked  
✅ Screenshots / logs (optional)  
✅ Each member’s **name and role clearly stated**  
✅ One submission per group — **do not appear in multiple groups**  

> 📌 Each learner is responsible for their role’s section and must contribute equally.  
> Multiple submissions from the same student across different groups will be rejected.

---

## 🧠 Concept Reinforcement

**Risk-Based Testing Focus**  
> Prioritize based on *Risk Exposure = Probability × Impact*.

**Test Monitoring Best Practices**
- Track defects daily.  
- Update metrics at each control point.  
- Use visual indicators (tables / pie charts).

---

### 🧩 End of Assignment

Remember: Quality is measured not by the number of bugs found,  
but by how effectively your team planned, prioritized, and controlled the testing process.

Happy Testing 🧪  
