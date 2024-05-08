# innovation-events

This project consists of four applications that run in separate Docker containers: a publisher API, a publisher client, a subscriber API, and a subscriber client. The publishers publish events to an Azure Service Bus using the `db-innovation-azure-events` npm package. The subscriber API subscribes to these events and sends them to the client using a WebSocket connection.

## Prerequisites

- Docker and Docker Compose installed on your machine.
- An Azure Service Bus instance.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/daylonblakely/innovation-events.git
   cd <repository-directory>
   ```

1. Create a .env file in the root directory of the project and add your Azure Service Bus connection string and your Azure Service Bus subscription name:

   ```
   AZURE_SERVICE_BUS_CONNECTION_STRING=<your-connection-string>
   AZURE_SERVICE_BUS_SUBSCRIPTION_NAME=<your-subscription-name>
   ```

1. Build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

   This command will start all four applications in separate Docker containers:

   - The publisher API will be running at http://localhost:5000.
   - The publisher client will be running at http://localhost:3000.
   - The subscriber API will be running at http://localhost:5001.
   - The subscriber client will be running at http://localhost:3001.

1. To stop the Docker containers, press `Ctrl+C` in the terminal where docker-compose up is running. To remove the containers, use the following command:

   ```bash
   docker-compose down
   ```

## Usage

- Use the publisher client to publish events to the Azure Service Bus.
- The subscriber API will automatically receive these events and send them to the subscriber client via a WebSocket connection.
- The subscriber client will display the received events.
