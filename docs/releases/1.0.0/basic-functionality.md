# Basic Functionality

This release targets two goals:

1. Keep data structured way;
2. Allow data management operations;

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
cream migrate -- it should find the latest applied migration in the database
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
cream currencies list -- shows the list of currencies as a table
cream currencies add -n "ZŁ" -- adds an entry to the currencies table
cream currencies rm -i 1 -- deletes an entry from the currencies table
```

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
cream wallets list -- shows the list of wallets as a table
cream wallets add -n "PKO Savings" -c 1 -- adds an entry to the wallets table
cream wallets rm -w 1 -- deletes an entry from the wallets table
```

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
cream whistory list -- shows the list of wallets_history as a table
cream whistory add -n "PKO Savings" -c 1 -- adds an entry to the wallets_history table
cream whistory rm -wh 1 -- deletes an entry from the wallets_history table
```

