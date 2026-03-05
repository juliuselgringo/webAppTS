# Web App TypeScript

Application web frontend avec authentification et gestion d'utilisateurs.

## Architecture

```
src/
├── fonction/          # Fonctions métier
│   ├── deleteUser.ts
│   ├── inscription.ts
│   ├── login.ts
│   ├── logout.ts
│   └── verifySession.ts
├── script/            # Scripts frontend
│   ├── admin.ts
│   └── app.ts
view/                  # Pages HTML
├── admin.html
└── dashboard.html
index.html             # Page d'accueil
dist/                  # Fichiers compilés (généré)
```

## Installation & Configuration

### Initialisation du projet

```bash
npm init -y                                    # Création de package.json
npm install typescript --save-dev              # Installation TypeScript
npm install express                            # Installation Express
```

### Structure TypeScript

Création du fichier `tsconfig.json` pour centraliser la configuration de compilation :

```bash
npx tsc --init                                 # Génère tsconfig.json
npx tsc                                        # Compile une fois
npx tsc --watch                                # Compilation automatique à chaque changement
```

## Démarrage local

```bash
npm run compile                                # Compiler les fichiers TypeScript
npm start                                      # Lancer le serveur Express (port 3001)
```

Accédez à l'application : `http://localhost:3001`

## Docker

Construire et lancer l'application dans un conteneur :

```bash
docker build -t webapp_ts .                    # Création de l'image
docker run -d -p 3001:3001 --name webapp_ts_container webapp_ts
```

## Notes

> Pour plus d'informations sur la compilation TypeScript, consultez la [documentation officielle](https://www.typescriptlang.org/docs/handbook/compiler-options.html)