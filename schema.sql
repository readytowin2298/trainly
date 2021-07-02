DROP TABLE IF EXISTS departments,

CREATE TABLE departments (
    department_code STRING PRIMARY KEY,
    full_name STRING
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    email STRING PRIMARY KEY,
    password STRING,
    name STRING,
    department REFERENCES departments ON DELETE CASCADE,
    position STRING,
    location STRING,
    trainer BOOLEAN
);

DROP TABLE IF EXISTS quizzes;

CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    name STRING,
    description STRING,
    instructions STRING
);

DROP TABLE IF EXISTS assignment;

CREATE TABLE assignment (
    id SERIAL PRIMARY KEY,
    user REFERENCES users ON DELETE CASCADE,
    task REFERENCES quizzes ON DELETE CASCADE,
    completed BOOLEAN,
    score decimal(3, 1)
);

DROP TABLE IF EXISTS quiz_questions;

CREATE TABLE quiz_questions (
    id SERIAL PRIMARY KEY,
    quiz_id REFERENCES quizzes ON DELETE CASCADE;
    question_number INTEGER,
    link_to_content STRING,
    question_text STRING
);

DROP TABLE IF EXISTS quiz_answers;

CREATE TABLE quiz_answers (
    id SERIAL PRIMARY KEY,
    question_id REFERENCES quiz_questions ON DELETE CASCADE,
    answer_text STRING
);