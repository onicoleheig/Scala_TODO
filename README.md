# Scala projet

### Introduction

Ce document présente le projet TODO réalisé dans le cadre du cours Scala 2018. Le but de ce projet et d'utiliser Scala Play, une base de données Slick ainsi qu'une technologie de front end libre afin de réaliser un projet web.

Les membres du goupe sont :

- Caduff Max
- Nanchen Lionel
- Nicole soit Nicoulaz Olivier

### Description du projet

Notre projet consiste en l'implémentation d'une application permettant à des utilisateurs de créer, modifier et terminer des tâches. Le but est que chaque utilisateur ait sa liste de tâches personnalisée et qu'il puisse la partager avec d'autres utilisateurs.

La création d'une tâche se veut très simple sur l'interface en fournissant simplement un texte court. La terminaison d'une tâche doit se faire simplement en cochant une case affichée à gauche du texte.

### Implémentation

#### Backend

Nous pensons réaliser un backend REST afin de proposer la création, modification et terminaison de tâche. Le but est que l'on puisse facilement utiliser cette API avec d'autres applications si besoin.

#### Frontend

Le front-end sera réalisé en React pour la gestion graphique de l'application. Le but est que cette interface interagisse avec l'API REST afin de simplifier la gestion des listes de todo.

#### Base de données

La base de données sera utilisée pour le stockage et la modification des todo. Elle sera également utilisée pour le partage de todo.

#### Autre framework

Nous ne pensons pas utiliser d'autres framework pour le moment.