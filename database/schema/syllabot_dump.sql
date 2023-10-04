-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: syllabot
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `conversation`
--

DROP TABLE IF EXISTS `conversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversation` (
  `convID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `questionID` int NOT NULL,
  PRIMARY KEY (`convID`),
  KEY `questionID_idx` (`questionID`),
  KEY `userID_idx` (`userID`),
  CONSTRAINT `conversation_roster_userID` FOREIGN KEY (`userID`) REFERENCES `roster` (`userID`),
  CONSTRAINT `questionID` FOREIGN KEY (`questionID`) REFERENCES `question` (`questionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `courseID` int NOT NULL AUTO_INCREMENT,
  `semesterID` int DEFAULT NULL,
  `courseName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`courseID`),
  KEY `semesterID_idx` (`semesterID`),
  CONSTRAINT `semesterID` FOREIGN KEY (`semesterID`) REFERENCES `semester` (`semesterID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `deploy`
--

DROP TABLE IF EXISTS `deploy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deploy` (
  `deployID` int NOT NULL AUTO_INCREMENT,
  `syllabotID` int NOT NULL,
  `typeID` int NOT NULL,
  `primaryToken` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`deployID`),
  KEY `typeID_idx` (`typeID`),
  KEY `syllabotID_idx` (`syllabotID`),
  CONSTRAINT `syllabotID` FOREIGN KEY (`syllabotID`) REFERENCES `syllabot` (`syllabotID`),
  CONSTRAINT `typeID` FOREIGN KEY (`typeID`) REFERENCES `type` (`typeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `period`
--

DROP TABLE IF EXISTS `period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `period` (
  `season` varchar(45) NOT NULL,
  PRIMARY KEY (`season`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `questionID` int NOT NULL AUTO_INCREMENT,
  `question` varchar(5000) DEFAULT NULL,
  `response` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`questionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roster`
--

DROP TABLE IF EXISTS `roster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roster` (
  `rosterID` varchar(45) NOT NULL,
  `userID` int NOT NULL,
  `section_sectionID` int NOT NULL,
  `roleID` int NOT NULL,
  PRIMARY KEY (`rosterID`),
  KEY `sectionID_idx` (`section_sectionID`),
  KEY `roleID_idx` (`roleID`),
  KEY `userID` (`userID`),
  CONSTRAINT `roleID` FOREIGN KEY (`roleID`) REFERENCES `role` (`roleID`),
  CONSTRAINT `section_sectionID` FOREIGN KEY (`section_sectionID`) REFERENCES `section` (`sectionID`),
  CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section` (
  `sectionID` int NOT NULL AUTO_INCREMENT,
  `cID` int NOT NULL,
  `sectionNumber` int DEFAULT NULL,
  PRIMARY KEY (`sectionID`),
  KEY `courseID_idx` (`cID`),
  CONSTRAINT `cID` FOREIGN KEY (`cID`) REFERENCES `course` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `section_resource`
--

DROP TABLE IF EXISTS `section_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section_resource` (
  `section_resource_ID` varchar(45) NOT NULL,
  `sectID` int NOT NULL,
  `fileID` int DEFAULT NULL,
  `calendarID` int DEFAULT NULL,
  `apiID` int DEFAULT NULL,
  `websiteID` int DEFAULT NULL,
  PRIMARY KEY (`section_resource_ID`),
  KEY `fileID_idx` (`fileID`),
  KEY `calendarID_idx` (`calendarID`),
  KEY `websiteID_idx` (`websiteID`),
  KEY `apiID_idx` (`apiID`),
  KEY `sectID` (`sectID`),
  CONSTRAINT `apiID` FOREIGN KEY (`apiID`) REFERENCES `api` (`apiID`),
  CONSTRAINT `calendarID` FOREIGN KEY (`calendarID`) REFERENCES `calendar` (`calendarID`),
  CONSTRAINT `fileID` FOREIGN KEY (`fileID`) REFERENCES `file` (`fileID`),
  CONSTRAINT `sectID` FOREIGN KEY (`sectID`) REFERENCES `section` (`sectionID`),
  CONSTRAINT `websiteID` FOREIGN KEY (`websiteID`) REFERENCES `website` (`websiteID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `section_syllabot`
--

DROP TABLE IF EXISTS `section_syllabot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section_syllabot` (
  `deployID` int NOT NULL,
  `sectionID` int NOT NULL,
  PRIMARY KEY (`deployID`,`sectionID`),
  KEY `sectionID_idx` (`sectionID`),
  CONSTRAINT `deployID` FOREIGN KEY (`deployID`) REFERENCES `deploy` (`deployID`),
  CONSTRAINT `sectionID` FOREIGN KEY (`sectionID`) REFERENCES `section` (`sectionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `semester`
--

DROP TABLE IF EXISTS `semester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semester` (
  `semesterID` int NOT NULL AUTO_INCREMENT,
  `season` varchar(45) NOT NULL,
  `year` int NOT NULL,
  PRIMARY KEY (`semesterID`),
  KEY `season_idx` (`season`),
  CONSTRAINT `season` FOREIGN KEY (`season`) REFERENCES `period` (`season`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `syllabot`
--

DROP TABLE IF EXISTS `syllabot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `syllabot` (
  `syllabotID` int NOT NULL AUTO_INCREMENT,
  `courseID` int NOT NULL,
  `botName` varchar(100) NOT NULL,
  `promptFlavor` varchar(300) DEFAULT NULL,
  `profilePicture` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`syllabotID`),
  KEY `courseID_idx` (`courseID`),
  CONSTRAINT `courseID` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `typeID` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`typeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `is_admin` int NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-29 12:23:02
