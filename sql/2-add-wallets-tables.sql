create table currencies (
    id integer primary key autoincrement,
    name varchar(255) not null,
    created_at datetime default (datetime('now', 'utc')),
    updated_at datetime default (datetime('now', 'utc')),
    deleted_at datetime default null
);

create table wallets (
    id integer primary key AUTOINCREMENT,
    name varchar(255) not null,
    currency_id integer not null,
    created_at datetime default (datetime('now', 'utc')),
    updated_at datetime default (datetime('now', 'utc')),
    deleted_at datetime default null
);

create table wallets_history (
    id integer primary key AUTOINCREMENT,
    wallet_id integer not null,
    mouney_amount numeric not null,
    created_at datetime default (datetime('now', 'utc')),
    updated_at datetime default (datetime('now', 'utc')),
    deleted_at datetime default null
);

insert into migrations (title) values (2);
