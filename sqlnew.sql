CREATE TABLE `Movie_Access` (
  `plan_id` varchar(10) NOT NULL,
  `movie_id` varchar(10) NOT NULL,
  PRIMARY KEY (`plan_id`, `movie_id`),
  CONSTRAINT `Movie_Access_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `Plans` (`plan_id`) ON DELETE CASCADE,
  CONSTRAINT `Movie_Access_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE
);

CREATE TABLE `Watch_History` (
  `user_id` varchar(10) NOT NULL,
  `movie_id` varchar(10) NOT NULL,
  `watched_on` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`, `movie_id`),  
  CONSTRAINT `Watch_History_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `Watch_History_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE
);




CREATE TABLE Watchlist (
    watchlist_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique ID for each entry
    user_id VARCHAR(10) NOT NULL,               -- References Users table
    movie_id VARCHAR(10) NOT NULL,              -- References Movies table
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Time when movie was added

    UNIQUE (user_id, movie_id),  -- Prevents duplicate entries

    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE
);



CREATE TABLE movie_views 
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id varchar(10) NOT NULL,
    user_id varchar(10),  -- Nullable, for guests
    watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE movie_ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id varchar(10) NOT NULL,
    user_id varchar(10) NOT NULL,
    rating FLOAT CHECK (rating BETWEEN 0 AND 10), -- Rating scale (e.g., 1-10)
    review TEXT,
    rated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
---------------------------------------------------------


CREATE VIEW trending_movies AS
SELECT 
    m.id AS movie_id, 
    m.title, 
    COUNT(v.id) AS view_count, 
    IFNULL(AVG(r.rating), 0) AS avg_rating,
    (COUNT(v.id) * 0.7 + IFNULL(AVG(r.rating), 0) * 0.3) AS trending_score
FROM Movies m
LEFT JOIN movie_views v ON m.id = v.movie_id
LEFT JOIN movie_ratings r ON m.id = r.movie_id
GROUP BY m.id
ORDER BY trending_score DESC;

CREATE TABLE Genres (
    genre_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE MovieGenres (
    movie_id VARCHAR(10) NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id) ON DELETE CASCADE
);
--------------------------------------------------------------------------------------------------------------------



| Field        | Type         | Null | Key | Default | Extra |
+--------------+--------------+------+-----+---------+-------+
| movie_id     | varchar(10)  | NO   | PRI | NULL    |       |
| title        | varchar(255) | NO   |     | NULL    |       |
| release_year | year(4)      | NO   |     | NULL    |       |
| duration     | int(11)      | NO   |     | NULL    |       |
| rating       | decimal(3,1) | YES  |     | NULL    |       |
| source_link  | varchar(255) | NO   |     | NULL    |       |
+--------------+--------------+------+-----+---------+-------+
