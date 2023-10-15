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
-- Table structure for table `api`
--

DROP TABLE IF EXISTS `api`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api` (
  `apiID` int NOT NULL,
  `link` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`apiID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api`
--

LOCK TABLES `api` WRITE;
/*!40000 ALTER TABLE `api` DISABLE KEYS */;
INSERT INTO `api` VALUES (1,'Link to API 1 Location');
/*!40000 ALTER TABLE `api` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendar`
--

DROP TABLE IF EXISTS `calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar` (
  `calendarID` int NOT NULL,
  `link` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`calendarID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar`
--

LOCK TABLES `calendar` WRITE;
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
INSERT INTO `calendar` VALUES (1,'Link to Calendar 1 Location');
/*!40000 ALTER TABLE `calendar` ENABLE KEYS */;
UNLOCK TABLES;

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
  KEY `conversation_roster_userID_idx` (`userID`),
  CONSTRAINT `conversation_roster_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  CONSTRAINT `questionID` FOREIGN KEY (`questionID`) REFERENCES `question` (`questionID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation`
--

LOCK TABLES `conversation` WRITE;
/*!40000 ALTER TABLE `conversation` DISABLE KEYS */;
INSERT INTO `conversation` VALUES (1,2,3),(2,2,2),(3,3,1),(4,4,4),(5,5,5);
/*!40000 ALTER TABLE `conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `courseID` int NOT NULL AUTO_INCREMENT,
  `semesterID` int NOT NULL,
  `courseName` varchar(100) NOT NULL,
  PRIMARY KEY (`courseID`),
  KEY `semesterID_idx` (`semesterID`),
  CONSTRAINT `semesterID` FOREIGN KEY (`semesterID`) REFERENCES `semester` (`semesterID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,1,'Senior Design'),(2,2,'Data Structures'),(3,3,'Senior Design'),(4,4,'Network Security'),(5,5,'Software Development');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deploy`
--

LOCK TABLES `deploy` WRITE;
/*!40000 ALTER TABLE `deploy` DISABLE KEYS */;
INSERT INTO `deploy` VALUES (1,1,1,'Slack Primary Token for Deploy 1'),(2,2,2,'Discord Primary Token for Deploy 2'),(3,3,1,'Slack Primary Token for Deploy 3'),(4,4,2,'Discord Primary Token for Deploy 4'),(5,5,1,'Slack Primary Token for Deploy 5');
/*!40000 ALTER TABLE `deploy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `fileID` int NOT NULL,
  `link` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`fileID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (1,'Link to File 1 Location'),(2,'Link to File 2 Location');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `period`
--

DROP TABLE IF EXISTS `period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `period` (
  `season` varchar(45) NOT NULL,
  PRIMARY KEY (`season`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `period`
--

LOCK TABLES `period` WRITE;
/*!40000 ALTER TABLE `period` DISABLE KEYS */;
INSERT INTO `period` VALUES ('Fall'),('Maymester'),('Spring'),('Summer 1'),('Summer 2');
/*!40000 ALTER TABLE `period` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'Who am I?','You are Brandon Partin'),(2,'What are you?','A very intelligent robot'),(3,'Where am I?','NCSU'),(4,'When is lunch?','Typically around Noon'),(5,'Why do we exist?','IDK bro...');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `roleID` int NOT NULL,
  `roleName` varchar(45) NOT NULL,
  PRIMARY KEY (`roleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Teacher'),(3,'Teacher Assistant'),(4,'Student'),(5,'Guest');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roster`
--

DROP TABLE IF EXISTS `roster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roster` (
  `rosterID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `sectionNum` int NOT NULL,
  `roleID` int NOT NULL,
  `courseID` int NOT NULL,
  PRIMARY KEY (`rosterID`),
  KEY `roleID_idx` (`roleID`),
  KEY `section_num_course_id_idx` (`sectionNum`),
  KEY `course_id_idx` (`courseID`),
  KEY `userID` (`userID`),
  CONSTRAINT `course_num_roster` FOREIGN KEY (`courseID`) REFERENCES `section` (`courseID`),
  CONSTRAINT `roleID` FOREIGN KEY (`roleID`) REFERENCES `role` (`roleID`),
  CONSTRAINT `section_num_roster` FOREIGN KEY (`sectionNum`) REFERENCES `section` (`sectionNum`),
  CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roster`
--

LOCK TABLES `roster` WRITE;
/*!40000 ALTER TABLE `roster` DISABLE KEYS */;
INSERT INTO `roster` VALUES (1,1,1,1,1),(2,2,2,2,1),(3,3,3,3,2),(4,4,100,4,3),(5,5,100,5,4);
/*!40000 ALTER TABLE `roster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section` (
  `courseID` int NOT NULL,
  `sectionNum` int NOT NULL,
  PRIMARY KEY (`sectionNum`,`courseID`),
  KEY `courseID_idx` (`courseID`),
  CONSTRAINT `section_course_courseID` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (1,1),(2,1),(3,2),(4,3),(5,100);
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section_resource`
--

DROP TABLE IF EXISTS `section_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section_resource` (
  `section_resource_ID` varchar(45) NOT NULL,
  `sectionNum` int NOT NULL,
  `courseID` int NOT NULL,
  `fileID` int DEFAULT NULL,
  `calendarID` int DEFAULT NULL,
  `apiID` int DEFAULT NULL,
  `websiteID` int DEFAULT NULL,
  PRIMARY KEY (`section_resource_ID`),
  KEY `fileID_idx` (`fileID`),
  KEY `calendarID_idx` (`calendarID`),
  KEY `websiteID_idx` (`websiteID`),
  KEY `apiID_idx` (`apiID`),
  KEY `section_num_resource_idx` (`sectionNum`),
  KEY `course_id_resource_idx` (`courseID`),
  CONSTRAINT `apiID` FOREIGN KEY (`apiID`) REFERENCES `api` (`apiID`),
  CONSTRAINT `calendarID` FOREIGN KEY (`calendarID`) REFERENCES `calendar` (`calendarID`),
  CONSTRAINT `course_id_resource` FOREIGN KEY (`courseID`) REFERENCES `section` (`courseID`),
  CONSTRAINT `fileID` FOREIGN KEY (`fileID`) REFERENCES `file` (`fileID`),
  CONSTRAINT `section_num_resource` FOREIGN KEY (`sectionNum`) REFERENCES `section` (`sectionNum`),
  CONSTRAINT `websiteID` FOREIGN KEY (`websiteID`) REFERENCES `website` (`websiteID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section_resource`
--

LOCK TABLES `section_resource` WRITE;
/*!40000 ALTER TABLE `section_resource` DISABLE KEYS */;
INSERT INTO `section_resource` VALUES ('1',1,1,1,NULL,NULL,NULL),('2',2,1,NULL,1,NULL,NULL),('3',3,2,NULL,NULL,1,NULL),('4',100,2,NULL,NULL,NULL,1),('5',100,3,2,NULL,NULL,NULL);
/*!40000 ALTER TABLE `section_resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section_syllabot`
--

DROP TABLE IF EXISTS `section_syllabot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section_syllabot` (
  `sect_syl_ID` varchar(45) NOT NULL,
  `deployID` int NOT NULL,
  `sectionNum` int NOT NULL,
  `courseID` int NOT NULL,
  PRIMARY KEY (`sect_syl_ID`),
  KEY `section_num_join_idx` (`sectionNum`),
  KEY `course_id_join_idx` (`courseID`),
  KEY `deployID` (`deployID`),
  CONSTRAINT `course_id_join` FOREIGN KEY (`courseID`) REFERENCES `section` (`courseID`),
  CONSTRAINT `deployID` FOREIGN KEY (`deployID`) REFERENCES `deploy` (`deployID`),
  CONSTRAINT `section_num_join` FOREIGN KEY (`sectionNum`) REFERENCES `section` (`sectionNum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section_syllabot`
--

LOCK TABLES `section_syllabot` WRITE;
/*!40000 ALTER TABLE `section_syllabot` DISABLE KEYS */;
INSERT INTO `section_syllabot` VALUES ('1',1,1,1),('2',2,2,2),('3',3,3,3),('4',4,100,4),('5',5,100,5);
/*!40000 ALTER TABLE `section_syllabot` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semester`
--

LOCK TABLES `semester` WRITE;
/*!40000 ALTER TABLE `semester` DISABLE KEYS */;
INSERT INTO `semester` VALUES (1,'Maymester',2023),(2,'Summer 1',2024),(3,'Summer 2',2025),(4,'Fall',2026),(5,'Spring',2027);
/*!40000 ALTER TABLE `semester` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `syllabot_course_courseID` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `syllabot`
--

LOCK TABLES `syllabot` WRITE;
/*!40000 ALTER TABLE `syllabot` DISABLE KEYS */;
INSERT INTO `syllabot` VALUES (1,1,'Sylla_1','prompt flavor 1','link to profile pic for Sylla 1'),(2,2,'Sylla_2','prompt flavor 2','link to profile pic for Sylla 2'),(3,3,'Sylla_3','prompt flavor 3','link to profile pic for Sylla 3'),(4,4,'Sylla_4','prompt flavor 4','link to profile pic for Sylla 4'),(5,5,'Sylla_5','prompt flavor 5','link to profile pic for Sylla 5');
/*!40000 ALTER TABLE `syllabot` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'Slack'),(2,'Discord');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `is_admin` tinyint NOT NULL,
  `name` varchar(75) NOT NULL,
  `unityid` varchar(45) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'Brandon Lee Partin','blpartin'),(2,0,'Collin Riggs','cmriggs'),(3,0,'Kai-En Wang','kwang23'),(4,0,'Jackson Hall','jphall'),(5,0,'Daniel Buchanan','dsbuchanan');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `website`
--

DROP TABLE IF EXISTS `website`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `website` (
  `websiteID` int NOT NULL,
  `link` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`websiteID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website`
--

LOCK TABLES `website` WRITE;
/*!40000 ALTER TABLE `website` DISABLE KEYS */;
INSERT INTO `website` VALUES (1,'Link to Website 1 Location');
/*!40000 ALTER TABLE `website` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-15 13:59:09
