import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Servir les fichiers statiques
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Serveur web lancé sur http://localhost:${PORT}`);
});
