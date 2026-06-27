import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const DB_FILE = path.join(__dirname, 'trending.json');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://movievault-mm2001994s-projects.vercel.app'  // add this after you get your Vercel URL
  ]
}));
app.use(express.json());

// Helper: read the JSON file
const readDB = () => {
  if (!fs.existsSync(DB_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch {
    return {};
  }
};

// Helper: write to the JSON file
const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// POST /api/trending — record a searched movie
app.post('/api/trending', (req, res) => {
  const { movieId, title, poster_path } = req.body;

  if (!movieId || !title) {
    return res.status(400).json({ error: 'movieId and title are required' });
  }

  const db = readDB();
  const key = String(movieId);

  if (db[key]) {
    db[key].count += 1;
  } else {
    db[key] = { movieId: key, title, poster_path, count: 1 };
  }

  writeDB(db);
  res.json({ success: true, count: db[key].count });
});

// GET /api/trending — return top 5 most searched movies
app.get('/api/trending', (req, res) => {
  const db = readDB();
  const sorted = Object.values(db)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  res.json(sorted);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});