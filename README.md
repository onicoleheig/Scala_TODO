# Scala projet - ToDo

### Introduction

Ce document présente le projet ToDo réalisé dans le cadre du cours Scala 2018. Le but de ce projet est d'utiliser Scala Play, une base de données Slick ainsi qu'un front-end en ReactJS.

Les membres du goupe sont :

- Caduff Max
- Nanchen Lionel
- Nicole soit Nicoulaz Olivier

### Description du projet

Notre projet consiste en l'implémentation d'une application permettant à des utilisateurs de créer, terminer et supprimer des tâches. Le but est que chaque utilisateur ait sa liste de tâches personnalisée.

La création d'une tâche se veut très simple sur l'interface en fournissant simplement un titre, une description et une date d'échéance. La terminaison d'une tâche doit se fait simplement en cochant une case affichée à gauche du texte.

### Implémentation

#### Backend

Nous avons réalisé un backend REST afin de proposer la création, la terminaison et la suppression de tâches. Le but est que l'on puisse facilement utiliser cette API avec d'autres applications si besoin.

#### Frontend

Le front-end est réalisé en React, avec en support la librairie Material-UI, pour la gestion graphique de l'application. Le but est que cette interface interagisse avec l'API REST afin de simplifier la gestion des listes de ToDO.

#### Base de données

La base de données sera utilisée pour le stockage et la modification des tâches.

#### Autre framework

Nous n'avons pas utilisé d'autre framework.
