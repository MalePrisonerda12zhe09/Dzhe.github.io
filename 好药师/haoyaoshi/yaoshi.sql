/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : yaoshi

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2019-10-12 19:52:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for haoyao
-- ----------------------------
DROP TABLE IF EXISTS `haoyao`;
CREATE TABLE `haoyao` (
  `sid` int(11) unsigned NOT NULL,
  `price` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `specifications` varchar(255) DEFAULT NULL,
  `oprice` varchar(10) DEFAULT NULL,
  `zeze` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haoyao
-- ----------------------------
INSERT INTO `haoyao` VALUES ('1', '460', '金戈枸橼酸西地那非片25mg*21粒+安太医玛咖喷剂10ml...', 'http://image.qumaiyao.com/data/goodscenter/imges/set_meal_copy_80627/ff808081654369210165c620ea7335fc_zfx_mid0.jpg', '50mg*5s*4板*2盒 薄膜衣', '460', 'true');
INSERT INTO `haoyao` VALUES ('2', '48', '金戈 枸橼酸西地那非片 50...', 'http://image.qumaiyao.com/data/goodscenter/imges/BPZ013011CLS1_244169/000000005973034e015985faaa9104f9_zfx_mid5.JPG', '50mg*5s*4板*3盒+12粒 薄膜衣', '48', '0');
INSERT INTO `haoyao` VALUES ('3', '48', '金戈 枸橼酸西地那非片(金戈) 25mg*3s...', 'http://image.qumaiyao.com/data/goodscenter/imges/set_meal_copy_64401/ff8080816828281b01695cb1bac669ea_zfx_mid0.jpg', '25mg*21s*2盒', '48', 'true');
INSERT INTO `haoyao` VALUES ('4', '280', '12粒)金戈 枸橼酸西地那非...', 'http://image.qumaiyao.com/data/goodscenter/imges/set_meal_copy_64946/8a8094216af8f0ff016b2bdeb4381328_zfx_mid0.jpg', '50mg*5粒*4板+1粒*4盒', '280', 'true');
INSERT INTO `haoyao` VALUES ('5', '788', '40粒）金戈 枸橼酸西地那非...', 'http://image.qumaiyao.com/data/goodscenter/imges/set_meal_copy_63239/8a8094216af8f0ff016b402e54fd14fe_zfx_mid0.jpg', '25mg*21s', '788', null);
INSERT INTO `haoyao` VALUES ('6', '1368', '72粒）金戈 枸橼酸西地那非...', 'http://image.qumaiyao.com/data/goodscenter/imges/set_meal_copy_63237/8a8094216cf7514e016d612a43082e08_zfx_mid0.jpg', '50mg*5s*1板 薄膜衣+0.64g*1', '1368', null);
INSERT INTO `haoyao` VALUES ('7', '470', '金戈 枸橼酸西地那非片 2盒装', 'http://image.qumaiyao.com/data/goodscenter/imges/set_meal_copy_75490/ff8080816828281b01695cb90b446a06_zfx_mid0.jpg', '50mg*5s*4板 薄膜衣+0.5g*10', '470', null);
INSERT INTO `haoyao` VALUES ('8', '479', '24粒）金戈 枸橼酸西地那非...', 'http://image.qumaiyao.com/data/goodscenter/imges/set_meal_copy_63240/8a8094216cf7514e016d477aeb9224f6_zfx_mid0.jpg', '50mg*5粒*2盒+2粒薄膜衣+安', '479', null);
INSERT INTO `haoyao` VALUES ('9', '238', '金戈 枸橼酸西地那非片 25...', 'http://image.qumaiyao.com/data/goodscenter/imges/set_meal_copy_64400/ff8080816828281b01695cb1233569e6_zfx_mid0.jpg', '50mg*5s*4板*2盒 薄膜衣', '238', null);
INSERT INTO `haoyao` VALUES ('10', '506', '金戈枸橼酸西地那非片 5粒...', 'http://image.qumaiyao.com/data/goodscenter/imges/set_meal_copy_151445/ff80808169710f4301697656563e03b5_zfx_mid0.jpg', '50mg*5s*4板*3盒+12粒 薄膜衣', '506', '0');
INSERT INTO `haoyao` VALUES ('11', '740', '金戈 枸橼酸西地那非片 20粒+伍舒芳 引阳索胶囊 10盒', 'http://image.qumaiyao.com/data/goodscenter/imges/set_meal_copy_151346/ff80808169710f4301697640ed6a038c_zfx_mid0.jpg', '25mg*21s*2盒', '740', null);
INSERT INTO `haoyao` VALUES ('12', '439', '内服+外用)金戈 枸橼酸西', 'http://image.qumaiyao.com/data/goodscenter/imges/set_meal_copy_75888/ff808081654369210165b2c98ef532d9_zfx_mid0.jpg', '50mg*5粒*4板+1粒*4盒', '439', null);
INSERT INTO `haoyao` VALUES ('13', '159', '6粒）金戈 枸橼酸西地那非...', 'http://image.qumaiyao.com/data/goodscenter/imges/set_meal_copy_64904/8a8094216c1eeba9016ccbaa69675200_zfx_mid0.jpg', '50mg*5粒+1粒', '159', null);
INSERT INTO `haoyao` VALUES ('14', '837', '金戈 枸橼酸西地那非片 3盒装', 'http://image.qumaiyao.com/data/goodscenter/imges/BPZ013046CP1_249755/0000000062b3e3050162f1a9f004292f_zfx_mid0.jpg', '25mg*21s*3盒', '837', null);

-- ----------------------------
-- Table structure for shopcar
-- ----------------------------
DROP TABLE IF EXISTS `shopcar`;
CREATE TABLE `shopcar` (
  `uid` int(11) unsigned NOT NULL,
  `price` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `specifications` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shopcar
-- ----------------------------
INSERT INTO `shopcar` VALUES ('1', '460', '金戈枸橼酸西地那非片25mg*21粒+安太医玛咖喷剂10ml...', 'http://image.qumaiyao.com/data/goodscenter/imges/set_meal_copy_80627/ff808081654369210165c620ea7335fc_zfx_mid0.jpg', '50mg*5s*4板*2盒 薄膜衣');
INSERT INTO `shopcar` VALUES ('2', '48', '金戈 枸橼酸西地那非片 50...', 'http://image.qumaiyao.com/data/goodscenter/imges/BPZ013011CLS1_244169/000000005973034e015985faaa9104f9_zfx_mid5.JPG', '50mg*5s*4板*3盒+12粒 薄膜衣');
INSERT INTO `shopcar` VALUES ('3', '48', '金戈 枸橼酸西地那非片(金戈) 25mg*3s...', 'http://image.qumaiyao.com/data/goodscenter/imges/set_meal_copy_64401/ff8080816828281b01695cb1bac669ea_zfx_mid0.jpg', '25mg*21s*2盒');
SET FOREIGN_KEY_CHECKS=1;
