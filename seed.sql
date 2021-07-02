DROP DATABASE IF EXISTS trainly;

DROP DATABASE IF EXISTS trainly_test;

\c trainly;

\i seed.sql;
