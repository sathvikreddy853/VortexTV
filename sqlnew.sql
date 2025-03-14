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


DELIMITER ;;
CREATE TRIGGER after_insert_movie
AFTER INSERT ON Movies
FOR EACH ROW
BEGIN
    DECLARE basic_plan_id VARCHAR(10);

    -- Fetch the lowest plan_id (assuming Basic Plan is the first plan)
    SELECT MIN(plan_id) INTO basic_plan_id FROM Plans;

    -- Insert the new movie into Movie_Access table with the Basic Plan
    INSERT INTO Movie_Access (movie_id, plan_id) 
    VALUES (NEW.movie_id, basic_plan_id);
END;;
DELIMITER ;
