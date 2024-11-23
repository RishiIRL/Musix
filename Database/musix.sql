-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2024 at 11:07 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `musix`
--
CREATE DATABASE IF NOT EXISTS `musix` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `musix`;

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `album_id` int(20) NOT NULL,
  `album_name` varchar(25) NOT NULL,
  `artist_id` int(20) NOT NULL,
  `album_img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`album_id`, `album_name`, `artist_id`, `album_img`) VALUES
(1, 'Mind of Mine', 6, '/SongImg/pillowtalk.png'),
(2, 'Native', 4, '/SongImg/CountingStars.png'),
(3, 'Artificial Paradise', 4, '/SongImg/artificialp.png'),
(4, 'Divide', 10, '/SongImg/shapeofyou.png'),
(5, 'Evolve', 7, '/SongImg/evolve.png'),
(6, 'This is Acting', 1, '/SongImg/CheapThrills.png'),
(7, 'FOUR', 5, '/SongImg/nightchanges.png'),
(8, 'Up All Night', 5, '/SongImg/whatmakesyoubeautiful.png'),
(9, 'JUSTICE', 13, '/SongImg/justice.png'),
(10, 'Sick Boy', 2, '/SongImg/sickboy.png'),
(11, 'Illuminate', 14, 'SongImg/illuminate.png');

-- --------------------------------------------------------

--
-- Table structure for table `artist`
--

CREATE TABLE `artist` (
  `artist_id` int(200) NOT NULL,
  `artist_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artist`
--

INSERT INTO `artist` (`artist_id`, `artist_name`) VALUES
(1, 'Sia'),
(2, 'Chainsmokers'),
(3, 'Neffex'),
(4, 'OneRepublic\r\n'),
(5, 'One Direction'),
(6, 'Zayn'),
(7, 'Imagine Dragons'),
(8, 'Highcloud'),
(9, 'Hugel'),
(10, 'Ed Sheeran'),
(11, 'Witt Lowry'),
(12, 'Jon Bellion'),
(13, 'Justin Bieber'),
(14, 'Shawn Mendes');

-- --------------------------------------------------------

--
-- Table structure for table `liked_songs`
--

CREATE TABLE `liked_songs` (
  `user_id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `liked_songs`
--

INSERT INTO `liked_songs` (`user_id`, `song_id`) VALUES
(1, 19),
(1, 35),
(1, 26),
(1, 37),
(1, 2),
(1, 40),
(1, 45),
(1, 52),
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `playlist_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `playlist_name` varchar(60) NOT NULL,
  `playlist_cover` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`playlist_id`, `user_id`, `playlist_name`, `playlist_cover`) VALUES
(1, 1, 'Edokati', '/SongImg/shapeofyou.png'),
(2, 1, 'oy\'', '/default_cover.png');

-- --------------------------------------------------------

--
-- Table structure for table `playlist_songs`
--

CREATE TABLE `playlist_songs` (
  `playlist_id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlist_songs`
--

INSERT INTO `playlist_songs` (`playlist_id`, `song_id`) VALUES
(1, 16),
(1, 19),
(1, 26),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `song`
--

CREATE TABLE `song` (
  `song_id` int(200) NOT NULL,
  `song_name` varchar(40) DEFAULT NULL,
  `genre` varchar(20) NOT NULL,
  `duration` int(255) UNSIGNED NOT NULL,
  `song_path` varchar(300) NOT NULL,
  `image_path` varchar(300) NOT NULL,
  `artist_id` int(200) NOT NULL,
  `album_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `song`
--

