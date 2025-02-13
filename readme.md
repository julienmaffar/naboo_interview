# Naboo interview

## Features

Réalisation de deux features 🎉 :

- Ajout d'un système de favoris pour les activités (commit `feat: favorites activities system`)
- Ajout d'un mode debug (commit `feat: debug mode when user is admin`)

## Axes d'amélioration

### Front-end

**Atomic Design**

Mettre en place le pattern atomic design dans le dossier `components` permettant d'avoir une meilleure réutilisabilité des composants dans le code.

```bash
    - components
        - atoms
        - molecules
        - organisms
```

**Prettier**

Ajouter un fichier de configuration Prettier pour tous les développeurs du projet ai le même formattage.

**Tests unitaires**

Ajouter des tests unitaires pour `components` du projet quand c'est pertinant.

**Storybook**

Mettre en place un storybook permettant d'isoler chaque composant et de pouvoir travailler dessus sans interaction avec d'autresc composants.

**Utilisation des composants Next.JS**

Aucune idée de comment fonctionne le composant `<Image />` de mantine-ui mais peut-être utiliser les composants de Next.JS comme `<Image />` qui contient un système de cache intégré.

### Back-end

**Rate limiter**

Ajout d'un rate limiter permettant de ne pas surcharger l'API quand il y a un trop grand nombre de requêtes.

### Général

**PNPM**

Utilisation de PNPM pour gérer deux sous packages à l'intérieur d'un package général.

**Docker**

Dockeriser le front et le back pour avoir un environnement prêt.

## What's used ?

backend

- mongodb

- nestjs

- mongoose

- data mapper pattern

- graphql

frontend

- nextjs (with page router)

- mantine-ui

- axios

- vitest

- graphql

- apollo client

## How to launch project ?

backend

```bash

npm i



npm run  start:dev

```

frontend

```bash

npm i



npm run  dev

```

after graphql modification

```bash

# > frontend

npm run  generate-types

```

## Connection informations

email: user1@test.fr

password: user1
