-- Create tables based on repositories and entities

-- Casinos table
CREATE TABLE IF NOT EXISTS casinos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    alias VARCHAR(100) NULL,
    url VARCHAR(100) NOT NULL
);

-- Games table
CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    alias VARCHAR(100) NULL
);

-- Channels table
CREATE TABLE IF NOT EXISTS channels (
    id SERIAL PRIMARY KEY,
    casino_id INTEGER NOT NULL REFERENCES casinos(id) ON DELETE CASCADE,
    game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    strategy VARCHAR(50),
    created DATE
);

-- Channel Languages table
CREATE TABLE IF NOT EXISTS channel_languages (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
    language VARCHAR(10) NOT NULL,
    channel VARCHAR(100) NOT NULL,
    UNIQUE(channel_id, language)
);

-- Channel Statistics table
CREATE TABLE IF NOT EXISTS channel_statistics (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
    the_date DATE NOT NULL,
    data JSONB NOT NULL
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    action VARCHAR(50) NOT NULL
);

-- Channel Messages table
CREATE TABLE IF NOT EXISTS channel_messages (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
    message_id INTEGER NOT NULL REFERENCES messages(id) ON DELETE CASCADE
);
