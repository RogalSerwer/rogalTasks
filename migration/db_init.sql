-- Całość z exportu glownej bazy danych

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `harmonogram` (
  `ID` int(11) NOT NULL,
  `nazwa` text NOT NULL,
  `dni` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `uzytkownik` int(11) NOT NULL,
  `lastModified` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `lastAdded` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE `uzytkownicy` (
  `ID` int(11) NOT NULL,
  `login` text NOT NULL,
  `haslo` text NOT NULL,
  `ilePowiadomien` int(11) NOT NULL DEFAULT 0,
  `discord` bigint(20) NOT NULL DEFAULT 0,
  `androidToken` text NOT NULL DEFAULT '',
  `lastModified` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE `zadania` (
  `ID` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `uzytkownik` int(11) NOT NULL,
  `nazwa` text NOT NULL,
  `data` datetime DEFAULT NULL,
  `parentID` int(11) NOT NULL,
  `lastModified` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

ALTER TABLE `harmonogram`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `r_UzytkownikHarmo` (`uzytkownik`);

ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `zadania`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `r_Uzytkownik` (`uzytkownik`),
  ADD KEY `r_Rodzic` (`parentID`);


ALTER TABLE `harmonogram`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

ALTER TABLE `uzytkownicy`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `zadania`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=372;

ALTER TABLE `harmonogram`
  ADD CONSTRAINT `r_UzytkownikHarmo` FOREIGN KEY (`uzytkownik`) REFERENCES `uzytkownicy` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `zadania`
  ADD CONSTRAINT `r_Uzytkownik` FOREIGN KEY (`uzytkownik`) REFERENCES `uzytkownicy` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
