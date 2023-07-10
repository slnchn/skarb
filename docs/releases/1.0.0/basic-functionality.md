# Basic Functionality

This release targets two goals:

1. Keep data structured way;
2. Allow data management operations;

### Database structure

#### migrations

| Field       | Type         | Default                |
| ----------- | ------------ | ---------------------- |
| id          | integer      | autoincrement          |
| title       | varchar(255) |                        |
| created\_at | datetime     | datetime('now', 'utc') |

System table, users won't have _direct_ access to it.

We need this table to keep databases updateable.

```
cream db migrate -- it should find the latest applied migration in the database
                    and then run all the available migrations after it
```

#### currencies

| Field       | Type         | Default                |
| ----------- | ------------ | ---------------------- |
| id          | integer      | autoincrement          |
| name        | varchar(255) |                        |
| created\_at | datetime     | datetime('now', 'utc') |
| updated\_at | datetime     | datetime('now', 'utc') |
| deleted\_at | datetime     | null                   |

Users can perform basic manipulations on this table.

```
cream currencies list -- shows the list of currencies as a table
cream currencies add "ZŁ" -- adds an entry to the currencies table
cream currencies rm 1 -- deletes an entry from the currencies table
```

#### wallets

| Field        | Type         | Default                |
| ------------ | ------------ | ---------------------- |
| id           | integer      | autoincrement          |
| name         | varchar(255) |                        |
| currency\_id | integer      |                        |
| created\_at  | datetime     | datetime('now', 'utc') |
| updated\_at  | datetime     | datetime('now', 'utc') |
| deleted\_at  | datetime     | null                   |

```
cream wallets list -- shows the list of wallets as a table
cream wallets add -n "PKO Savings" -c 1 -- adds an entry to the wallets table
cream wallets rm  1 -- deletes an entry from the wallets table
```

#### wallets\_history

| Field         | Type     | Default                |
| ------------- | -------- | ---------------------- |
| id            | integer  | autoincrement          |
| wallet\_id    | integer  |                        |
| money\_amount | numeric  |                        |
| created\_at   | datetime | datetime('now', 'utc') |
| deleted\_at   | datetime | null                   |

```
cream whistory list -- shows the list of wallets_history as a table
cream whistory add -n "PKO Savings" -c 1 -- adds an entry to the wallets_history table
cream whistory rm  1 -- deletes an entry from the wallets_history table
```

