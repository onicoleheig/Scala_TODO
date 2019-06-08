# Scala projet - ToDo

## Introduction

Ce document présente le projet ToDo réalisé dans le cadre du cours Scala 2018. Le but de ce projet est d'utiliser Scala Play, une base de données Slick ainsi qu'un front-end en ReactJS.

Les membres du goupe sont :

- Caduff Max
- Nanchen Lionel
- Nicole soit Nicoulaz Olivier

## Description du projet

Notre projet consiste en l'implémentation d'une application permettant à des utilisateurs de créer, terminer et supprimer des tâches. Le but est que chaque utilisateur ait sa liste de tâches personnalisée.

La création d'une tâche se veut très simple sur l'interface en fournissant simplement un titre, une description et une date d'échéance. La terminaison d'une tâche doit se fait simplement en cochant une case affichée à gauche du texte.

## Implémentation

### Backend

Nous avons réalisé un backend REST afin de proposer la création, la terminaison et la suppression de tâches. Le but est que l'on puisse facilement utiliser cette API avec d'autres applications si besoin.

### Frontend

Le front-end est réalisé en React, avec en support la librairie Material-UI, pour la gestion graphique de l'application. Le but est que cette interface interagisse avec l'API REST afin de simplifier la gestion des listes de ToDO.

### Base de données

La base de données sera utilisée pour le stockage et la modification des tâches.

### Autre framework

Nous n'avons pas utilisé d'autre framework.

## Installation

Dans cette partie, vous trouverez les informations de déploiement de notre application afin qu'elle puisse fonctionner en local.

### Prérequis

- MySQL 5.5
- IntelliJ (Scala Play)
- npm

### Base de données

Concernant la base de données, vous trouverez un fichier d'importation de la base de données  "**backend/sql/new_todo.sql**" afin de vous permettre de l'importer dans MySQL. Trois tables devraient être créées.

Gardez vos identifiants de connexion à la base de données pour la partie Backend.

### Backend

Afin de faire fonctionner le backend, il faut importer le projet présent dans le dossier "backend" dans IntelliJ et mettre à jour les dépendances à l'aide de sbt (vous pouvez cliquer sur "importer automatiquement" lors de l'ouverture du projet). Ensuite vous devez modifier les paramètres de connexion à votre base de données dans les dernières lignes du fichier de configuration suivant: "**/conf/application.conf**".

L'application est configurée pour être connectée à une base de données en ligne gratuit déjà créée (à modifier avant mise en production réelle ! car login / password en claire sur Github) il est possible que cette base de données ne soit plus accessible car l'hébergeur peut la supprimer à tout moment.

```
slick.dbs.default.profile = "slick.jdbc.MySQLProfile$"
slick.dbs.default.db.driver = "com.mysql.jdbc.Driver"
slick.dbs.default.db.url = "jdbc:mysql://sql2.freemysqlhosting.net/sql2294502"
slick.dbs.default.db.user = "sql2294502"
slick.dbs.default.db.password = "cG1!yY4%"
```

Il est possible de retrouver des éléments de code provenant de l'exemple en commentaire, ceci est dû au fait que l'implémentation n'est pas terminée à 100% et que nous avons besoin de ces exemples.

### Front-end

Afin de faire fonctionner le frontend, ouvrez un terminal et placez vous dans le dossier "frontend/todo" et lancez la commande `npm install` qui installera les dépendances nécessaires à faire fonctionner le projet.

Afin de voir toutes les pages qui ont été créées mais qui ne sont pas forcément finalisées car pas liées à l'API REST, vous pouvez exécuter la commande `npm run storybook` toutes les pages sont décrites dans le rapport en annexe.

Afin de voir la version finale implémentée, vous pouvez exécuter la commande `npm start` afin de voir notre projet directement sur votre navigateur.