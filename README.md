
# Food Delivery Data Analysis Hackathon 🍔📊

This project involves merging and analyzing a multi-format dataset (CSV, JSON, and SQL) to derive business insights for a food delivery service. The goal is to understand user behavior, restaurant performance, and revenue trends across different cities and membership tiers.

## 📁 Dataset Overview

The analysis is based on three primary data sources:

* **orders.csv**: Contains transactional data including order IDs, dates, and total amounts.
* **users.json**: User master data containing demographic information and membership status (Gold vs. Regular).
* **restaurants.sql**: Master data for restaurants, including cuisines and user ratings.

## 🛠️ Tech Stack

* **Language**: Python 3.x
* **Libraries**: Pandas, NumPy, SQLite3, JSON
* **Tool**: Jupyter Notebook / VS Code

## 🚀 Step-by-Step Implementation

### 1. Data Loading

Each file format was handled using specific Python methods:

* `pd.read_csv()` for transactional data.
* `json.load()` for user master data.
* `sqlite3` connection for parsing and executing SQL restaurant data.

### 2. Data Merging

The datasets were combined into a "Single Source of Truth" using **Left Joins**:

* **Key 1**: `user_id` was used to join Orders with Users.
* **Key 2**: `restaurant_id` was used to join the result with Restaurant details.

### 3. Data Cleaning

* Converted `order_date` to proper datetime objects.
* Handled currency and numeric types for `total_amount`.
* Binned restaurant ratings into categorical ranges (e.g., 3.0-3.5, 4.6-5.0).

## 📈 Key Insights & Results

| Metric | Findings |
| --- | --- |
| **Top Revenue City (Gold)** | Chennai |
| **Top Cuisine (Avg Value)** | Mexican |
| **Membership Impact** | 50% of total orders are placed by Gold members |
| **Peak Seasonality** | Q3 (July–September) saw the highest revenue |
| **User Base** | 2,544 users spent more than ₹1000 in total |

## 💻 How to Run

1. Clone this repository.
2. Ensure you have the datasets in the `data/` folder.
3. Install dependencies: `pip install pandas`.
4. Run the Jupyter Notebook `internship.ipynb`

* **Professionalism**: It shows you understand the full data pipeline, not just the coding part.
* **Structural Clarity**: Recruiters or fellow students can immediately see your results without digging through code.
* **Specialization**: As an **AI & ML student**, highlighting the data merging process demonstrates your ability to prepare "clean data," which is 80% of any Machine Learning project.
