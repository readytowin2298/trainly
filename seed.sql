DROP DATABASE IF EXISTS trainly;

CREATE DATABASE trainly;

DROP DATABASE IF EXISTS trainly_test;

CREATE DATABASE trainly_test;

\c trainly;

\i schema.sql;

\c trainly_test;

\i schema.sql