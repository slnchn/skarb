const createMigrationsTableSQL = `
  create table migrations (
    m_id integer primary key autoincrement,
    m_title integer unique not null,
    m_createdAt datetime default (datetime('now', 'utc'))
  );

  insert into migrations (m_title) values (1);
`;

const createWalletsTablesSQL = `
  create table currencies (
      c_id integer primary key autoincrement,
      c_name varchar(255) not null,
      c_createdAt datetime default (datetime('now', 'utc')),
      c_updatedAt datetime default (datetime('now', 'utc')),
      c_deletedAt datetime default null
  );

  create table wallets (
      w_id integer primary key AUTOINCREMENT,
      w_name varchar(255) not null,
      w_currencyId integer not null,
      w_createdAt datetime default (datetime('now', 'utc')),
      w_updatedAt datetime default (datetime('now', 'utc')),
      w_deletedAt datetime default null
  );

  create table wallets_history (
      wh_id integer primary key AUTOINCREMENT,
      wh_walletId integer not null,
      wh_moneyAmount numeric not null,
      wh_createdAt datetime default (datetime('now', 'utc')),
      wh_updatedAt datetime default (datetime('now', 'utc')),
      wh_deletedAt datetime default null
  );

  insert into migrations (m_title) values (2);
`;

const migrationsMap = {
  1: {
    title: 'create_migrations_table',
    sql: createMigrationsTableSQL,
  },

  2: {
    title: 'create_wallets_tables',
    sql: createWalletsTablesSQL,
  },
};

module.exports = {
  migrationsMap,
};
