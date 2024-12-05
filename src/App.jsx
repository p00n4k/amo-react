import React, { useState } from 'react';
import './App.css';
import ProductDetails from './component/ProductDetails.jsx';

function App() {
  const [idInput, setIdInput] = useState('');
  const [productInfoInput, setProductInfoInput] = useState('');
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while fetching data
    let url = '';
    let body = null;

    // Determine which API to call based on input
    if (idInput && productInfoInput) {
      url = 'http://localhost:3000/products/search';
      body = { id: idInput, name: productInfoInput };
    } else if (idInput) {
      url =
        'https://damp-forest-85365-524db93b1e7f.herokuapp.com/products/search/id_body';
      body = { id: idInput };
    } else if (productInfoInput) {
      url = `https://damp-forest-85365-524db93b1e7f.herokuapp.com/products/search/name/${productInfoInput}`;
    } else {
      setError('กรุณากรอกข้อมูลในช่องค้นหา');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: body ? 'POST' : 'GET', // Use POST if body exists, otherwise GET
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }

      if (response.status === 204) {
        setProductData([]);
        setError('ไม่พบสินค้าตรงกับข้อมูลที่ค้นหา กรุณาลองใหม่อีกครั้ง');
        setLoading(false); // Set loading to false after handling response
        return;
      }

      const data = await response.json();
      setProductData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setProductData([]);
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after handling response
    }
  };

  return (
    <div>
      <h1 className="title">Amo Stock Search</h1>
      <form className="form" onSubmit={handleSearch}>
        <input
          type="text"
          value={idInput}
          placeholder="กรุณากรอกรหัสสินค้า"
          onChange={(e) => setIdInput(e.target.value)}
        />
        <input
          type="text"
          value={productInfoInput}
          placeholder="กรุณากรอกรายละเอียดสินค้า"
          onChange={(e) => setProductInfoInput(e.target.value)}
        />
        <button type="submit" className="btn">
          ค้นหา
        </button>
      </form>
      {loading && <div className="loading">Loading...</div>}
      {error && <p>{error}</p>}
      {productData &&
        productData.map((product, index) => (
          <ProductDetails key={index} productData={product} />
        ))}
    </div>
  );
}

export default App;
