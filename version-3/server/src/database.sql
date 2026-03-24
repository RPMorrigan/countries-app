CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE,
    bio TEXT
);

CREATE TABLE saved_countries (
    country_id SERIAL PRIMARY KEY,
    country_name VARCHAR UNIQUE NOT NULL,
    count INTEGER NOT NULL,
);