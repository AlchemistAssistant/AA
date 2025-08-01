// Load environment variables
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Servește fișierele statice (index.html etc.)

const API_KEY = process.env.OPENROUTER_API_KEY;

app.post('/gpt', async (req, res) => {
  const { prompt, lang, personality } = req.body;

  const userMessage = `Răspunde în limba ${lang === 'ro' ? 'română' : 'engleză'} cu tonul unui ${personality}:\n${prompt}`;

  const data = {
    model: 'meta-llama/llama-3-8b-instruct:nitro',
    messages: [{ role: 'user', content: userMessage }]
  };

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    const reply = result.choices?.[0]?.message?.content || 'Fără răspuns.';
    res.json({ response: reply });
  } catch (error) {
    console.error('Eroare la OpenRouter:', error);
    res.json({ response: 'Eroare de rețea sau răspuns invalid.' });
  }
});

app.listen(PORT, () => {
  console.log(`🧠 Alchemist Assistant rulează pe http://localhost:${PORT} (OpenRouter)`);
});
