# Basic Functionality

### Database structure

#### migrations

| Field        | Type         | Default                |
| ------------ | ------------ | ---------------------- |
| m\_id        | integer      | autoincrement          |
| m\_title     | varchar(255) |                        |
| m\_createdAt | datetime     | datetime('now', 'utc') |

System table, users won't have _direct_ access to it.

We need this table to keep databases updateable.

```
skarb migrate -- it should find the latest applied migration in the database
                 and then run all the available migrations after it
```

#### currencies

| Field        | Type         | Default                |
| ------------ | ------------ | ---------------------- |
| c\_id        | integer      | autoincrement          |
| c\_name      | varchar(255) |                        |
| c\_createdAt | datetime     | datetime('now', 'utc') |
| c\_updatedAt | datetime     | datetime('now', 'utc') |
| c\_deletedAt | datetime     | null                   |

Users can perform basic manipulations on this table.

```
skarb currencies list -- shows the list of currencies as a table
skarb currencies add -n "ZŁ" -- adds an entry to the currencies table
skarb currencies rm -c 1 -- deletes an entry from the currencies table
```

_Adding a currency_

The name of a new currency should be unique.

_Deleting a currency_

The currency will be deleted only if there are no related wallets.

#### wallets

| Field         | Type         | Default                |
| ------------- | ------------ | ---------------------- |
| w\_id         | integer      | autoincrement          |
| w\_name       | varchar(255) |                        |
| w\_currencyId | integer      |                        |
| w\_createdAt  | datetime     | datetime('now', 'utc') |
| w\_updatedAt  | datetime     | datetime('now', 'utc') |
| w\_deletedAt  | datetime     | null                   |

```
skarb wallets list -- shows the list of wallets as a table
skarb wallets add -n "PKO Savings" -c 1 -- adds an entry to the wallets table
skarb wallets rm -w 1 -- deletes an entry from the wallets table
```

_Adding a wallet_

The name of a new wallet should be unique.

When you add a wallet it's required to pass an existing currency id.

_Deleting a wallet_

The wallet will be deleted only if there are no related wallet history entries.

#### wallets\_history

| Field           | Type     | Default                |
| --------------- | -------- | ---------------------- |
| wh\_id          | integer  | autoincrement          |
| wh\_walletId    | integer  |                        |
| wh\_moneyAmount | numeric  |                        |
| wh\_createdAt   | datetime | datetime('now', 'utc') |
| wh\_updatedAt   | datetime | datetime('now', 'utc') |
| wh\_deletedAt   | datetime | null                   |

```
skarb whistory list -- shows the list of wallets_history as a table
skarb whistory list -w 1 -- shows the list of wallets_history as a table
                            where the wh_walletId is 1
skarb whistory add -n "PKO Savings" -c 1 -- adds an entry to the wallets_history table
skarb whistory rm -wh 1 -- deletes an entry from the wallets_history table
skarb whistory export -w 1 -- exports data from the database to the CSV
```

_Adding a wallet history entry_

When you add a wallet history entry it's required to pass an existing wallet id.