INSERT INTO `song` (`song_id`, `song_name`, `genre`, `duration`, `song_path`, `image_path`, `artist_id`, `album_id`) VALUES
(1, 'Cheap Thrills', 'Rock', 210, 'Songs\\CheapThrills.m4a', 'SongImg/CheapThrills.png', 1, 6),
(2, 'Closer', 'Classic', 245, 'Songs\\Closer.m4a', 'SongImg\\Closer.png', 2, NULL),
(3, 'Cold', 'HipHop', 186, 'Songs\\Cold.m4a', 'SongImg\\Cold.png', 3, NULL),
(4, 'Counting Stars', 'Western', 257, 'Songs\\CountingStars.m4a', 'SongImg\\CountingStars.png', 4, 2),
(5, 'Drag Me Down', 'Country', 192, 'Songs\\DragMeDown.m4a', 'SongImg\\DragMeDown.png', 5, NULL),
(6, 'Dusk Till Dawn', 'Rock', 239, 'Songs\\DuskTillDawn.m4a', 'SongImg\\DuskTillDawn.png', 6, NULL),
(7, 'Enemy', 'HipHop', 173, '/Songs/Enemy.m4a', '/SongImg/Enemy.png', 7, NULL),
(8, 'Heat Waves', 'Classic', 152, '/Songs/HeatWaves.m4a', '/SongImg/HeatWaves.png', 8, NULL),
(9, 'I Adore You', 'Western', 214, '/Songs/iadoreyou.m4a', '/SongImg/iadoreyou.png', 9, NULL),
(10, 'I Don\'t Wanna Wait', 'Country', 209, '/Songs/idontwannawait.m4a', '/SongImg/idontwannawait.png', 4, NULL),
(11, 'Into Your Arms', 'Classic', 186, '/Songs/intoyourarms.m4a', '/SongImg/intoyourarms.png', 11, NULL),
(12, 'Kid Again', 'Western', 199, '/Songs/kisagain.m4a', '/SongImg/kidagain.png', 12, NULL),
(13, 'Let Me Love You', 'Country', 204, '/Songs/letmeloveyou.m4a', '/SongImg/letmeloveyou.png', 13, NULL),
(14, 'Night Changes', 'HipHop', 226, '/Songs/nightchanges.m4a', '/SongImg/nightchanges.png', 5, 7),
(15, 'Pillow Talk', 'Western', 203, '/Songs/pillowtalk.m4a', '/SongImg/pillowtalk.png', 6, 1),
(16, 'Shape Of You', 'Rock', 233, '/Songs/shapeofyou.m4a', '/SongImg/shapeofyou.png', 10, 4),
(17, 'Stay', 'HipHop', 141, '/Songs/stay.m4a', '/SongImg/stay.png', 13, NULL),
(18, 'There\'s Nothing Holdin\' Me Back', 'Classic', 199, '/Songs/theresnothinhold.m4a', '/SongImg/theresnothinhold.png', 14, 11),
(19, 'Treat You Better', 'Rock', 187, '/Songs/treatyoubetter.m4a', '/SongImg/treatyoubetter.png', 14, 11),
(20, 'What Makes You Beautiful', 'Rock', 200, '/Songs/whatmakesyoubeautiful.m4a', '/SongImg/whatmakesyoubeautiful.png', 5, 8),
(21, '18', 'Rock', 248, '/Songs/18.m4a', '/SongImg/nightchanges.png', 5, 7),
(22, 'Anyone', 'Western', 190, 'Songs/anyone.m4a', 'SongImg/justice.png', 13, 9),
(23, 'Beach House', 'HipHop', 206, 'Songs/beachhouse.m4a', 'SongImg/sickboy.png', 2, 10),
(24, 'Believer', 'Country', 204, 'Songs/believer.m4a', 'SongImg/evolve.png', 7, 5),
(25, 'Die For You', 'Classic', 198, '/Songs/dieforyou.m4a', 'SongImg/justice.png', 13, 9),
(26, 'Like I Would', 'Country', 192, 'Songs/likeiwould.m4a', 'SongImg/pillowtalk.png', 6, 1),
(27, 'I Lived', 'HipHop', 234, 'Songs/ilived.m4a', 'SongImg/CountingStars.png', 4, 2),
(28, 'Moments', 'Classic', 262, 'Songs/moments.m4a', 'SongImg/whatmakesyoubeautiful.png', 5, 8),
(29, 'Perfect', 'Rock', 263, 'Songs/perfect.m4a', 'SongImg/shapeofyou.png', 10, 4),
(30, 'If I Lose Myself', 'Country', 213, 'Songs/ifilosemyself.m4a', 'SongImg/CountingStars.png', 4, 2),
(31, 'Hurt', 'Rock', 194, 'Songs/hurt.m4a', 'SongImg/artificialp.png', 4, 3),
(32, 'Side Effects', 'Western', 172, 'Songs/sideeffects.m4a', 'SongImg/sickboy.png', 2, 10),
(33, 'This Feeling', 'Country', 197, 'Songs/thisfeeling.m4a', 'SongImg/sickboy.png', 2, 10),
(34, 'Eraser', 'HipHop', 227, 'Songs/eraser.m4a', 'SongImg/shapeofyou.png', 10, 4),
(35, 'Feel Again', 'Country', 185, 'Songs/feelagain.m4a', 'SongImg/CountingStars.png', 4, 2),
(36, 'Galway Girl', 'HipHop', 170, 'Songs/galwaygirl.m4a', 'SongImg/shapeofyou.png', 10, 4),
(37, 'House On Fire', 'Rock', 241, 'Songs/houseonfire.m4a', 'SongImg/CheapThrills.png', 1, 6),
(38, 'I Ain\'t Worried', 'Classic', 148, 'Songs/iaintworried.m4a', 'SongImg/artificialp.png', 4, 3),
(39, 'Illusion', 'Rock', 194, 'Songs/illusion.m4a', 'SongImg/nightchanges.png', 5, 7),
(40, 'I Should\'ve Kissed You', 'Country', 216, 'Songs/ishouldhavekissedyou.m4a', 'SongImg/whatmakesyoubeautiful.png', 5, 8),
(41, 'Last Holiday', 'Rock', 196, 'Songs/lastholiday.m4a', 'SongImg/artificialp.png', 4, 3),
(42, 'Light It Up', 'Classic', 250, 'Songs/lightitup.m4a', 'SongImg/CountingStars.png', 4, 2),
(43, 'Loved By You', 'Western', 159, 'Songs/lovedbyyou.m4a', 'SongImg/justice.png', 13, 9),
(44, 'Rise Up', 'Country', 231, 'Songs/riseup.m4a', 'SongImg/evolve.png', 7, 5),
(45, 'sHe', 'Country', 190, 'Songs/sHe.m4a', 'SongImg/pillowtalk.png', 6, 1),
(46, 'Sink Or Swim', 'HipHop', 154, 'Songs/sinkorswim.m4a', 'SongImg/artificialp.png', 4, 3),
(47, 'Somebody', 'Rock', 179, 'Songs/somebody.m4a', 'SongImg/justice.png', 13, 9),
(48, 'Stole My Heart', 'Classic', 205, 'Songs/stolemyheart.m4a', 'SongImg/whatmakesyoubeautiful.png', 5, 8),
(49, 'Thunder', 'Western', 187, 'Songs/thunder.m4a', 'SongImg/evolve.png', 7, 5),
(50, 'tRuTh', 'Country', 245, 'Songs/tRuTh.m4a', 'SongImg/pillowtalk.png', 6, 1),
(51, 'What You Wanted', 'HipHop', 241, 'Songs/whatyouwanted.m4a', 'SongImg/CountingStars.png', 4, 2),
(52, 'You Owe Me', 'Classic', 190, 'Songs/youoweme.m4a', 'SongImg/sickboy.png', 2, 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(8) NOT NULL,
  `username` varchar(50) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `display_name` varchar(60) NOT NULL DEFAULT 'Display Name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `pass`, `display_name`) VALUES
(1, 'rishi', 'rishi', 'Rishindra Kapil');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`album_id`),
  ADD KEY `album_artist_id` (`artist_id`);

