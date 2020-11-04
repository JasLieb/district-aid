-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 14 oct. 2020 à 08:29
-- Version du serveur :  10.3.25-MariaDB
-- Version de PHP : 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nowaste`
--

-- --------------------------------------------------------

--
-- Structure de la table `interest_points`
--

CREATE TABLE `interest_points` (
  `id` int(11) NOT NULL,
  `location` point NOT NULL,
  `name` varchar(100) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `due_date` timestamp NULL DEFAULT NULL,
  `type` enum('Giver','Reciever','Assos','Other') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `interest_points`
--

INSERT INTO `interest_points` (`id`, `location`, `name`, `creation_date`, `due_date`, `type`) VALUES
(1, 0x000000000101000000b6ee09905ecd4540000000000d18f73f, 'nowhere', '2020-02-07 23:41:40', NULL, 'Reciever');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `creation_date` date NOT NULL DEFAULT current_timestamp(),
  `is_connected` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `creation_date`, `is_connected`) VALUES
(10, 'toto', 'toto@toto.fr', '$2a$10$e0Y7N6cJGjg0WvjJA5U/s.GDKWgvB0T.SGicnDuqtdGjhzC4zZiuK', '2020-02-08', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `interest_points`
--
ALTER TABLE `interest_points`
  ADD PRIMARY KEY (`id`),
  ADD SPATIAL KEY `spatial_index_points` (`location`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `index_unique_email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `interest_points`
--
ALTER TABLE `interest_points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
