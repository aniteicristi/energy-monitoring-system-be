-- MariaDB dump 10.19  Distrib 10.9.3-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: sd
-- ------------------------------------------------------
-- Server version	10.9.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `maximumHourlyConsumption` int(11) NOT NULL DEFAULT 0,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `device_user_null_fk` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES
(1,'A cool device','0x34rj3d231nj2s',20,NULL),
(3,'A not so cool device','0x34ik2j1bh3i12',106,10),
(4,'Device without a user','0x34342134',0,10),
(5,'A brand new device','0x3f3f3f3f',0,3);
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `energy_consumption`
--

DROP TABLE IF EXISTS `energy_consumption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `energy_consumption` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL,
  `value` int(11) NOT NULL,
  `deviceId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `energy_consumption_device_null_fk` (`deviceId`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `energy_consumption`
--

LOCK TABLES `energy_consumption` WRITE;
/*!40000 ALTER TABLE `energy_consumption` DISABLE KEYS */;
INSERT INTO `energy_consumption` VALUES
(1,'2022-11-07 19:48:08',93,1),
(2,'2022-11-07 20:48:08',2,1),
(3,'2022-11-07 21:48:08',56,1),
(4,'2022-11-07 22:48:08',56,1),
(5,'2022-11-07 23:48:08',91,1),
(6,'2022-11-08 00:48:08',21,1),
(7,'2022-11-08 01:48:08',84,1),
(8,'2022-11-08 02:48:08',27,1),
(9,'2022-11-08 03:48:08',3,1),
(10,'2022-11-08 04:48:08',58,1),
(11,'2022-11-08 05:48:08',85,1),
(12,'2022-11-08 06:48:08',93,1),
(13,'2022-11-08 07:48:08',67,1),
(14,'2022-11-08 08:48:08',68,1),
(15,'2022-11-08 09:48:08',12,1),
(16,'2022-11-08 10:48:08',5,1),
(17,'2022-11-08 11:48:08',99,1),
(18,'2022-11-08 12:48:08',74,1),
(19,'2022-11-08 13:48:08',53,1),
(20,'2022-11-08 14:48:08',45,1),
(21,'2022-11-08 15:48:08',36,1),
(22,'2022-11-08 16:48:08',46,1),
(23,'2022-11-08 17:48:08',4,1),
(24,'2022-11-08 18:48:08',4,1),
(25,'2022-11-08 19:48:08',83,1),
(26,'2022-11-08 20:48:08',81,1),
(27,'2022-11-08 21:48:08',16,1),
(28,'2022-11-08 22:48:08',23,1),
(29,'2022-11-08 23:48:08',63,1),
(30,'2022-11-09 00:48:08',86,1),
(31,'2022-11-09 01:48:08',59,1),
(32,'2022-11-09 02:48:08',47,1),
(33,'2022-11-09 03:48:08',40,1),
(34,'2022-11-09 04:48:08',18,1),
(35,'2022-11-09 05:48:08',41,1),
(36,'2022-11-09 06:48:08',70,1),
(37,'2022-11-09 07:48:08',58,1),
(38,'2022-11-09 08:48:08',71,1),
(39,'2022-11-09 09:48:08',0,1),
(40,'2022-11-09 10:48:08',43,1),
(41,'2022-11-09 11:48:08',41,1),
(42,'2022-11-09 12:48:08',24,1),
(43,'2022-11-09 13:48:08',71,1),
(44,'2022-11-09 14:48:08',36,1),
(45,'2022-11-09 15:48:08',26,1),
(46,'2022-11-09 16:48:08',58,1),
(47,'2022-11-09 17:48:08',36,1),
(48,'2022-11-09 18:48:08',63,1),
(49,'2022-11-07 21:04:11',67,3),
(50,'2022-11-07 22:04:11',34,3),
(51,'2022-11-07 23:04:11',61,3),
(52,'2022-11-08 00:04:11',8,3),
(53,'2022-11-08 01:04:11',86,3),
(54,'2022-11-08 02:04:11',66,3),
(55,'2022-11-08 03:04:11',83,3),
(56,'2022-11-08 04:04:11',2,3),
(57,'2022-11-08 05:04:11',26,3),
(58,'2022-11-08 06:04:11',86,3),
(59,'2022-11-08 07:04:11',28,3),
(60,'2022-11-08 08:04:11',46,3),
(61,'2022-11-08 09:04:11',30,3),
(62,'2022-11-08 10:04:11',20,3),
(63,'2022-11-08 11:04:11',17,3),
(64,'2022-11-08 12:04:11',51,3),
(65,'2022-11-08 13:04:11',29,3),
(66,'2022-11-08 14:04:11',35,3),
(67,'2022-11-08 15:04:11',47,3),
(68,'2022-11-08 16:04:11',11,3),
(69,'2022-11-08 17:04:11',28,3),
(70,'2022-11-08 18:04:11',74,3),
(71,'2022-11-08 19:04:11',43,3),
(72,'2022-11-08 20:04:11',22,3),
(73,'2022-11-08 21:04:11',9,3),
(74,'2022-11-08 22:04:11',52,3),
(75,'2022-11-08 23:04:11',72,3),
(76,'2022-11-09 00:04:11',54,3),
(77,'2022-11-09 01:04:11',97,3),
(78,'2022-11-09 02:04:11',38,3),
(79,'2022-11-09 03:04:11',65,3),
(80,'2022-11-09 04:04:11',78,3),
(81,'2022-11-09 05:04:11',57,3),
(82,'2022-11-09 06:04:11',7,3),
(83,'2022-11-09 07:04:11',8,3),
(84,'2022-11-09 08:04:11',73,3),
(85,'2022-11-09 09:04:11',7,3),
(86,'2022-11-09 10:04:11',99,3),
(87,'2022-11-09 11:04:11',21,3),
(88,'2022-11-09 12:04:11',77,3),
(89,'2022-11-09 13:04:11',48,3),
(90,'2022-11-09 14:04:11',34,3),
(91,'2022-11-09 15:04:11',3,3),
(92,'2022-11-09 16:04:11',56,3),
(93,'2022-11-09 17:04:11',7,3),
(94,'2022-11-09 18:04:11',92,3),
(95,'2022-11-09 19:04:11',85,3),
(96,'2022-11-09 20:04:11',21,3);
/*!40000 ALTER TABLE `energy_consumption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordHash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(3,'user4@gmail.com','$2b$10$5ZhREmeWgjs1tnD7Z143JuT65WinYVTxBuLOX7vm7mtR2qtkIgLhO','user'),
(7,'user3@gmail.com','$2b$10$JKAng9PmGdz4ZrLxCoe3beeubfw/17AE.oUXw0HCdRZgsUqj56mse','user'),
(8,'admin@gmail.com','$2b$10$MKAwvekM.FObEKa2O773YOdYFn4seq4EaR1BS1ieNsX99LpSYw5sC','admin'),
(10,'user1@gmail.com','$2b$10$WWpEopxauwcDPLqvfhNmW.kUvazld763hFSAMWBWTYLLQFHmmJsmi','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-09  1:16:39
