DROP DATABASE IF EXISTS ALECTutor;

CREATE DATABASE ALECTutor;
use ALECTutor;
CREATE TABLE Tutors(
  tutor_id INT primary key,
  first_name VARCHAR(45),
  last_name VARCHAR(45),
  email VARCHAR(45),
  phone VARCHAR(45)
);
CREATE TABLE Sessions(
  session_id INT primary key,
  session_date DATE,
  session_time VARCHAR(45),
  tutor_id INT,
  student_id VARCHAR(45),
  student_email VARCHAR(45),
  session_start_time VARCHAR(45),
  session_end_time VARCHAR(45)
);
CREATE TABLE Timeslots(
  timeslot_id INT primary key,
  class_name VARCHAR(45),
  timeslot_time VARCHAR(45),
  tutor_id INT
);
CREATE TABLE Reviews(
  review_id INT primary key,
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
  answer_1 VARCHAR(45),
  answer_2 VARCHAR(45),
  answer_3 VARCHAR(45),
  satus VARCHAR(45)
);
CREATE TABLE Applicants(
  applicant_id INT primary key,
  first_name VARCHAR(45),
  last_name VARCHAR(45),
  email VARCHAR(45),
  gpa decimal(3).
  application_id INT

)
