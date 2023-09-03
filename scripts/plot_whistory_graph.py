import pandas as pd
import matplotlib.pyplot as plt


def plot_whistory_graph(data):
    # Create a DataFrame from the provided data
    df = pd.DataFrame(data)

    # Convert the 'wh_date' column to datetime
    df['wh_date'] = pd.to_datetime(df['wh_date'])

    # Sort the DataFrame by the 'wh_date' column
    df = df.sort_values(by='wh_date')

    # Create the plot
    plt.figure(figsize=(12, 6))
    plt.plot(df['wh_date'], df['wh_moneyAmount'], marker='o', linestyle='-')
    plt.title('Wallet Transaction History')
    plt.xlabel('Date')
    plt.ylabel('Amount')
    plt.grid(True)

    # Format the x-axis to display dates nicely
    plt.gcf().autofmt_xdate()

    # Show the plot
    plt.show()
