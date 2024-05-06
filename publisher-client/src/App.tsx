function App() {
  // send request to publisher API
  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/dealerships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div>
        <h1>Publisher Client</h1>
        <button onClick={handleClick}>Create Dealership</button>
      </div>
    </>
  );
}

export default App;
