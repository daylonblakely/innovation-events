import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

const PORT = 5001;

const app = express();

// request logging
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('Subscriber - Hello World!');
});

app.listen(PORT, () => {
  console.log(`Subscriber API running at http://localhost:${PORT}`);
});
