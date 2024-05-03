import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { DealershipCreatedPublisher } from 'db-innovation-azure-events';
import { serviceBusClient } from './service-bus-client';

const PORT = 5000;

const app = express();

// request logging
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('Publisher - Hello World!');
});

app.post('/dealerships', async (req, res) => {
  const min = 1;
  const max = 1000;

  const dealership = {
    storeName: 'Test Store',
    storeNumber: Math.floor(Math.random() * (max - min + 1)) + min,
  };

  const dealershipCreatedPublisher = new DealershipCreatedPublisher(
    serviceBusClient
  );

  dealershipCreatedPublisher.publish(dealership);

  res.send('Dealership created');
});

app.listen(PORT, () => {
  console.log(`Publisher API running at http://localhost:${PORT}`);
});
