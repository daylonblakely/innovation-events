import { useState } from 'react';

function BulkCreateDealerships() {
  const [count, setCount] = useState(10);

  const createDealerships = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/dealerships/bulk?count=' + count,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }

      alert('Dealerships created successfully');
    } catch (error) {
      console.error('Failed to create dealerships:', error);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <button onClick={createDealerships}>Bulk Create Dealerships</button>
    </div>
  );
}

export default BulkCreateDealerships;
