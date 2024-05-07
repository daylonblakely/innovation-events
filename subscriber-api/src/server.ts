import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {
  DealershipCreatedSubscriber,
  DealershipCreatedEvent,
} from 'db-innovation-azure-events';
import { serviceBusClient } from './service-bus-client';

const PORT = 5001;

const app = express();

// request logging
app.use(morgan('combined'));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Subscriber - Hello World!');
});

const dealershipsData: DealershipCreatedEvent['data'][] = [];

app.get('/dealerships', (req, res) => {
  res.json(dealershipsData);
});

const dealershipCreatedSubscriber = new DealershipCreatedSubscriber(
  serviceBusClient,
  process.env.AZURE_SERVICE_BUS_SUBSCRIPTION_NAME || ''
);

dealershipCreatedSubscriber.subscribe(async (dealership) => {
  // console.log(dealership);
  dealershipsData.push(dealership);
});

app.listen(PORT, () => {
  console.log(`Subscriber API running at http://localhost:${PORT}`);
});
