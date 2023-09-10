CREATE TABLE movies (
  movie_id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  relise_year INTEGER CHECK (relise_year > 1900),
  genre_id INTEGER,
  studio_id INTEGER,
  poster TEXT,
  CONSTRAINT genre_fkey FOREIGN KEY (genre_id) REFERENCES genres(genre_id),
  CONSTRAINT studio_fkey FOREIGN KEY (studio_id) REFERENCES studios(studio_id)
);