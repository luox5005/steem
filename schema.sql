DROP TABLE IF EXISTS memory;

CREATE TABLE memory (
	id SERIAL PRIMARY KEY,
	year INT,
	month INT,
	developer VARCHAR(40),
	message TEXT
);
