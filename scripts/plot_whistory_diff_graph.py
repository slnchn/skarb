import pandas as pd
import matplotlib.pyplot as plt


def plot_whistory_diff_graph(data):
    # Create a DataFrame from the list of objects
    df = pd.DataFrame(data)

    # Convert the 'startDate' and 'endDate' columns to datetime objects
    df['startDate'] = pd.to_datetime(df['startDate'])
    df['endDate'] = pd.to_datetime(df['endDate'])

    # Create the bar chart
    plt.figure(figsize=(10, 6))
    plt.bar(df['startDate'], df['amountDiff'], width=0.5,
            color=['#78c1a3' if val >= 0 else '#F38989' for val in df['amountDiff']], label='Amount Difference')
    plt.xlabel('Time Period')
    plt.ylabel('Amount Difference')
    plt.title('Amount Difference Over Time')
    plt.legend()
    plt.tight_layout()
    plt.xticks(rotation=45)
    plt.grid(True)
    plt.show()
