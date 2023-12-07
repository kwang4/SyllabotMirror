--
-- Dumping data for table `semester`
--

LOCK TABLES `semester` WRITE;
/*!40000 ALTER TABLE `semester` DISABLE KEYS */;
INSERT INTO `semester` VALUES (1,'Maymester',2023),(2,'Summer 1',2024),(3,'Summer 2',2025),(4,'Fall',2026),(5,'Spring',2027);
/*!40000 ALTER TABLE `semester` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,1,'Senior Design'),(2,2,'Data Structures'),(3,3,'Junior Design'),(4,4,'Network Security'),(5,5,'Software Development');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `syllabot`
--

LOCK TABLES `syllabot` WRITE;
/*!40000 ALTER TABLE `syllabot` DISABLE KEYS */;
INSERT INTO `syllabot` VALUES (1,1,'Sylla_1','prompt flavor 1','link to profile pic for Sylla 1'),(2,2,'Sylla_2','prompt flavor 2','link to profile pic for Sylla 2'),(3,3,'Sylla_3','prompt flavor 3','link to profile pic for Sylla 3'),(4,4,'Sylla_4','prompt flavor 4','link to profile pic for Sylla 4'),(5,5,'Sylla_5','prompt flavor 5','link to profile pic for Sylla 5');
/*!40000 ALTER TABLE `syllabot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `deploy`
--

LOCK TABLES `deploy` WRITE;
/*!40000 ALTER TABLE `deploy` DISABLE KEYS */;

INSERT INTO `deploy` VALUES (1,1,1,'xoxb-5808049658741-5943322501495-aknId4txsOqPQCmEbmmTR0BQ', '212a2b125e69b412a55c16326c878cb4', 'xapp-1-A05U5NWGW82-5943289940567-f64907e4039f362875f6aee3860c005a38a906fbef47224d96334f7855dbd08a', 'T05PS1FKCMT'),(2,2,2,'MTE0Mzk0MDgyMDU2Nzg1NTE0NQ.GAFg3k.8DUS4Bxm2bsfw4Pff7Ji2Ep8AlVah8J-dIR1RQ', '1143940820567855145', null, 'random'),(3,3,1,'xoxb-6204296349143-6218840809474-CCsNmrZqYoCwl4D5F6vDEkJ1', 'ca4f9b10a6cb0fc7f1aa948f9e75fae0', 'xapp-1-A066EQQJEPL-6204308546055-873bf07f250d850f8904eae6661ffad26ad6005384afd59c4d03e052269fb111', 'random'),(4,4,2,'MTE3ODcyMDM5MzkwNTg0NDMxNQ.GPGlm7.Z2NKJenoSSR-mpf2IAHvrS3qDwea5QxKCTLlzA', '1178720393905844315', null, '1143902737147363458'),(5,5,1,'xoxb-6204296349143-6218840809474-OijzTZ6UhcD3eGFyL7qdRXqk', 'ca4f9b10a6cb0fc7f1aa948f9e75fae0', 'xapp-1-A066EQQJEPL-6204308546055-873bf07f250d850f8904eae6661ffad26ad6005384afd59c4d03e052269fb111', 'T06608QA947');

/*,(5,5,1,'Slack Primary Token for Deploy 5', 'SS5', 'ST5')*/
/*!40000 ALTER TABLE `deploy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (1,1,'001'),(2,1,'001'),(3,2,'002'),(4,3,'003'),(5,100,'100');
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `section_syllabot`
--

LOCK TABLES `section_syllabot` WRITE;
/*!40000 ALTER TABLE `section_syllabot` DISABLE KEYS */;
INSERT INTO `section_syllabot` VALUES (7,1,1,1),(8,2,1,1),(9,3,2,1),(10,4,2,1),(11,5,100,5);
/*!40000 ALTER TABLE `section_syllabot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'Partin,Brandon','P_Partin,Brandon','blpartin',1),(2,1,'Riggs,Collin','P_Riggs,Collin','cmriggs', 1),(3,1,'Wang,Kai-En','P_Wang,Kai-En','kwang23',1),(4,1,'Hall,Jackson','P_Hall,Jackson','jdhall9', 1),(5,1,'Buchanan,Daniel','P_Buchanan,Daniel','dsbuchan', 1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roster`
--

LOCK TABLES `roster` WRITE;
/*!40000 ALTER TABLE `roster` DISABLE KEYS */;
INSERT INTO `roster` VALUES (1,1,1,2,1),(2,2,2,2,1),(3,3,3,3,2),(4,4,100,4,3),(5,5,100,5,4),(6,5,1,2,2),(7,4,3,2,4),(8,3,2,2,3),(9,2,100,2,5);
/*!40000 ALTER TABLE `roster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'Who am I?','You are Brandon Partin'),(2,'What are you?','A very intelligent robot'),(3,'Where am I?','NCSU'),(4,'When is lunch?','Typically around Noon'),(5,'Why do we exist?','IDK bro...');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `conversation`
--

LOCK TABLES `conversation` WRITE;
/*!40000 ALTER TABLE `conversation` DISABLE KEYS */;
INSERT INTO `conversation` VALUES (7,2,3,1,1),(8,2,2,1,1),(9,3,1,1,1),(10,4,4,1,1),(11,5,5,1,1);
/*!40000 ALTER TABLE `conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (1,'Link to File 1 Location', 'file_name_1','Parsed_link_here'),(2,'Link to File 2 Location', 'file_name_2','Parsed_link2_here');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `website`
--

LOCK TABLES `website` WRITE;
/*!40000 ALTER TABLE `website` DISABLE KEYS */;
INSERT INTO `website` VALUES (1,'Link to Website 1 Location');
/*!40000 ALTER TABLE `website` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `api`
--

LOCK TABLES `api` WRITE;
/*!40000 ALTER TABLE `api` DISABLE KEYS */;
INSERT INTO `api` VALUES (1,'Link to API 1 Location');
/*!40000 ALTER TABLE `api` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `calendar`
--

LOCK TABLES `calendar` WRITE;
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
INSERT INTO `calendar` VALUES (1,'Link to Calendar 1 Location');
/*!40000 ALTER TABLE `calendar` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `section_resource`
--

LOCK TABLES `section_resource` WRITE;
/*!40000 ALTER TABLE `section_resource` DISABLE KEYS */;
INSERT INTO `section_resource` VALUES (7,1,1,1,NULL,NULL,NULL),(8,2,1,NULL,1,NULL,NULL),(9,3,2,NULL,NULL,1,NULL),(10,100,2,NULL,NULL,NULL,1),(11,100,3,2,NULL,NULL,NULL);
/*!40000 ALTER TABLE `section_resource` ENABLE KEYS */;
UNLOCK TABLES;
