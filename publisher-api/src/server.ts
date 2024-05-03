import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

const PORT = 5000;

const app = express();

// request logging
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('Publisher - Hello World!');
});

app.listen(PORT, () => {
  console.log(`Publisher API running at http://localhost:${PORT}`);
});
