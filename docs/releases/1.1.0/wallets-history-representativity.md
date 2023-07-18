---
description: Wallets history data should be more visual and representative.
---

# Wallets History Representativity

### Bar chart

The `cream whistory bar-chart -w 1` command should draw a bar chart for a wallet with id=1.

```
Wallet | Date                | Money Amount
"PKO"  | 2023-07-18 14:06:45 | #####,##### | 100
"PKO"  | 2023-07-17 14:57:29 | #####,##    | 70
...
"PKO"  | 2023-05-09 12:00:00 | ####,       | 42
```

The money amount should be represented by any character that fits.

#### Table -> Bar chart transition details

Entries should be desc ordered by date.

One entry -> one day (maybe it'll be configurable in the future). If there are multiple entries for one day it's expected to use the latest wallet history entry.

For cases when there is a time span between two consequent wallet history entries it's expected to fill it with the closest previous value. Bars generated this way should be grayed out (it should be visible that it's not real data).

###

### Group table by wallets

Add an optional `-w, --wallet-id` argument to the `list` command

```
cream whistory list -w 1
```



### Wallets History table should include the wallet name, not only id&#x20;
