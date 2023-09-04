import pandas as pd
import matplotlib.pyplot as plt


def plot_whistory_diff_graph(data):
    # Create a DataFrame from the provided data
    df = pd.DataFrame(data)

    # Convert the 'wh_date' column to datetime
    df['wh_date'] = pd.to_datetime(df['wh_date'])

    # Group the data by date and sum the 'wh_moneyAmount' for each day
    daily_spending = df.groupby(df['wh_date'].dt.date)['wh_moneyAmount'].sum()

    # Create the plot
    plt.figure(figsize=(12, 6))
    daily_spending.plot(kind='bar', width=0.8)
    plt.title('Daily Money Spending')
    plt.xlabel('Date')
    plt.ylabel('Amount Spent')
    plt.xticks(rotation=45)
    plt.grid(axis='y')

    # Show the plot
    plt.tight_layout()
    plt.show()
