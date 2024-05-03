import { ServiceBusClient } from '@azure/service-bus';

export const serviceBusClient = new ServiceBusClient(
  process.env.AZURE_SERVICE_BUS_CONNECT_STRING || ''
);
