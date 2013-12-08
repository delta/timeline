-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 08, 2013 at 01:01 PM
-- Server version: 5.5.32
-- PHP Version: 5.4.6-1ubuntu1.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `timeline`
--

-- --------------------------------------------------------

--
-- Table structure for table `content_data`
--

CREATE TABLE IF NOT EXISTS `content_data` (
  `content_id` int(11) NOT NULL AUTO_INCREMENT,
  `content_title` varchar(150) NOT NULL COMMENT 'Allow Max char limit of 150',
  `content_desc` text NOT NULL,
  `content_start` datetime NOT NULL,
  `content_end` datetime NOT NULL,
  `content_revision_history` int(11) NOT NULL DEFAULT '1',
  `content_updated_by` int(11) NOT NULL COMMENT 'user id who updates the content',
  `content_modified_on` datetime NOT NULL,
  `content_created_on` datetime NOT NULL,
  PRIMARY KEY (`content_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `content_data`
--

INSERT INTO `content_data` (`content_id`, `content_title`, `content_desc`, `content_start`, `content_end`, `content_revision_history`, `content_updated_by`, `content_modified_on`, `content_created_on`) VALUES
(1, 'Pragyan', 'Pragyan 2013', '2013-12-05 00:00:00', '2013-12-05 00:00:00', 1, 1604, '2013-12-06 00:00:00', '2013-12-06 00:00:00'),
(2, 'festember', 'festemeber 2013', '2013-12-11 00:00:00', '2013-12-20 00:00:00', 1, 4556, '2013-12-11 00:00:00', '2013-12-12 00:00:00'),
(3, 'sdgsd', 'sdgsdgsdg', '2012-12-03 00:00:00', '2012-12-17 00:00:00', 1, 1254, '2013-12-18 00:00:00', '2013-12-11 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `content_data_bak`
--

CREATE TABLE IF NOT EXISTS `content_data_bak` (
  `content_id` int(11) NOT NULL,
  `content_title` varchar(150) NOT NULL COMMENT 'Allow Max char limit of 150',
  `content_desc` text NOT NULL,
  `content_start_time` datetime NOT NULL,
  `content_end_time` datetime NOT NULL,
  `content_revision_history` int(11) NOT NULL DEFAULT '1',
  `content_updated_by` int(11) NOT NULL COMMENT 'user id who updates the content',
  `content_modified_on` datetime NOT NULL,
  `content_created_on` datetime NOT NULL,
  `content_tag_permission` text NOT NULL COMMENT 'store it as   tag_id1->permission1;tag_id2->permission2;....',
  PRIMARY KEY (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `content_manage_tags`
--

CREATE TABLE IF NOT EXISTS `content_manage_tags` (
  `content_id` int(11) NOT NULL COMMENT 'From Content table',
  `tag_id` int(11) NOT NULL,
  `permission` enum('primary','secondary') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `content_manage_tags`
--

INSERT INTO `content_manage_tags` (`content_id`, `tag_id`, `permission`) VALUES
(1, 1, 'primary'),
(2, 2, 'primary'),
(2, 4, 'secondary'),
(1, 5, 'secondary'),
(3, 1, 'primary'),
(3, 3, 'secondary'),
(1, 3, 'secondary');

-- --------------------------------------------------------

--
-- Table structure for table `timeline_config`
--

CREATE TABLE IF NOT EXISTS `timeline_config` (
  `key` text NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `timeline_config`
--

INSERT INTO `timeline_config` (`key`, `value`) VALUES
('enable_academic_year', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `timeline_groups`
--

CREATE TABLE IF NOT EXISTS `timeline_groups` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identification number of the group',
  `group_name` varchar(100) NOT NULL COMMENT 'Group name',
  `group_description` varchar(200) NOT NULL COMMENT 'Group description',
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `groupName` (`group_name`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `timeline_groups`
--

INSERT INTO `timeline_groups` (`group_id`, `group_name`, `group_description`) VALUES
(0, 'admin', 'The Administrators');

-- --------------------------------------------------------

--
-- Table structure for table `timeline_log`
--

CREATE TABLE IF NOT EXISTS `timeline_log` (
  `log_no` int(11) NOT NULL,
  `log_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `page_path` varchar(500) NOT NULL,
  `perm_action` varchar(100) NOT NULL,
  `tag_accessed` text NOT NULL COMMENT 'Comma seperate Tag(s) Accessed',
  `user_accessipaddress` varchar(100) NOT NULL,
  UNIQUE KEY `log_no` (`log_no`),
  KEY `date` (`log_datetime`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `timeline_openid_users`
--

CREATE TABLE IF NOT EXISTS `timeline_openid_users` (
  `openid_id` int(11) NOT NULL AUTO_INCREMENT,
  `openid_url` varchar(2063) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`openid_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `timeline_tags`
--

CREATE TABLE IF NOT EXISTS `timeline_tags` (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique Tag Id Auto Incremented',
  `tag_name` text NOT NULL COMMENT 'Unique Tag Name',
  `tag_description` text NOT NULL COMMENT 'Description to explain about each tags',
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `timeline_tags`
--

INSERT INTO `timeline_tags` (`tag_id`, `tag_name`, `tag_description`) VALUES
(1, 'pragyan', 'for pragyan'),
(2, 'festember', 'festember tag desription'),
(3, 'ppl', 'ppl in pragyan'),
(4, 'surajjagan', 'department cse'),
(5, 'quizes', 'nittfest tags name description');

-- --------------------------------------------------------

--
-- Table structure for table `timeline_tag_uploads`
--

CREATE TABLE IF NOT EXISTS `timeline_tag_uploads` (
  `upload_fileid` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `timeline_tag_users`
--

CREATE TABLE IF NOT EXISTS `timeline_tag_users` (
  `tag_user_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission` enum('primary','secondary') NOT NULL,
  PRIMARY KEY (`tag_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `timeline_uploads`
--

CREATE TABLE IF NOT EXISTS `timeline_uploads` (
  `upload_fileid` int(11) NOT NULL,
  `upload_filename` varchar(200) NOT NULL,
  `upload_filetype` varchar(300) NOT NULL,
  `upload_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` varchar(100) NOT NULL COMMENT 'The user who uploaded the file',
  PRIMARY KEY (`upload_fileid`),
  UNIQUE KEY `page_modulecomponentid` (`upload_filename`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `timeline_usergroup`
--

CREATE TABLE IF NOT EXISTS `timeline_usergroup` (
  `user_id` int(11) NOT NULL COMMENT 'user id ...comes from the user''s table',
  `group_id` int(11) NOT NULL COMMENT 'group id ...comes from the group''s table',
  KEY `user_id` (`user_id`,`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `timeline_usergroup`
--

INSERT INTO `timeline_usergroup` (`user_id`, `group_id`) VALUES
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `timeline_users`
--

CREATE TABLE IF NOT EXISTS `timeline_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'user identification number',
  `user_name` varchar(100) NOT NULL COMMENT 'User''s good name',
  `user_email` varchar(100) NOT NULL,
  `user_fullname` varchar(100) NOT NULL COMMENT 'User''s full name',
  `user_password` varchar(32) NOT NULL COMMENT 'md5 hashed',
  `user_regdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_lastlogin` datetime NOT NULL,
  `user_activated` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Used for email verification',
  `user_loginmethod` enum('openid','db','ldap','imap','ads') NOT NULL DEFAULT 'db' COMMENT 'Login Method',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `timeline_users`
--

INSERT INTO `timeline_users` (`user_id`, `user_name`, `user_email`, `user_fullname`, `user_password`, `user_regdate`, `user_lastlogin`, `user_activated`, `user_loginmethod`) VALUES
(1, 'admin', 'admin@localhost.com', 'shriram', 'd69403e2673e611d4cbd3fad6fd1788e', '2012-06-25 15:31:17', '2012-06-25 23:05:32', 1, 'db');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
