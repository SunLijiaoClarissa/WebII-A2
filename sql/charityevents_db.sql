/*
Navicat MySQL Data Transfer

Source Server         : myql8.0
Source Server Version : 80033
Source Host           : localhost:3307
Source Database       : charityevents_db

Target Server Type    : MYSQL
Target Server Version : 80033
File Encoding         : 65001

Date: 2025-10-02 21:11:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('1', '教育支持');
INSERT INTO `categories` VALUES ('2', '奖学金项目');
INSERT INTO `categories` VALUES ('3', '学校建设');
INSERT INTO `categories` VALUES ('4', '特殊教育');
INSERT INTO `categories` VALUES ('5', '教师培训');
INSERT INTO `categories` VALUES ('6', '医疗救助');
INSERT INTO `categories` VALUES ('7', '扶贫济困');
INSERT INTO `categories` VALUES ('8', '环境保护');
INSERT INTO `categories` VALUES ('9', '动物保护');
INSERT INTO `categories` VALUES ('10', '灾难救援');

-- ----------------------------
-- Table structure for events
-- ----------------------------
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `date` datetime DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `organizer_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `ticket_price` decimal(10,2) DEFAULT NULL,
  `target` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `organizer_id` (`organizer_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`organizer_id`) REFERENCES `organizations` (`id`),
  CONSTRAINT `events_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of events
-- ----------------------------
INSERT INTO `events` VALUES ('1', '希望小学奖学金发放仪式', '为山区贫困学生颁发年度奖学金，鼓励继续学业', '2024-09-15 10:00:00', '云南省丽江市希望小学', '1', '2', '0.00', '贫困学生、教育工作者', '1');
INSERT INTO `events` VALUES ('2', '乡村教师专业发展培训', '提升乡村教师教学能力的专业培训课程', '2024-10-20 09:00:00', '四川省凉山州教育中心', '5', '5', '0.00', '乡村教师、教育志愿者', '1');
INSERT INTO `events` VALUES ('3', '爱心图书角建设活动', '为偏远小学建立图书角，捐赠儿童读物', '2024-11-05 14:00:00', '贵州省黔东南州多所小学', '2', '1', '0.00', '学龄儿童、图书管理员', '0');
INSERT INTO `events` VALUES ('4', '特殊教育设备捐赠', '向特殊教育学校捐赠康复设备和教学工具', '2024-08-30 15:00:00', '广州市特殊教育学校', '4', '4', '0.00', '特殊需求儿童、特教老师', '1');
INSERT INTO `events` VALUES ('5', '计算机教室建设启动仪式', '为乡村学校配备计算机教室和网络设备', '2024-12-10 10:30:00', '湖南省湘西州中心学校', '3', '3', '0.00', '中小学生、信息技术教师', '0');
INSERT INTO `events` VALUES ('6', '贫困地区医疗义诊', '组织医疗专家为贫困地区居民提供免费诊疗', '2024-09-25 08:00:00', '甘肃省贫困县乡镇卫生院', '6', '6', '0.00', '贫困患者、社区居民', '1');
INSERT INTO `events` VALUES ('7', '冬季温暖包发放活动', '为贫困家庭发放过冬物资和温暖包', '2024-11-20 14:00:00', '内蒙古自治区牧区', '7', '7', '0.00', '贫困家庭、留守儿童', '0');
INSERT INTO `events` VALUES ('8', '城市绿化植树活动', '组织志愿者参与城市绿化建设和树木种植', '2024-10-12 09:00:00', '北京市朝阳公园', '8', '8', '0.00', '环保志愿者、社区居民', '1');
INSERT INTO `events` VALUES ('9', '流浪动物救助领养日', '为流浪动物寻找领养家庭，宣传动物保护', '2024-09-08 10:00:00', '上海市动物保护中心', '9', '9', '0.00', '动物爱好者、潜在领养者', '1');
INSERT INTO `events` VALUES ('10', '洪灾救援物资发放', '为洪水灾区居民发放紧急救援物资', '2024-08-15 08:00:00', '河北省受灾地区', '10', '10', '0.00', '灾区居民、救援人员', '1');

-- ----------------------------
-- Table structure for organizations
-- ----------------------------
DROP TABLE IF EXISTS `organizations`;
CREATE TABLE `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of organizations
-- ----------------------------
INSERT INTO `organizations` VALUES ('1', '希望工程基金会', '致力于改善贫困地区教育条件，资助失学儿童', 'aaa@163.com');
INSERT INTO `organizations` VALUES ('2', '阳光助学计划', '为贫困学生提供奖学金和学业支持', 'bbb@126.com');
INSERT INTO `organizations` VALUES ('3', '乡村教育振兴协会', '专注于改善农村地区教育资源', 'aaa@163.com');
INSERT INTO `organizations` VALUES ('4', '特殊教育关爱中心', '支持特殊需求儿童获得平等教育机会', 'aaa@163.com');
INSERT INTO `organizations` VALUES ('5', '教师发展基金会', '为教师提供专业培训和教学资源', 'bbb@126.com');
INSERT INTO `organizations` VALUES ('6', '爱心医疗救助会', '为贫困患者提供医疗援助', 'bbb@126.com');
INSERT INTO `organizations` VALUES ('7', '扶贫济困基金会', '帮助贫困家庭改善生活条件', 'bbb@126.com');
INSERT INTO `organizations` VALUES ('8', '绿色地球环保组织', '致力于环境保护和可持续发展', '111@qq.com');
INSERT INTO `organizations` VALUES ('9', '动物保护联盟', '保护野生动物和救助流浪动物', '111@outlook.com');
INSERT INTO `organizations` VALUES ('10', '灾难救援应急中心', '为灾区提供紧急救援和重建支持', 'test@outlook.com');