--
-- Indexes for table `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`artist_id`);

--
-- Indexes for table `liked_songs`
--
ALTER TABLE `liked_songs`
  ADD KEY `user_ids` (`user_id`),
  ADD KEY `song_ids` (`song_id`);

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`playlist_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD KEY `playlist_id` (`playlist_id`),
  ADD KEY `song_id` (`song_id`);

--
-- Indexes for table `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`song_id`),
  ADD KEY `artist_id` (`artist_id`),
  ADD KEY `album_id` (`album_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `album_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `artist`
--
ALTER TABLE `artist`
  MODIFY `artist_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `playlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `song`
--
ALTER TABLE `song`
  MODIFY `song_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `album_artist_id` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`artist_id`);

--
-- Constraints for table `liked_songs`
--
ALTER TABLE `liked_songs`
  ADD CONSTRAINT `song_ids` FOREIGN KEY (`song_id`) REFERENCES `song` (`song_id`),
  ADD CONSTRAINT `user_ids` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD CONSTRAINT `playlist_id` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`playlist_id`),
  ADD CONSTRAINT `song_id` FOREIGN KEY (`song_id`) REFERENCES `song` (`song_id`);

--
-- Constraints for table `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `album_id` FOREIGN KEY (`album_id`) REFERENCES `albums` (`album_id`),
  ADD CONSTRAINT `artist_id` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`artist_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
