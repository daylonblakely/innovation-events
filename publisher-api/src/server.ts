import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {
  DealershipCreatedPublisher,
  DealershipCreatedEvent,
} from 'db-innovation-azure-events';
import { serviceBusClient } from './service-bus-client';

const PORT = 5000;

const app = express();

// request logging
app.use(morgan('combined'));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Publisher - Hello World!');
});

const dealershipCreatedPublisher = new DealershipCreatedPublisher(
  serviceBusClient
);

const publishDealership = (storeNumber: number) => {
  const dealership: DealershipCreatedEvent['data'] = {
    storeName: 'Test Store',
    storeNumber,
  };

  dealershipCreatedPublisher.publish(dealership);
};

app.post('/dealerships', (req, res) => {
  const min = 1;
  const max = 1000;

  publishDealership(Math.floor(Math.random() * (max - min + 1)) + min);

  res.send('Dealership created');
});

app.post('/dealerships/bulk', (req, res) => {
  const count = parseInt(req.query.count?.toString() || '') || 10;

  for (let i = 0; i < count; i++) {
    publishDealership(i);
  }
  res.send();
});

app.listen(PORT, () => {
  console.log(`Publisher API running at http://localhost:${PORT}`);
});
