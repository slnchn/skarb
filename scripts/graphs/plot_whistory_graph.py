import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv("./data/whistory-PKOCard-2023-08-06T10-49-16.csv")

# Convert the 'wh_date' column to datetime format
data['wh_date'] = pd.to_datetime(data['wh_date'])

# Sort the DataFrame by 'wh_date' in ascending order
data.sort_values(by='wh_date', inplace=True)

# Plot the graph
plt.figure(figsize=(10, 6))  # Set the figure size (adjust as needed)
plt.plot(data['wh_date'], data['wh_moneyAmount'], marker='o', linestyle='-')
plt.xlabel('Date')
plt.ylabel('Money Amount')
plt.title('Money Amount vs. Date')
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()

# Show the graph
plt.show()
