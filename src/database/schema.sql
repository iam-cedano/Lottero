-- Create tables based on repositories and entities

-- Casinos table
CREATE TABLE IF NOT EXISTS casinos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    alias VARCHAR(100) NULL,
    url VARCHAR(100) NOT NULL,
    status BOOLEAN DEFAULT TRUE
);

-- Games table
CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    alias VARCHAR(100) NULL,
    status BOOLEAN DEFAULT TRUE
);

-- Groups table
CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    casino_id INTEGER NOT NULL REFERENCES casinos(id),
    game_id INTEGER NOT NULL REFERENCES games(id),
    strategy VARCHAR(50),
    created DATE,
    status BOOLEAN DEFAULT TRUE
);

-- Channels table
CREATE TABLE IF NOT EXISTS channels (
    id SERIAL PRIMARY KEY,
    language VARCHAR(10) NOT NULL,
    chat_id VARCHAR(32) NOT NULL,
    status BOOLEAN DEFAULT TRUE
);

-- Channels Groups pivot table
CREATE TABLE IF NOT EXISTS channels_groups (
    id SERIAL PRIMARY KEY,
    group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    channel_id INTEGER NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
    UNIQUE(group_id, channel_id)
);

-- Group Statistics table
CREATE TABLE IF NOT EXISTS group_statistics (
    id SERIAL PRIMARY KEY,
    group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    the_date DATE NOT NULL,
    data JSONB NOT NULL
);

-- Group Messages table
CREATE TABLE IF NOT EXISTS group_messages (
    id SERIAL PRIMARY KEY,
    group_id INTEGER NOT NULL REFERENCES groups(id),
    data JSONB,
    created DATE
);

-- Channel Messages table
CREATE TABLE IF NOT EXISTS channel_messages (
    id SERIAL PRIMARY KEY,
    group_message_id INTEGER NOT NULL REFERENCES group_messages(id),
    channel_id INTEGER NOT NULL REFERENCES channels(id),
    telegram_message_id INTEGER NOT NULL
);

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
    group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    UNIQUE(channel_id, group_id, name)
);