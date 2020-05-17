CREATE TABLE memory (
	id SERIAL PRIMARY KEY,
	year INT,
	month INT,
	day INT,
	gamename VARCHAR(40),
	message TEXT
);

CREATE TABLE tag (
	id SERIAL PRIMARY KEY,
	style VARCHAR(40)
);
