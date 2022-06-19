# ThinkerBook

* (fr) Liste les livres (bouqins) recommendés dans les interviews de la chaine Thinkerview ainsi que le conseil aux jeunes générations (la bouteille à la mer).
* (en) Lists recommended books in Thinkerview channel interviews as well as the advice for the young generations (the bottle in the sea).

# Data

L'ensemble des données sont dans le fichier YAML [thinkerbook-feed.yaml](src/assets/thinkerbook-feed.yaml).

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Git

Rewrite all commits author

    git filter-branch -f --env-filter "GIT_AUTHOR_NAME='dev-thinkerbook'; GIT_AUTHOR_EMAIL='dev@thinkerbook.info'; GIT_COMMITTER_NAME='dev-thinkerbook'; GIT_COMMITTER_EMAIL='dev@thinkerbook.info';" HEAD

Remove ref/heads/master

    git update-ref -d refs/original/refs/heads/master
