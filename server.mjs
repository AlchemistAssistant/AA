import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

const API_KEY = process.env.OPENROUTER_API_KEY || ''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'; 

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
  } catch (e) {
    console.error('Eroare:', e);
    res.json({ response: 'Eroare de rețea sau răspuns invalid.' });
  }
});

app.listen(PORT, () => {
  console.log(`🧠 AA rulează pe http://localhost:${PORT} (OpenRouter)`);
});

