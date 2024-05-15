import http from 'http';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import WebSocket from 'ws';
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

// Create a WebSocket server
const wss = new WebSocket.Server({ noServer: true });

dealershipCreatedSubscriber.subscribe(async (dealership) => {
  console.log('Received dealership created event:', dealership);
  dealershipsData.push(dealership);

  // Broadcast the new dealership data to all connected WebSocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(dealership));
    }
  });
});

// Create an HTTP server
const server = http.createServer(app);

// Upgrade HTTP server to WebSocket server
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

server.listen(PORT, () => {
  console.log(`Subscriber API running at http://localhost:${PORT}`);
});
