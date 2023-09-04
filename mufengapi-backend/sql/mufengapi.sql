/*
 Navicat Premium Data Transfer

 Source Server         : 服务器Mysql8.0
 Source Server Type    : MySQL
 Source Server Version : 80034
 Source Host           : 118.24.33.53:3306
 Source Schema         : mufengapi

 Target Server Type    : MySQL
 Target Server Version : 80034
 File Encoding         : 65001

 Date: 30/08/2023 22:12:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for interface_info
-- ----------------------------
DROP TABLE IF EXISTS `interface_info`;
CREATE TABLE `interface_info`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `description` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '描述',
  `url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '接口地址',
  `requestHeader` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '请求头',
  `responseHeader` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '响应头',
  `userId` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `status` int(0) NOT NULL DEFAULT 0 COMMENT '接口状态（0 - 关闭， 1 - 开启））',
  `method` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '请求类型',
  `createTime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `updateTime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `isDelete` tinyint(0) NOT NULL DEFAULT 0 COMMENT '是否删除(0-未删, 1-已删)',
  `requestParams` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '请求参数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '接口信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of interface_info
-- ----------------------------
INSERT INTO `interface_info` VALUES (1, 'ICP查询', '查询ICP备案', 'https://springboot-pq2n-67608-4-1320422627.sh.run.tcloudbase.com/api/interface/getQueryICP', '无', '无', '3', 0, 'POST', '2023-08-05 16:24:41', '2023-08-29 13:08:39', 0, '示例：domain=qq.com');
INSERT INTO `interface_info` VALUES (2, '随机壁纸', '随机输出各类壁纸', 'https://springboot-pq2n-67608-4-1320422627.sh.run.tcloudbase.com/api/interface/getRandomImage', '无', '无', '3', 1, 'POST', '2023-08-05 16:25:00', '2023-08-26 09:43:21', 0, '不需要参数');
INSERT INTO `interface_info` VALUES (3, '获取用户', '获取用户名（测试用）', 'https://springboot-pq2n-67608-4-1320422627.sh.run.tcloudbase.com/api/name/user', '无', '无', '3', 1, 'POST', '2023-08-08 20:53:28', '2023-08-26 09:43:26', 0, '不需要参数');
INSERT INTO `interface_info` VALUES (4, '随机一话', '随机输出一句话', 'https://springboot-pq2n-67608-4-1320422627.sh.run.tcloudbase.com/api/interface/getRandomWords', '无', '无', '3', 1, 'POST', '2023-08-13 21:01:01', '2023-08-26 09:43:29', 0, '示例：token=H3HVyW1yhW0cNQRL');
INSERT INTO `interface_info` VALUES (5, '域名查询', '查询域名是否被注册', 'https://springboot-pq2n-67608-4-1320422627.sh.run.tcloudbase.com/api/interface/getQueryDomain', '无', '无', '2', 1, 'POST', '2023-08-14 21:24:20', '2023-08-26 09:43:33', 0, '示例：domain=baidu.com');
INSERT INTO `interface_info` VALUES (6, '历史今天', '历史上的今天都发生了哪些大事', 'https://springboot-pq2n-67608-4-1320422627.sh.run.tcloudbase.com/api/interface/getQueryHistory', '无', '无', '2', 1, 'POST', '2023-08-14 21:25:49', '2023-08-26 09:43:38', 0, '不需要参数');
INSERT INTO `interface_info` VALUES (7, '随机头像', '输出米游社随机一张头像', 'https://springboot-pq2n-67608-4-1320422627.sh.run.tcloudbase.com/api/interface/getRandomAvatar', '无', '无', '2', 1, 'POST', '2023-08-14 21:48:48', '2023-08-26 09:43:43', 0, '不需要参数');
INSERT INTO `interface_info` VALUES (8, '随机表情', '随机一张小黑子图', 'https://springboot-pq2n-67608-4-1320422627.sh.run.tcloudbase.com/api/interface/getRandomCXK', '无', '无', '2', 1, 'POST', '2023-08-14 21:48:53', '2023-08-26 09:43:46', 0, '示例：keyword=蔡徐坤');
INSERT INTO `interface_info` VALUES (9, '垃圾分类', '查询垃圾分类信息', 'https://springboot-pq2n-67608-4-1320422627.sh.run.tcloudbase.com/api/interface/getQueryRC', '无', '无', '2', 1, 'POST', '2023-08-14 21:48:56', '2023-08-26 09:43:51', 0, '示例：name=香蕉');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `userAccount` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号',
  `userAvatar` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户头像',
  `gender` tinyint(0) NULL DEFAULT NULL COMMENT '性别',
  `userRole` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'user' COMMENT '用户角色：user / admin',
  `userPassword` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `createTime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `updateTime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `isDelete` tinyint(0) NOT NULL DEFAULT 0 COMMENT '是否删除',
  `accessKey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `secretKey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uni_userAccount`(`userAccount`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, NULL, 'asdf', NULL, NULL, 'user', '587ba0db3ca407cb6c3b19dc8f2e5538', '2023-08-14 15:31:16', '2023-08-14 15:31:42', 0, '3e89f01316802a115b76158d03232619', '617c1e4b6482a452d23ef223045ec429', NULL);
INSERT INTO `user` VALUES (2, NULL, 'qwer', NULL, NULL, 'admin', '8daed50db25b9cafec59fa79353db71b', '2023-08-12 21:30:15', '2023-08-16 20:20:42', 0, '90ee1b421f93fd2368f3193280a15dce', '570809224c1463fc4d761644bead0ebc', NULL);
INSERT INTO `user` VALUES (3, NULL, 'sdfg', NULL, NULL, 'user', '587ba0db3ca407cb6c3b19dc8f2e5538', '2023-08-14 15:29:40', '2023-08-14 15:31:42', 0, '44995fbffafc04ab3fccfae85a88099c', 'da81c5053598a57ca0fda3ed5ace3bfc', NULL);
INSERT INTO `user` VALUES (8, NULL, 'mufeng', NULL, NULL, 'user', 'b66328f5fb294b3879f63a4e8711f7de', '2023-08-14 16:20:58', '2023-08-14 16:20:58', 0, 'ea8c80e3d29bbdae79db3e6887184865', 'f1a585d33bb2171d2ef7c696808fdec6', NULL);
INSERT INTO `user` VALUES (9, NULL, 'zxcv', NULL, NULL, 'user', '8daed50db25b9cafec59fa79353db71b', '2023-08-15 23:23:08', '2023-08-15 23:23:08', 0, '8c833f1668fe1154e88355160673c0a7', '4deeb4096abf3c77e7c494e340e76090', NULL);
INSERT INTO `user` VALUES (12, NULL, 'champioan', NULL, NULL, 'user', '8daed50db25b9cafec59fa79353db71b', '2023-08-24 09:23:43', '2023-08-24 09:23:43', 0, 'f4f55ee89180b25c213277d77a18dcb6', 'f5dd8978580eca625ce01318562338f3', NULL);
INSERT INTO `user` VALUES (13, NULL, '19572216227@163.com', NULL, NULL, 'user', '8daed50db25b9cafec59fa79353db71b', '2023-08-26 09:45:08', '2023-08-26 09:45:08', 0, 'b58989a16d09e86cc55c983a00d36ab7', '0d038e1a58adf8f38d1fe845e3a8d71e', '19572216227@163.com');
INSERT INTO `user` VALUES (14, NULL, 'asong', NULL, NULL, 'user', '8daed50db25b9cafec59fa79353db71b', '2023-08-26 10:15:26', '2023-08-26 10:15:26', 0, 'eb4153509a062a28e1debded2163a591', '91817df602d0b480b639f032c6683457', NULL);
INSERT INTO `user` VALUES (15, NULL, '1111', NULL, NULL, 'user', 'b5ef0aa0e6a952dd3cec094d4ebff625', '2023-08-26 10:16:59', '2023-08-26 10:16:59', 0, '113c3da28ef7e07cf2deb483ae1976da', 'fdfc2408bf674508238ca66ab4f4f9a5', NULL);
INSERT INTO `user` VALUES (16, NULL, '1773183937@qq.com', NULL, NULL, 'user', '8daed50db25b9cafec59fa79353db71b', '2023-08-26 10:17:55', '2023-08-26 10:17:55', 0, '9a8bf60bedbac2f0afdafcd02bef44dd', '8704c7c3facbdb7922f5f98f51d1fdea', '1773183937@qq.com');
INSERT INTO `user` VALUES (17, NULL, '1...', NULL, NULL, 'user', '5060a0d3885d090c0856751897e7c867', '2023-08-26 10:21:11', '2023-08-26 10:21:11', 0, 'af8c90da6388f269ec2235dcd909ab96', '6ce1f5ab0fbabda67736b813391a2fd4', NULL);
INSERT INTO `user` VALUES (18, NULL, 'wwwf', NULL, NULL, 'user', 'f7c9ee38f18451baf256117a50718e47', '2023-08-26 10:27:51', '2023-08-26 10:27:51', 0, 'a6519badc2f0046619715410d5015732', 'c70e500333bac2c52375f12f520bd31b', NULL);
INSERT INTO `user` VALUES (19, NULL, 'Wangyaping', NULL, NULL, 'user', '8daed50db25b9cafec59fa79353db71b', '2023-08-26 10:31:11', '2023-08-26 10:31:11', 0, 'a66c5232b2d68276efbb8b2a94016804', '525e429ec741d0166bc8f95d1d76307f', NULL);
INSERT INTO `user` VALUES (20, NULL, 'zzzz', NULL, NULL, 'user', '65e049a65d180735de188afbf33c7eb0', '2023-08-26 10:35:09', '2023-08-26 10:35:09', 0, '229f0b4d3534f2953c167ae8385faab8', '209ff2913ab90a8140d918f0373ff849', NULL);
INSERT INTO `user` VALUES (21, NULL, '11112', NULL, NULL, 'user', '5bcaf90a33095eb211770eee3c2269d6', '2023-08-26 10:40:06', '2023-08-26 10:40:06', 0, '1186899375506c455dfc82f030898196', '76f8fc05d72a03f9dd2dc9e8cfbd6516', NULL);
INSERT INTO `user` VALUES (22, NULL, '1234', NULL, NULL, 'user', '8daed50db25b9cafec59fa79353db71b', '2023-08-26 12:14:08', '2023-08-26 12:14:08', 0, '922b440449dfc01527d1de1323743913', 'ad431f6fbbb22a5e292eb0fbc02e96e2', NULL);

-- ----------------------------
-- Table structure for user_interface_info
-- ----------------------------
DROP TABLE IF EXISTS `user_interface_info`;
CREATE TABLE `user_interface_info`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` bigint(0) NOT NULL COMMENT '用户id',
  `interfaceInfoId` bigint(0) NOT NULL COMMENT '接口id',
  `status` tinyint(0) NOT NULL DEFAULT 0 COMMENT '0-正常 1-禁用',
  `totalNum` int(0) NOT NULL DEFAULT 0 COMMENT '总调用次数',
  `leftNum` int(0) NOT NULL DEFAULT 0 COMMENT '剩余调用次数',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `is_deleted` tinyint(0) NOT NULL DEFAULT 0 COMMENT '是否删除(0-未删, 1-已删)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户调用接口信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_interface_info
-- ----------------------------
INSERT INTO `user_interface_info` VALUES (1, 1, 1, 0, 9, 3, '2023-08-09 11:18:53', '2023-08-14 15:39:40', 0);
INSERT INTO `user_interface_info` VALUES (2, 1, 2, 0, 12, 12, '2023-08-11 17:55:12', '2023-08-17 15:18:24', 0);
INSERT INTO `user_interface_info` VALUES (3, 2, 1, 0, 40, 37, '2023-08-11 17:55:42', '2023-08-17 15:18:24', 0);
INSERT INTO `user_interface_info` VALUES (4, 2, 2, 0, 66, 11, '2023-08-11 17:55:42', '2023-08-29 13:26:20', 0);
INSERT INTO `user_interface_info` VALUES (5, 3, 1, 0, 76, 0, '2023-08-13 17:34:55', '2023-08-17 15:18:24', 0);
INSERT INTO `user_interface_info` VALUES (6, 3, 2, 0, 570, 6774, '2023-08-13 21:01:31', '2023-08-17 15:18:24', 0);
INSERT INTO `user_interface_info` VALUES (7, 3, 3, 0, 100, 100, '2023-08-17 15:14:27', '2023-08-25 15:41:49', 0);
INSERT INTO `user_interface_info` VALUES (8, 2, 7, 0, 0, 100, '2023-08-17 16:11:08', '2023-08-17 16:11:08', 0);
INSERT INTO `user_interface_info` VALUES (9, 2, 8, 0, 0, 100, '2023-08-17 16:17:30', '2023-08-17 16:17:30', 0);
INSERT INTO `user_interface_info` VALUES (10, 2, 9, 0, 1, 99, '2023-08-17 17:00:53', '2023-08-17 17:00:54', 0);
INSERT INTO `user_interface_info` VALUES (11, 2, 3, 0, 0, 0, '2023-08-17 17:15:07', '2023-08-17 17:15:20', 0);
INSERT INTO `user_interface_info` VALUES (12, 2, 4, 0, 4, 96, '2023-08-17 17:33:35', '2023-08-26 09:43:59', 0);
INSERT INTO `user_interface_info` VALUES (13, 2, 5, 0, 0, 100, '2023-08-18 08:56:30', '2023-08-18 08:56:30', 0);
INSERT INTO `user_interface_info` VALUES (14, 11, 1, 0, 0, 100, '2023-08-22 13:29:44', '2023-08-22 13:29:44', 0);
INSERT INTO `user_interface_info` VALUES (15, 11, 3, 0, 0, 100, '2023-08-22 13:29:53', '2023-08-22 13:29:53', 0);
INSERT INTO `user_interface_info` VALUES (16, 2, 6, 0, 0, 100, '2023-08-25 14:16:53', '2023-08-25 14:16:53', 0);
INSERT INTO `user_interface_info` VALUES (17, 13, 6, 0, 1, 99, '2023-08-26 09:45:20', '2023-08-26 09:45:22', 0);
INSERT INTO `user_interface_info` VALUES (18, 13, 2, 0, 2, 98, '2023-08-26 09:45:38', '2023-08-26 09:45:49', 0);
INSERT INTO `user_interface_info` VALUES (19, 15, 4, 0, 1, 99, '2023-08-26 10:17:29', '2023-08-26 10:17:41', 0);
INSERT INTO `user_interface_info` VALUES (20, 15, 6, 0, 1, 99, '2023-08-26 10:18:02', '2023-08-26 10:18:05', 0);
INSERT INTO `user_interface_info` VALUES (21, 16, 4, 0, 3, 97, '2023-08-26 10:18:09', '2023-08-26 10:18:27', 0);
INSERT INTO `user_interface_info` VALUES (22, 14, 2, 0, 1, 99, '2023-08-26 10:20:51', '2023-08-26 10:20:51', 0);
INSERT INTO `user_interface_info` VALUES (23, 14, 1, 0, 0, 100, '2023-08-26 10:20:51', '2023-08-26 10:20:51', 0);
INSERT INTO `user_interface_info` VALUES (24, 14, 1, 0, 0, 100, '2023-08-26 10:20:51', '2023-08-26 10:20:51', 0);
INSERT INTO `user_interface_info` VALUES (25, 17, 2, 0, 1, 99, '2023-08-26 10:21:43', '2023-08-26 10:22:04', 0);
INSERT INTO `user_interface_info` VALUES (26, 14, 7, 0, 1, 99, '2023-08-26 10:22:23', '2023-08-26 10:22:28', 0);
INSERT INTO `user_interface_info` VALUES (27, 17, 4, 0, 1, 99, '2023-08-26 10:22:26', '2023-08-26 10:22:28', 0);
INSERT INTO `user_interface_info` VALUES (28, 18, 9, 0, 1, 99, '2023-08-26 10:28:43', '2023-08-26 10:29:00', 0);
INSERT INTO `user_interface_info` VALUES (29, 17, 6, 0, 1, 99, '2023-08-26 10:38:18', '2023-08-26 10:38:20', 0);
INSERT INTO `user_interface_info` VALUES (30, 21, 6, 0, 1, 99, '2023-08-26 10:44:35', '2023-08-26 10:44:39', 0);
INSERT INTO `user_interface_info` VALUES (31, 21, 2, 0, 1, 99, '2023-08-26 10:46:22', '2023-08-26 10:46:25', 0);
INSERT INTO `user_interface_info` VALUES (32, 15, 1, 0, 0, 100, '2023-08-26 10:48:35', '2023-08-26 10:48:35', 0);
INSERT INTO `user_interface_info` VALUES (33, 15, 2, 0, 1, 99, '2023-08-26 10:48:42', '2023-08-26 10:48:48', 0);
INSERT INTO `user_interface_info` VALUES (34, 15, 7, 0, 1, 99, '2023-08-26 10:49:20', '2023-08-26 10:49:22', 0);
INSERT INTO `user_interface_info` VALUES (35, 22, 9, 0, 0, 100, '2023-08-26 12:14:39', '2023-08-26 12:14:39', 0);
INSERT INTO `user_interface_info` VALUES (36, 22, 8, 0, 1, 99, '2023-08-26 12:15:58', '2023-08-26 12:16:00', 0);

SET FOREIGN_KEY_CHECKS = 1;
