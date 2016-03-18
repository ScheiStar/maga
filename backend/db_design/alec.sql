DROP DATABASE IF EXISTS ALECTutor;

CREATE DATABASE ALECTutor;
use ALECTutor;
CREATE TABLE Tutors(
  tutor_id INT primary key,
  first_name VARCHAR(45),
  last_name VARCHAR(45)
);
CREATE TABLE Sessions(
  session_id INT primary key,
  session_date DATE,
  session_time VARCHAR(45),
  tutor_id INT
);
CREATE TABLE Timeslots(
  timeslot_id INT primary key,
  class_name VARCHAR(45),
  timeslot_time VARCHAR(45),
  tutor_id INT
);
CREATE TABLE Reviews(
  review_id INT primary kjey,
  score_1 INT,
  score_2 INT,
  score_3 INT,
  session_id INT
);
CREATE TABLE ApplicantTimeslots(
  timeslot_id INT primary key,
  class_name VARCHAR(45),
  timeslot_time VARCHAR(45),
  application_id INT
);
CREATE TABLE Applications(
  application_id INT primary key,
  first_name VARCHAR(45),
  last_name VARCHAR(45),
  applicant_id INT,
  satus VARCHAR(45)
);
