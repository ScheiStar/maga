-- MySQL Script generated by MySQL Workbench
-- Tue Apr 19 13:29:08 2016
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema alecDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema alecDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `alecDB` DEFAULT CHARACTER SET utf8 ;
USE `alecDB` ;

-- -----------------------------------------------------
-- Table `alecDB`.`Tutors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`Tutors` ;

CREATE TABLE IF NOT EXISTS `alecDB`.`Tutors` (
  `tutor_id` INT NOT NULL,
  `tutor_first_name` VARCHAR(45) NULL COMMENT '	',
  `tutor_last_name` VARCHAR(45) NULL,
  `tutor_email` VARCHAR(45) NULL,
  `tutor_phone` VARCHAR(45) NULL,
  `tutor_gpa` DECIMAL(3) NULL,
  `tutor_major` VARCHAR(45) NULL,
  PRIMARY KEY (`tutor_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alecDB`.`Timeslots`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`Timeslots` ;

CREATE TABLE IF NOT EXISTS `alecDB`.`Timeslots` (
  `timeslot_id` INT NOT NULL AUTO_INCREMENT,
  `timeslot_time` INT NOT NULL,
  `Tutors_tutor_id` INT NOT NULL,
  `timeslot_day` INT NOT NULL,
  PRIMARY KEY (`timeslot_id`),
  INDEX `fk_Timeslots_Tutors1_idx` (`Tutors_tutor_id` ASC),
  CONSTRAINT `fk_Timeslots_Tutors1`
    FOREIGN KEY (`Tutors_tutor_id`)
    REFERENCES `alecDB`.`Tutors` (`tutor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alecDB`.`Sessions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`Sessions` ;

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
  PRIMARY KEY (`session_id`),
  INDEX `fk_Sessions_Tutors_idx` (`Tutors_tutor_id` ASC),
  CONSTRAINT `fk_Sessions_Tutors`
    FOREIGN KEY (`Tutors_tutor_id`)
    REFERENCES `alecDB`.`Tutors` (`tutor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alecDB`.`Applicants`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`Applicants` ;

CREATE TABLE IF NOT EXISTS `alecDB`.`Applicants` (
  `applicant_id` INT NOT NULL,
  `applicant_first_name` VARCHAR(45) NULL,
  `applicant_last_name` VARCHAR(45) NULL,
  `applicant_email` VARCHAR(45) NULL,
  `applicant_gpa` DECIMAL(3) NULL,
  `applicant_major` VARCHAR(45) NULL,
  `application_status` VARCHAR(45) NULL,
  `applicant_hash` VARCHAR(60) NULL,
  PRIMARY KEY (`applicant_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alecDB`.`ApplicantTimeslots`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`ApplicantTimeslots` ;

CREATE TABLE IF NOT EXISTS `alecDB`.`ApplicantTimeslots` (
  `timeslot_id` INT NOT NULL AUTO_INCREMENT,
  `timeslot_time` INT NOT NULL,
  `Applicant_applicant_id` INT NOT NULL,
  `timeslot_day` INT NOT NULL,
  PRIMARY KEY (`timeslot_id`),
  INDEX `fk_ApplicantTimeslots_Applicants1_idx` (`Applicants_applicant_id` ASC),
  CONSTRAINT `fk_ApplicantTimeslots_Applicants1`
    FOREIGN KEY (`Applicants_applicant_id`)
    REFERENCES `alecDB`.`Applicants` (`applicant_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alecDB`.`Reviews`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`Reviews` ;

CREATE TABLE IF NOT EXISTS `alecDB`.`Reviews` (
  `review_id` INT NOT NULL,
  `score_helpfulness` INT NULL,
  `score_clarity` INT NULL,
  `score_friendlynes` INT NULL,
  `Sessions_session_id` INT NOT NULL,
  `score_avg` INT NULL,
  `review_comments` VARCHAR(500) NULL,
  PRIMARY KEY (`review_id`),
  INDEX `fk_Reviews_Sessions1_idx` (`Sessions_session_id` ASC),
  CONSTRAINT `fk_Reviews_Sessions1`
    FOREIGN KEY (`Sessions_session_id`)
    REFERENCES `alecDB`.`Sessions` (`session_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alecDB`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`Users` ;

CREATE TABLE IF NOT EXISTS `alecDB`.`Users` (
  `user_id` INT NOT NULL,
  `hash` VARCHAR(60) NULL,
  `admin` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alecDB`.`Admins`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`Admins` ;

CREATE TABLE IF NOT EXISTS `alecDB`.`Admins` (
  `admin_id` INT NOT NULL,
  `admin_first_name` VARCHAR(45) NULL,
  `admin_last_name` VARCHAR(45) NULL,
  `admin_email` VARCHAR(45) NULL,
  `admin_phone` VARCHAR(45) NULL,
  PRIMARY KEY (`admin_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alecDB`.`TutorClasses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`TutorClasses` ;

CREATE TABLE IF NOT EXISTS `alecDB`.`TutorClasses` (
  `tutorclass_id` INT NOT NULL,
  `class_type` VARCHAR(4) NULL,
  `class_num` VARCHAR(4) NULL,
  `class_grade` VARCHAR(3) NULL,
  `Tutors_tutor_id` INT NOT NULL,
  PRIMARY KEY (`tutorclass_id`),
  INDEX `fk_TutorClasses_Tutors1_idx` (`Tutors_tutor_id` ASC),
  CONSTRAINT `fk_TutorClasses_Tutors1`
    FOREIGN KEY (`Tutors_tutor_id`)
    REFERENCES `alecDB`.`Tutors` (`tutor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alecDB`.`ApplicantClasses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`ApplicantClasses` ;

CREATE TABLE IF NOT EXISTS `alecDB`.`ApplicantClasses` (
  `idApplicantClasses` INT NOT NULL AUTO_INCREMENT,
  `class_name` VARCHAR(45) NULL,
  `class_gpa` VARCHAR(2) NULL,
  `class_number` VARCHAR(4) NULL,
  `Applicants_applicant_id` INT NOT NULL,
  PRIMARY KEY (`idApplicantClasses`),
  INDEX `fk_ApplicantClasses_Applicants1_idx` (`Applicants_applicant_id` ASC),
  CONSTRAINT `fk_ApplicantClasses_Applicants1`
    FOREIGN KEY (`Applicants_applicant_id`)
    REFERENCES `alecDB`.`Applicants` (`applicant_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alecDB`.`TutorRequests`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alecDB`.`TutorRequests` ;

CREATE TABLE IF NOT EXISTS `alecDB`.`TutorRequests` (
  `tr_id` INT NOT NULL AUTO_INCREMENT,
  `tr_tutor_id` INT NULL,
  `tr_classtype` VARCHAR(4) NULL,
  `tr_classnum` VARCHAR(4) NULL,
  `Tutors_tutor_id` INT NOT NULL,
  `tr_request_type` VARCHAR(4) NULL,
  PRIMARY KEY (`tr_id`),
  INDEX `fk_TutorRequests_Tutors1_idx` (`Tutors_tutor_id` ASC),
  CONSTRAINT `fk_TutorRequests_Tutors1`
    FOREIGN KEY (`Tutors_tutor_id`)
    REFERENCES `alecDB`.`Tutors` (`tutor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
