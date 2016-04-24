DROP DATABASE alecDB;
CREATE DATABASE alecDB;
USE alecDB;

CREATE TABLE Tutors (
  'tutor_id' int AUTO_INCREMENT,
  'tutor_first_name' VARCHAR(45),
  'tutor_last_name' VARCHAR(45),
  'tutor_email' VARCHAR(45),
  'tutor_phone' VARCHAR(45),
  'tutor_gpa' VARCHAR(5),
  'tutor_major' VARCHAR(45),
  PRIMARY KEY (tutor_id));


-- -----------------------------------------------------
-- Table 'Timeslots'
-- -----------------------------------------------------

CREATE TABLE Timeslots (
  'timeslot_id' INT AUTO_INCREMENT,
  'timeslot_time' INT,
  'Tutors_tutor_id' INT,
  'timeslot_day' INT,
  PRIMARY KEY (timeslot_id));


-- -----------------------------------------------------
-- Table 'Sessions'
-- -----------------------------------------------------
--
-- CREATE TABLE  'Sessions' (
--   'session_id' INT  AUTO_INCREMENT,
--   'session_date' DATE,
--   'session_time' VARCHAR(45),
--   'Tutors_tutor_id' INT,
--   'student_id' VARCHAR(45),
--   'student_email' VARCHAR(45),
--   'session_start_time' VARCHAR(45),
--   'session_end_time' VARCHAR(45),
--   'student_first_name' VARCHAR(45),
--   'student_last_name' VARCHAR(45),
--   PRIMARY KEY (session_id));


-- -----------------------------------------------------
-- Table 'Applicants'
-- -----------------------------------------------------

CREATE TABLE Applicants (
  'applicant_id' INT,
  'applicant_first_name' VARCHAR(45),
  'applicant_last_name' VARCHAR(45),
  'applicant_email' VARCHAR(45),
  'applicant_gpa' VARCHAR(5),
  'applicant_major' VARCHAR(45),
  'application_status' VARCHAR(45),
  'applicant_hash' VARCHAR(60),
  PRIMARY KEY (applicant_id));


-- -----------------------------------------------------
-- Table 'ApplicantTimeslots'
-- -----------------------------------------------------

CREATE TABLE ApplicantTimeslots (
  'timeslot_id' INT NOT NULL AUTO_INCREMENT,
  'timeslot_time' INT,
  'applicant_id' INT,
  'timeslot_day' INT,
  PRIMARY KEY (timeslot_id));


-- -----------------------------------------------------
-- Table 'Reviews'
-- -----------------------------------------------------

-- CREATE TABLE  'Reviews' (
--   'review_id' INT  AUTO_INCREMENT,
--   'score_helpfulness' INT,
--   'score_clarity' INT,
--   'score_friendlynes' INT,
--   'session_id' INT,
--   'score_avg' INT,
--   'review_comments' VARCHAR(500),
--   PRIMARY KEY (review_id));


-- -----------------------------------------------------
-- Table 'Users'
-- -----------------------------------------------------

CREATE TABLE Users (
  'user_id' INT,
  'hash' VARCHAR(60),
  'admin' TINYINT(1)  DEFAULT 0,
  PRIMARY KEY (user_id));


-- -----------------------------------------------------
-- Table 'Admins'
-- -----------------------------------------------------
-- CREATE TABLE  'Admins' (
--   'admin_id' INT,
--   'admin_first_name' VARCHAR(45),
--   'admin_last_name' VARCHAR(45),
--   'admin_email' VARCHAR(45),
--   'admin_phone' VARCHAR(45),
--   PRIMARY KEY (admin_id));


-- -----------------------------------------------------
-- Table 'TutorClasses'
-- -----------------------------------------------------

CREATE TABLE TutorClasses (
  'tutorclass_id' INT AUTO_INCREMENT,
  'class_type' VARCHAR(4),
  'class_num' VARCHAR(4),
  'class_grade' VARCHAR(3),
  'tutor_id' INT NOT NULL,
  PRIMARY KEY (tutorclass_id));


-- -----------------------------------------------------
-- Table 'ApplicantClasses'
-- -----------------------------------------------------

CREATE TABLE ApplicantClasses (
  'idApplicantClasses' INT AUTO_INCREMENT,
  'class_name' VARCHAR(45),
  'class_gpa' VARCHAR(2),
  'class_number' VARCHAR(4),
  'applicant_id' INT,
  PRIMARY KEY (idApplicantClasses));


-- -----------------------------------------------------
-- Table 'TutorRequests'
-- -----------------------------------------------------

CREATE TABLE TutorRequests (
  'tr_id' INT AUTO_INCREMENT,
  'tr_tutor_id' INT,
  'tr_classtype' VARCHAR(4),
  'tr_classnum' VARCHAR(4),
  'tr_request_type' VARCHAR(4),
  PRIMARY KEY (tr_id));
