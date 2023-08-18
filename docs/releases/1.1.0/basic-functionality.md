# Basic Functionality

### Database structure

#### migrations

| Field       | Type         | Default                |
| ----------- | ------------ | ---------------------- |
| m_id        | integer      | autoincrement          |
| m_title     | varchar(255) |                        |
| m_createdAt | datetime     | datetime('now', 'utc') |

System table, users won't have _direct_ access to it.

We need this table to keep databases updateable.

```
skarb migrate -- it should find the latest applied migration in the database
                 and then run all the available migrations after it
```

#### currencies

| Field       | Type         | Default                |
| ----------- | ------------ | ---------------------- |
| c_id        | integer      | autoincrement          |
| c_name      | varchar(255) |                        |
| c_createdAt | datetime     | datetime('now', 'utc') |
| c_updatedAt | datetime     | datetime('now', 'utc') |
| c_deletedAt | datetime     | null                   |

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

| Field        | Type         | Default                |
| ------------ | ------------ | ---------------------- |
| w_id         | integer      | autoincrement          |
| w_name       | varchar(255) |                        |
| w_currencyId | integer      |                        |
| w_createdAt  | datetime     | datetime('now', 'utc') |
| w_updatedAt  | datetime     | datetime('now', 'utc') |
| w_deletedAt  | datetime     | null                   |

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

#### wallets_history

| Field          | Type     | Default                |
| -------------- | -------- | ---------------------- |
| wh_id          | integer  | autoincrement          |
| wh_walletId    | integer  |                        |
| wh_moneyAmount | numeric  |                        |
| wh_createdAt   | datetime | datetime('now', 'utc') |
| wh_updatedAt   | datetime | datetime('now', 'utc') |
| wh_deletedAt   | datetime | null                   |

```
skarb whistory list -- shows the list of wallets_history as a table
skarb whistory list -w 1 -- shows the list of wallets_history as a table
                            where the wh_walletId is 1
skarb whistory add -n "PKO Savings" -c 1 -- adds an entry to the wallets_history table
skarb whistory rm -wh 1 -- deletes an entry from the wallets_history table
```

_Adding a wallet history entry_

When you add a wallet history entry it's required to pass an existing wallet id.
