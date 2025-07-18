-- Initialisation de la base de données PostgreSQL


-- Tables liées aux utilisateurs

CREATE TABLE IF NOT EXISTS utilisateur (
    id SERIAL PRIMARY KEY,
    prenom VARCHAR(50) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe TEXT NOT NULL,
    genre VARCHAR(10) NOT NULL CHECK (genre IN ('Homme', 'Femme', 'Autre')),
    taille INT CHECK (taille > 0),
    poids DECIMAL(5,2) CHECK (poids > 0)
);


CREATE TABLE IF NOT EXISTS administrateur (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT REFERENCES utilisateur(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Super Admin', 'Gestionnaire'))
);

-- Tables liées aux aliments

CREATE TABLE IF NOT EXISTS famille (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS aliment (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) UNIQUE NOT NULL,
    proteine DECIMAL(5,2) CHECK (proteine >= 0),
    lipide DECIMAL(5,2) CHECK (lipide >= 0),
    glucide DECIMAL(5,2) CHECK (glucide >= 0),
    matiere_grasse DECIMAL(5,2) CHECK (matiere_grasse >= 0),
    kilocalorie INT CHECK (kilocalorie >= 0),
    famille_id INT REFERENCES famille(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS repas (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) UNIQUE NOT NULL CHECK (nom IN ('Petit-déjeuner', 'Déjeuner', 'Dîner', 'Collation'))
);

CREATE TABLE IF NOT EXISTS recette (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT REFERENCES utilisateur(id) ON DELETE CASCADE,
    nom VARCHAR(100) NOT NULL,
    type_repas_id INT REFERENCES repas(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS recette_aliment (
    id SERIAL PRIMARY KEY,
    recette_id INT REFERENCES recette(id) ON DELETE CASCADE,
    aliment_id INT REFERENCES aliment(id) ON DELETE CASCADE,
    poids DECIMAL(6,2) NOT NULL CHECK (poids > 0)
);

-- Tables liées aux entraînements

CREATE TABLE IF NOT EXISTS seance (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT REFERENCES utilisateur(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    nom VARCHAR(100),
    note TEXT
);

CREATE TABLE IF NOT EXISTS exercice (
    id SERIAL PRIMARY KEY,
    seance_id INT REFERENCES seance(id) ON DELETE CASCADE,
    nom VARCHAR(100) NOT NULL,
    groupe_musculaire VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS serie (
    id SERIAL PRIMARY KEY,
    exercice_id INT REFERENCES exercice(id) ON DELETE CASCADE,
    numero INT NOT NULL,
    repetitions INT CHECK (repetitions > 0),
    poids DECIMAL(5,2) CHECK (poids >= 0),
    temps_repos INT CHECK (temps_repos >= 0)
);

CREATE TABLE IF NOT EXISTS favori (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT REFERENCES utilisateur(id) ON DELETE CASCADE,
    aliment_id INT REFERENCES aliment(id) ON DELETE CASCADE
);
