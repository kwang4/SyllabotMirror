-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: syllabotdb
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
  `api_id` int NOT NULL AUTO_INCREMENT,
  `api_link` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`api_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
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
  `cdr_id` int NOT NULL AUTO_INCREMENT,
  `cdr_link` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`cdr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
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
  `con_id` int NOT NULL AUTO_INCREMENT,
  `con_usr_id` int NOT NULL,
  `con_qst_id` int NOT NULL,
  PRIMARY KEY (`con_id`),
  KEY `questionID_idx` (`con_qst_id`),
  KEY `conversation_roster_userID_idx` (`con_usr_id`),
  CONSTRAINT `conversation_roster_userID` FOREIGN KEY (`con_usr_id`) REFERENCES `user` (`usr_id`) ON DELETE CASCADE,
  CONSTRAINT `questionID` FOREIGN KEY (`con_qst_id`) REFERENCES `question` (`qst_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation`
--

LOCK TABLES `conversation` WRITE;
/*!40000 ALTER TABLE `conversation` DISABLE KEYS */;
INSERT INTO `conversation` VALUES (7,2,3),(8,2,2),(9,3,1),(10,4,4),(11,5,5);
/*!40000 ALTER TABLE `conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `crs_id` int NOT NULL AUTO_INCREMENT,
  `crs_sem_id` int NOT NULL,
  `crs_name` varchar(100) NOT NULL,
  PRIMARY KEY (`crs_id`),
  KEY `semesterID_idx` (`crs_sem_id`),
  CONSTRAINT `semesterID` FOREIGN KEY (`crs_sem_id`) REFERENCES `semester` (`sem_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,1,'Senior Design'),(2,2,'Data Structures'),(3,3,'Junior Design'),(4,4,'Network Security'),(5,5,'Software Development');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deploy`
--

DROP TABLE IF EXISTS `deploy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deploy` (
  `dep_id` int NOT NULL AUTO_INCREMENT,
  `dep_syl_id` int NOT NULL,
  `dep_typ_id` int NOT NULL,
  `dep_primary_token` varchar(100) NOT NULL,
  `dep_ss_token` VARCHAR(100) NULL,
  `dep_socket_token` VARCHAR(150) NULL,
  PRIMARY KEY (`dep_id`),
  KEY `typeID_idx` (`dep_typ_id`),
  KEY `syllabotID_idx` (`dep_syl_id`),
  CONSTRAINT `syllabotID` FOREIGN KEY (`dep_syl_id`) REFERENCES `syllabot` (`syl_id`) ON DELETE CASCADE,
  CONSTRAINT `typeID` FOREIGN KEY (`dep_typ_id`) REFERENCES `type` (`typ_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deploy`
--

LOCK TABLES `deploy` WRITE;
/*!40000 ALTER TABLE `deploy` DISABLE KEYS */;

INSERT INTO `deploy` VALUES (1,1,1,'xoxb-5808049658741-5943322501495-aknId4txsOqPQCmEbmmTR0BQ', '212a2b125e69b412a55c16326c878cb4', 'xapp-1-A05U5NWGW82-5943289940567-f64907e4039f362875f6aee3860c005a38a906fbef47224d96334f7855dbd08a'),(2,2,2,'MTE0Mzk0MDgyMDU2Nzg1NTE0NQ.GAFg3k.8DUS4Bxm2bsfw4Pff7Ji2Ep8AlVah8J-dIR1RQ', null, null),(3,3,1,'xoxb-6204296349143-6218840809474-CCsNmrZqYoCwl4D5F6vDEkJ1', 'ca4f9b10a6cb0fc7f1aa948f9e75fae0', 'xapp-1-A066EQQJEPL-6204308546055-873bf07f250d850f8904eae6661ffad26ad6005384afd59c4d03e052269fb111'),(4,4,2,'MTE3ODcyMDM5MzkwNTg0NDMxNQ.GPGlm7.Z2NKJenoSSR-mpf2IAHvrS3qDwea5QxKCTLlzA', null, null),(5,5,1,'Slack Primary Token for Deploy 5', 'SS5', 'ST5');

/*,(5,5,1,'Slack Primary Token for Deploy 5', 'SS5', 'ST5')*/
/*!40000 ALTER TABLE `deploy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `fil_id` int NOT NULL AUTO_INCREMENT,
  `fil_link` varchar(300) DEFAULT NULL,
  `fil_name` varchar(90) DEFAULT NULL,
  `fil_parsed_link` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`fil_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (1,'Link to File 1 Location', 'file_name_1','Parsed_link_here'),(2,'Link to File 2 Location', 'file_name_2','Parsed_link2_here');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `period`
--

DROP TABLE IF EXISTS `period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `period` (
  `per_season` varchar(45) NOT NULL,
  PRIMARY KEY (`per_season`)
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
  `qst_id` int NOT NULL AUTO_INCREMENT,
  `qst_question` varchar(5000) NOT NULL,
  `qst_response` varchar(5000) NOT NULL,
  PRIMARY KEY (`qst_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
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
  `rol_id` int NOT NULL,
  `rol_name` varchar(45) NOT NULL,
  PRIMARY KEY (`rol_id`)
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
  `ros_id` int NOT NULL AUTO_INCREMENT,
  `ros_usr_id` int NOT NULL,
  `ros_sec_number` int NOT NULL,
  `ros_rol_id` int NOT NULL,
  `ros_crs_id` int NOT NULL,
  PRIMARY KEY (`ros_usr_id`,`ros_sec_number`,`ros_crs_id`),
  UNIQUE KEY `ros_id_UNIQUE` (`ros_id`),
  KEY `roleID_idx` (`ros_rol_id`),
  KEY `section_num_course_id_idx` (`ros_sec_number`),
  KEY `course_id_idx` (`ros_crs_id`),
  KEY `userID` (`ros_usr_id`),
  CONSTRAINT `course_num_roster` FOREIGN KEY (`ros_crs_id`) REFERENCES `section` (`sec_crs_id`) ON DELETE CASCADE,
  CONSTRAINT `roleID` FOREIGN KEY (`ros_rol_id`) REFERENCES `role` (`rol_id`) ON DELETE CASCADE,
  CONSTRAINT `section_num_roster` FOREIGN KEY (`ros_sec_number`) REFERENCES `section` (`sec_number`) ON DELETE CASCADE,
  CONSTRAINT `userID` FOREIGN KEY (`ros_usr_id`) REFERENCES `user` (`usr_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roster`
--

LOCK TABLES `roster` WRITE;
/*!40000 ALTER TABLE `roster` DISABLE KEYS */;
INSERT INTO `roster` VALUES (1,1,1,2,1),(2,2,2,2,1),(3,3,3,3,2),(4,4,100,4,3),(5,5,100,5,4),(6,5,1,2,2),(7,4,3,2,4),(8,3,2,2,3),(9,2,100,2,5);
/*!40000 ALTER TABLE `roster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section` (
  `sec_crs_id` int NOT NULL,
  `sec_number` int NOT NULL,
  `sec_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`sec_number`,`sec_crs_id`),
  KEY `courseID_idx` (`sec_crs_id`),
  CONSTRAINT `section_course_courseID` FOREIGN KEY (`sec_crs_id`) REFERENCES `course` (`crs_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (1,1,'001'),(2,1,'001'),(3,2,'002'),(4,3,'003'),(5,100,'100');
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section_resource`
--

DROP TABLE IF EXISTS `section_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section_resource` (
  `scr_id` int NOT NULL AUTO_INCREMENT,
  `scr_sec_number` int NOT NULL,
  `scr_crs_id` int NOT NULL,
  `scr_fil_id` int DEFAULT NULL,
  `scr_cdr_id` int DEFAULT NULL,
  `scr_api_id` int DEFAULT NULL,
  `scr_web_id` int DEFAULT NULL,
  PRIMARY KEY (`scr_id`),
  KEY `fileID_idx` (`scr_fil_id`),
  KEY `calendarID_idx` (`scr_cdr_id`),
  KEY `websiteID_idx` (`scr_web_id`),
  KEY `apiID_idx` (`scr_api_id`),
  KEY `section_num_resource_idx` (`scr_sec_number`),
  KEY `course_id_resource_idx` (`scr_crs_id`),
  CONSTRAINT `apiID` FOREIGN KEY (`scr_api_id`) REFERENCES `api` (`api_id`) ON DELETE CASCADE,
  CONSTRAINT `calendarID` FOREIGN KEY (`scr_cdr_id`) REFERENCES `calendar` (`cdr_id`) ON DELETE CASCADE,
  CONSTRAINT `course_id_resource` FOREIGN KEY (`scr_crs_id`) REFERENCES `section` (`sec_crs_id`) ON DELETE CASCADE,
  CONSTRAINT `fileID` FOREIGN KEY (`scr_fil_id`) REFERENCES `file` (`fil_id`) ON DELETE CASCADE,
  CONSTRAINT `section_num_resource` FOREIGN KEY (`scr_sec_number`) REFERENCES `section` (`sec_number`) ON DELETE CASCADE,
  CONSTRAINT `websiteID` FOREIGN KEY (`scr_web_id`) REFERENCES `website` (`web_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section_resource`
--

LOCK TABLES `section_resource` WRITE;
/*!40000 ALTER TABLE `section_resource` DISABLE KEYS */;
INSERT INTO `section_resource` VALUES (7,1,1,1,NULL,NULL,NULL),(8,2,1,NULL,1,NULL,NULL),(9,3,2,NULL,NULL,1,NULL),(10,100,2,NULL,NULL,NULL,1),(11,100,3,2,NULL,NULL,NULL);
/*!40000 ALTER TABLE `section_resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section_syllabot`
--

DROP TABLE IF EXISTS `section_syllabot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section_syllabot` (
  `scl_id` int NOT NULL AUTO_INCREMENT,
  `scl_dep_id` int NOT NULL,
  `scl_sec_number` int NOT NULL,
  `scl_crs_id` int NOT NULL,
  PRIMARY KEY (`scl_id`),
  KEY `section_num_join_idx` (`scl_sec_number`),
  KEY `course_id_join_idx` (`scl_crs_id`),
  KEY `deployID` (`scl_dep_id`),
  CONSTRAINT `course_id_join` FOREIGN KEY (`scl_crs_id`) REFERENCES `section` (`sec_crs_id`) ON DELETE CASCADE,
  CONSTRAINT `deployID` FOREIGN KEY (`scl_dep_id`) REFERENCES `deploy` (`dep_id`) ON DELETE CASCADE,
  CONSTRAINT `section_num_join` FOREIGN KEY (`scl_sec_number`) REFERENCES `section` (`sec_number`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section_syllabot`
--

LOCK TABLES `section_syllabot` WRITE;
/*!40000 ALTER TABLE `section_syllabot` DISABLE KEYS */;
INSERT INTO `section_syllabot` VALUES (7,1,1,1),(8,2,2,2),(9,3,3,3),(10,4,100,4),(11,5,100,5);
/*!40000 ALTER TABLE `section_syllabot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semester`
--

DROP TABLE IF EXISTS `semester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semester` (
  `sem_id` int NOT NULL AUTO_INCREMENT,
  `sem_season` varchar(45) NOT NULL,
  `sem_year` int NOT NULL,
  PRIMARY KEY (`sem_id`),
  KEY `season_idx` (`sem_season`),
  CONSTRAINT `season` FOREIGN KEY (`sem_season`) REFERENCES `period` (`per_season`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
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
  `syl_id` int NOT NULL AUTO_INCREMENT,
  `syl_crs_id` int NOT NULL,
  `syl_name` varchar(100) NOT NULL,
  `syl_prompt_flavor` varchar(300) DEFAULT NULL,
  `syl_profile_picture` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`syl_id`),
  KEY `courseID_idx` (`syl_crs_id`),
  CONSTRAINT `syllabot_course_courseID` FOREIGN KEY (`syl_crs_id`) REFERENCES `course` (`crs_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
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
  `typ_id` int NOT NULL AUTO_INCREMENT,
  `typ_name` varchar(45) NOT NULL,
  PRIMARY KEY (`typ_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
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
  `usr_id` int NOT NULL AUTO_INCREMENT,
  `usr_is_admin` tinyint NOT NULL,
  `usr_formal_name` varchar(75) NOT NULL,
  `usr_preferred_name` varchar(75) DEFAULT NULL,
  `usr_unity_id` varchar(45) NOT NULL,
  `usr_is_teacher` tinyint NOT NULL,
  PRIMARY KEY (`usr_id`),
  UNIQUE KEY `unity_id_UNIQUE` (`usr_unity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'Partin,Brandon','P_Partin,Brandon','blpartin',1),(2,1,'Riggs,Collin','P_Riggs,Collin','cmriggs', 1),(3,1,'Wang,Kai-En','P_Wang,Kai-En','kwang23',1),(4,1,'Hall,Jackson','P_Hall,Jackson','jdhall9', 1),(5,1,'Buchanan,Daniel','P_Buchanan,Daniel','dbuchanan', 1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `website`
--

DROP TABLE IF EXISTS `website`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `website` (
  `web_id` int NOT NULL AUTO_INCREMENT,
  `web_link` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`web_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;
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

-- Dump completed on 2023-10-25 10:25:20