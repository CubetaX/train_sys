-- MySQL Script generated by MySQL Workbench
-- Mon Jun 11 14:02:44 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Department` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `manager` VARCHAR(45) NULL,
  `intro` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Person` (
  `ID` INT NOT NULL,
  `password` VARCHAR(45) NULL,
  `authority` INT NULL,
  `name` VARCHAR(45) NULL,
  `sex` VARCHAR(45) NULL,
  `birthday` VARCHAR(45) NULL,
  `job` VARCHAR(45) NULL,
  `edu` VARCHAR(45) NULL,
  `speciaty` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `tel` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `state` INT NULL,
  `remark` VARCHAR(45) NULL COMMENT '备注',
  `Department_id` INT NOT NULL,
  PRIMARY KEY (`ID`, `Department_id`),
  INDEX `fk_Person_Department1_idx` (`Department_id` ASC),
  CONSTRAINT `fk_Person_Department1`
    FOREIGN KEY (`Department_id`)
    REFERENCES `mydb`.`Department` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Course_state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Course_state` (
  `code` INT NOT NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`code`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Apprisement_state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Apprisement_state` (
  `code` INT NOT NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`code`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Courese`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Courese` (
  `ID` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `teacher_id` INT NULL,
  `intro` VARCHAR(45) NULL,
  `book` VARCHAR(45) NULL,
  `classroom` VARCHAR(45) NULL,
  `number` INT NULL COMMENT '人数上线',
  `classtime` DATE NULL,
  `Course_state_code` INT NOT NULL,
  PRIMARY KEY (`ID`, `Course_state_code`),
  INDEX `fk_Courese_Course_state1_idx` (`Course_state_code` ASC),
  CONSTRAINT `fk_Courese_Course_state1`
    FOREIGN KEY (`Course_state_code`)
    REFERENCES `mydb`.`Course_state` (`code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Traning_plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Traning_plan` (
  `ID` INT NOT NULL,
  `score` VARCHAR(45) NULL,
  `appraisement` VARCHAR(45) NULL,
  `exam_data` DATE NULL,
  `Courese_ID` INT NOT NULL,
  `Person_ID` INT NOT NULL,
  `Apprisement_state_code` INT NOT NULL,
  PRIMARY KEY (`ID`, `Courese_ID`, `Person_ID`, `Apprisement_state_code`),
  INDEX `fk_Traning_plan_Courese_idx` (`Courese_ID` ASC),
  INDEX `fk_Traning_plan_Person1_idx` (`Person_ID` ASC),
  INDEX `fk_Traning_plan_Apprisement_state1_idx` (`Apprisement_state_code` ASC),
  CONSTRAINT `fk_Traning_plan_Courese`
    FOREIGN KEY (`Courese_ID`)
    REFERENCES `mydb`.`Courese` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Traning_plan_Person1`
    FOREIGN KEY (`Person_ID`)
    REFERENCES `mydb`.`Person` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Traning_plan_Apprisement_state1`
    FOREIGN KEY (`Apprisement_state_code`)
    REFERENCES `mydb`.`Apprisement_state` (`code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
