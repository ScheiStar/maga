DROP DATABASE alecDB;
CREATE DATABASE alecDB;
USE alecDB ;

CREATE TABLE Tutors (
  'tutor_id' INT NOT NULL,
  'tutor_first_name' VARCHAR(45) NULL,
  'tutor_last_name' VARCHAR(45) NULL,
  'tutor_email' VARCHAR(45) NULL,
  'tutor_phone' VARCHAR(45) NULL,
  'tutor_gpa' VARCHAR(5) NULL,
  'tutor_major' VARCHAR(45) NULL,
  PRIMARY KEY ('tutor_id'));


-- -----------------------------------------------------
-- Table 'Timeslots'
-- -----------------------------------------------------

CREATE TABLE Timeslots (
  'timeslot_id' INT NOT NULL AUTO_INCREMENT,
  'timeslot_time' INT NOT NULL,
  'Tutors_tutor_id' INT NOT NULL,
  'timeslot_day' INT NOT NULL,
  PRIMARY KEY ('timeslot_id'));


-- -----------------------------------------------------
-- Table 'Sessions'
-- -----------------------------------------------------
--
-- CREATE TABLE  'Sessions' (
--   'session_id' INT NOT NULL AUTO_INCREMENT,
--   'session_date' DATE NULL,
--   'session_time' VARCHAR(45) NULL,
--   'Tutors_tutor_id' INT NOT NULL,
--   'student_id' VARCHAR(45) NULL,
--   'student_email' VARCHAR(45) NULL,
--   'session_start_time' VARCHAR(45) NULL,
--   'session_end_time' VARCHAR(45) NULL,
--   'student_first_name' VARCHAR(45) NULL,
--   'student_last_name' VARCHAR(45) NULL,
--   PRIMARY KEY ('session_id'));


-- -----------------------------------------------------
-- Table 'Applicants'
-- -----------------------------------------------------

CREATE TABLE Applicants (
  'applicant_id' INT NOT NULL,
  'applicant_first_name' VARCHAR(45) NULL,
  'applicant_last_name' VARCHAR(45) NULL,
  'applicant_email' VARCHAR(45) NULL,
  'applicant_gpa' VARCHAR(5) NULL,
  'applicant_major' VARCHAR(45) NULL,
  'application_status' VARCHAR(45) NULL,
  'applicant_hash' VARCHAR(60) NULL,
  PRIMARY KEY ('applicant_id'));


-- -----------------------------------------------------
-- Table 'ApplicantTimeslots'
-- -----------------------------------------------------

CREATE TABLE ApplicantTimeslots (
  'timeslot_id' INT NOT NULL AUTO_INCREMENT,
  'timeslot_time' INT NOT NULL,
  'applicant_id' INT NOT NULL,
  'timeslot_day' INT NOT NULL,
  PRIMARY KEY ('timeslot_id'));


-- -----------------------------------------------------
-- Table 'Reviews'
-- -----------------------------------------------------

-- CREATE TABLE  'Reviews' (
--   'review_id' INT NOT NULL AUTO_INCREMENT,
--   'score_helpfulness' INT NULL,
--   'score_clarity' INT NULL,
--   'score_friendlynes' INT NULL,
--   'session_id' INT NOT NULL,
--   'score_avg' INT NULL,
--   'review_comments' VARCHAR(500) NULL,
--   PRIMARY KEY ('review_id'));


-- -----------------------------------------------------
-- Table 'Users'
-- -----------------------------------------------------

CREATE TABLE Users (
  'user_id' INT NOT NULL,
  'hash' VARCHAR(60) NULL,
  'admin' TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY ('user_id'));


-- -----------------------------------------------------
-- Table 'Admins'
-- -----------------------------------------------------
-- CREATE TABLE  'Admins' (
--   'admin_id' INT NOT NULL,
--   'admin_first_name' VARCHAR(45) NULL,
--   'admin_last_name' VARCHAR(45) NULL,
--   'admin_email' VARCHAR(45) NULL,
--   'admin_phone' VARCHAR(45) NULL,
--   PRIMARY KEY ('admin_id'));


-- -----------------------------------------------------
-- Table 'TutorClasses'
-- -----------------------------------------------------

CREATE TABLE TutorClasses (
  'tutorclass_id' INT NOT NULL AUTO_INCREMENT,
  'class_type' VARCHAR(4) NULL,
  'class_num' VARCHAR(4) NULL,
  'class_grade' VARCHAR(3) NULL,
  'tutor_id' INT NOT NULL,
  PRIMARY KEY ('tutorclass_id'));


-- -----------------------------------------------------
-- Table 'ApplicantClasses'
-- -----------------------------------------------------

CREATE TABLE ApplicantClasses (
  'idApplicantClasses' INT NOT NULL AUTO_INCREMENT,
  'class_name' VARCHAR(45) NULL,
  'class_gpa' VARCHAR(2) NULL,
  'class_number' VARCHAR(4) NULL,
  'applicant_id' INT NOT NULL,
  PRIMARY KEY ('idApplicantClasses'));


-- -----------------------------------------------------
-- Table 'TutorRequests'
-- -----------------------------------------------------

CREATE TABLE TutorRequests (
  'tr_id' INT NOT NULL AUTO_INCREMENT,
  'tr_tutor_id' INT NULL,
  'tr_classtype' VARCHAR(4) NULL,
  'tr_classnum' VARCHAR(4) NULL,
  'tr_request_type' VARCHAR(4) NULL,
  PRIMARY KEY ('tr_id'));


-- SET SQL_MODE=@OLD_SQL_MODE;
-- SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
-- SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
