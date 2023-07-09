-- Create migrations table
create table migrations (
  id integer primary key autoincrement,
  title integer unique not null,
  created_at datetime default (datetime('now', 'utc'))
);

insert into migrations (title) values (1);

