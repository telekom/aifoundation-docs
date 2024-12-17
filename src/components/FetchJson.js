import React, { useEffect, useState } from 'react';

const FetchJson = ({ url, method = 'GET', body = null }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`Fetching data from ${url} with method ${method}`);
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: method === 'POST' ? JSON.stringify(body) : null,
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText} - ${text}`);
          });
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          throw new Error('Response is not JSON');
        }
      })
      .then(data => {
        console.log('Data fetched successfully:', data);
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
        setError(error.message);
      });
  }, [url, method, body]);

  return (
    <pre>
      {error ? `Error: ${error}` : data ? JSON.stringify(data, null, 2) : 'Loading...'}
    </pre>
  );
};

export default FetchJson;