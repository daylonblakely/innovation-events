import { useEffect, useState } from 'react';
import { DealershipCreatedEvent } from 'db-innovation-azure-events';

function App() {
  const [dealerships, setDealerships] = useState<
    DealershipCreatedEvent['data'][]
  >([]);

  useEffect(() => {
    // Fetch dealerships on initial render
    fetch('http://localhost:5001/dealerships')
      .then((response) => response.json())
      .then((data) => setDealerships(data))
      .catch((error) => console.error('Error:', error));

    const ws = new WebSocket('ws://localhost:5001');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (message) => {
      const dealership = JSON.parse(message.data);
      setDealerships((prevDealerships) => [...prevDealerships, dealership]);
    };

    ws.onerror = (error) => {
      console.log('WebSocket error: ', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => ws.close();
  }, []);

  return (
    <>
      <div>
        <h1>Subscriber Client</h1>
        <ul>
          {dealerships.map((dealership, index) => (
            <li key={index}>
              {dealership.storeName} - {dealership.storeNumber}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
