import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { DealershipCreatedSubscriber } from 'db-innovation-azure-events';
import { serviceBusClient } from './service-bus-client';

const PORT = 5001;

const app = express();

// request logging
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('Subscriber - Hello World!');
});

const dealershipCreatedSubscriber = new DealershipCreatedSubscriber(
  serviceBusClient,
  'innovation-poc'
);

dealershipCreatedSubscriber.subscribe(async (dealership) => {
  console.log(dealership);
});

app.listen(PORT, () => {
  console.log(`Subscriber API running at http://localhost:${PORT}`);
});
