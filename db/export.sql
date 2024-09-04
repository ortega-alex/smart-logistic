-- MySQL Script generated by MySQL Workbench
-- Sun Sep  1 17:27:40 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema smart_logistic
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema smart_logistic
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `smart_logistic` DEFAULT CHARACTER SET utf8mb3 ;
USE `smart_logistic` ;

-- -----------------------------------------------------
-- Table `smart_logistic`.`perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_logistic`.`perfil` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `perfil` VARCHAR(255) NOT NULL,
  `estado` TINYINT NOT NULL DEFAULT '1',
  `fecha_creacion` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `fecha_edicion` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `smart_logistic`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_logistic`.`usuario` (
  `nombre` VARCHAR(255) NOT NULL,
  `usuario` VARCHAR(255) NOT NULL,
  `contrasenia` VARCHAR(255) NOT NULL,
  `telefono` VARCHAR(255) NOT NULL,
  `correo` VARCHAR(255) NOT NULL,
  `estado` TINYINT NOT NULL DEFAULT '1',
  `fecha_creacion` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `fecha_edicion` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` INT NOT NULL AUTO_INCREMENT,
  `perfilId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `IDX_9921cd8ed63a072b8f93ead80f` (`usuario` ASC),
  INDEX `FK_726aef211eec0c16da483d5d291` (`perfilId` ASC),
  CONSTRAINT `FK_726aef211eec0c16da483d5d291`
    FOREIGN KEY (`perfilId`)
    REFERENCES `smart_logistic`.`perfil` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;