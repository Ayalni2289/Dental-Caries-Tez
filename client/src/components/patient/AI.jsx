import React, { useState } from 'react';

const App = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const api_url = 'https://4544-188-132-140-102.ngrok-free.app';  // Your API URL here

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(api_url, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const resultData = await response.json();
        setResult(resultData);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      {result && (
        <div>
          <p>Predicted Class: {result.predicted_class}</p>
          <p>Confidence: {result.confidence}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;