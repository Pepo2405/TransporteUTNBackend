-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 24-08-2022 a las 03:15:40
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `experto_transporte`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

DROP TABLE IF EXISTS `novedades`;
CREATE TABLE IF NOT EXISTS `novedades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` text NOT NULL,
  `cuerpo` text NOT NULL,
  `img_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id`, `titulo`, `subtitulo`, `cuerpo`, `img_id`) VALUES
(9, 'Roblox????', 'Juego o Amenaza?', 'Estudios demuestran que niños con autismo juegan roblox, niños normales también e incluso adultos por alguna razon', 'm6yvimr2vnufp21ur25a'),
(11, 'Optimus Primo', 'Podra ser?', 'Increible actor de las peliculas de transformers visto en la calle, o podria ser un simple camion... Nunca lo sabremos', 'qsshp1end4fxjkx5dacm'),
(12, 'Pollo frito', 'Kfc una estafa', 'La  verdad terrible desilusión comer en KFC, me lo vendían como algo muy copado pero vino crudo como 3 veces y encima casero sale mejor', 'hzmnzrcvrwb9p0fyffq0'),
(14, '¿Como se toma el mate?', 'Estudio cientifico revela cual es la forma en la que se toma el mate.', 'Estudios recientes han demostrado que el mate se toma caliente y AMARGO. Se comprobo que las personas que le ponen azucar son cobardes y los que le ponen endulcorante son traidores. Y podes ser cobarde, pero no traidor.', 'tcsainbx3sq561gzug61'),
(16, 'Chipa = Superior?', 'Comer chipa te hace mejor persona?', 'Comer chipa te vuelve una forma de vida superior, capaz no solo de rivalizar  sino de aplastar provincianos', 'ss40iqkaxbokhtuy6iws'),
(24, 'Cono de Papas', '545654', '$500', 'nsuhw65lxviow5d33sck');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `user`, `password`) VALUES
(1, 'Pepo', '81dc9bdb52d04dc20036dbd8313ed055'),
(10, 'Pela', '81dc9bdb52d04dc20036dbd8313ed055'),
(5, 'Carlitos', '827ccb0eea8a706c4c34a16891f84e7b');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
