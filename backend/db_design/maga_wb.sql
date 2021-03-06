-- MySQL Script generated by MySQL Workbench
-- Sat Apr 23 23:48:35 2016
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema alecDB
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `alecDB` ;

-- -----------------------------------------------------
-- Schema alecDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `alecDB` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `alecDB` ;

-- -----------------------------------------------------
-- Table `alecDB`.`Tutors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`Tutors` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `alecDB`.`Tutors` (
  `tutor_id` INT NOT NULL,
  `tutor_first_name` VARCHAR(45) NULL COMMENT '	',
  `tutor_last_name` VARCHAR(45) NULL,
  `tutor_email` VARCHAR(45) NULL,
  `tutor_phone` VARCHAR(45) NULL,
  `tutor_gpa` VARCHAR(5) NULL,
  `tutor_major` VARCHAR(45) NULL,
  PRIMARY KEY (`tutor_id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `alecDB`.`Timeslots`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`Timeslots` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `alecDB`.`Timeslots` (
  `timeslot_id` INT NOT NULL AUTO_INCREMENT,
  `timeslot_time` INT NULL,
  `Tutors_tutor_id` INT NOT NULL,
  `timeslot_day` INT NULL,
  PRIMARY KEY (`timeslot_id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `alecDB`.`Sessions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`Sessions` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `alecDB`.`Sessions` (
  `session_id` INT NOT NULL,
  `session_date` DATE NULL,
  `session_time` VARCHAR(45) NULL,
  `Tutors_tutor_id` INT NOT NULL,
  `student_id` VARCHAR(45) NULL,
  `student_email` VARCHAR(45) NULL,
  `session_start_time` VARCHAR(45) NULL,
  `session_end_time` VARCHAR(45) NULL,
  `student_first_name` VARCHAR(45) NULL,
  `student_last_name` VARCHAR(45) NULL,
  PRIMARY KEY (`session_id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `alecDB`.`Applicants`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`Applicants` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `alecDB`.`Applicants` (
  `applicant_id` INT NOT NULL,
  `applicant_first_name` VARCHAR(45) NULL,
  `applicant_last_name` VARCHAR(45) NULL,
  `applicant_email` VARCHAR(45) NULL,
  `applicant_gpa` VARCHAR(5) NULL,
  `applicant_major` VARCHAR(45) NULL,
  `application_status` VARCHAR(45) NULL,
  `applicant_hash` VARCHAR(60) NULL,
  PRIMARY KEY (`applicant_id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `alecDB`.`ApplicantTimeslots`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`ApplicantTimeslots` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `alecDB`.`ApplicantTimeslots` (
  `timeslot_id` INT NOT NULL AUTO_INCREMENT,
  `timeslot_time` INT NULL,
  `Applicants_applicant_id` INT NOT NULL,
  `timeslot_day` INT NULL,
  PRIMARY KEY (`timeslot_id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `alecDB`.`Reviews`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`Reviews` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `alecDB`.`Reviews` (
  `review_id` INT NOT NULL,
  `score_helpfulness` INT NULL,
  `score_clarity` INT NULL,
  `score_friendlynes` INT NULL,
  `Sessions_session_id` INT NOT NULL,
  `score_avg` INT NULL,
  `review_comments` VARCHAR(500) NULL,
  PRIMARY KEY (`review_id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `alecDB`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`Users` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `alecDB`.`Users` (
  `user_id` INT NOT NULL,
  `hash` VARCHAR(60) NULL,
  `admin` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `alecDB`.`Admins`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`Admins` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `alecDB`.`Admins` (
  `admin_id` INT NOT NULL,
  `admin_first_name` VARCHAR(45) NULL,
  `admin_last_name` VARCHAR(45) NULL,
  `admin_email` VARCHAR(45) NULL,
  `admin_phone` VARCHAR(45) NULL,
  PRIMARY KEY (`admin_id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `alecDB`.`TutorClasses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`TutorClasses` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `alecDB`.`TutorClasses` (
  `tutorclass_id` INT NOT NULL AUTO_INCREMENT,
  `class_type` VARCHAR(4) NULL,
  `class_num` VARCHAR(4) NULL,
  `class_grade` VARCHAR(3) NULL,
  `Tutors_tutor_id` INT NOT NULL,
  PRIMARY KEY (`tutorclass_id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `alecDB`.`ApplicantClasses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`ApplicantClasses` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `alecDB`.`ApplicantClasses` (
  `idApplicantClasses` INT NOT NULL AUTO_INCREMENT,
  `class_type` VARCHAR(4) NULL,
  `class_num` VARCHAR(4) NULL,
  `class_grade` VARCHAR(3) NULL,
  `Applicants_applicant_id` INT NOT NULL,
  PRIMARY KEY (`idApplicantClasses`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `alecDB`.`TutorRequests`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`TutorRequests` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `alecDB`.`TutorRequests` (
  `tr_id` INT NOT NULL AUTO_INCREMENT,
  `tr_tutor_id` INT NULL,
  `tr_classtype` VARCHAR(4) NULL,
  `tr_classnum` VARCHAR(4) NULL,
  `Tutors_tutor_id` INT NOT NULL,
  `tr_request_type` VARCHAR(4) NULL,
  PRIMARY KEY (`tr_id`))
ENGINE = InnoDB;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
