import React, { useState } from 'react';
import './App.css';
import ProductDetails from './component/ProductDetails.jsx';

function App() {
  const [searchInput, setProductId] = useState('');
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchBYID = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://damp-forest-85365-524db93b1e7f.herokuapp.com/products/search/id/${searchInput}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      const data = await response.json();
      setProductData(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching product data:', error);
      setProductData(null); // Clear product data
      setError(error.message);
    }
  };

  const handleSearchBYProductName = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://damp-forest-85365-524db93b1e7f.herokuapp.com/products/search/name/${searchInput}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      const data = await response.json();
      setProductData(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching product data:', error);
      setProductData(null); // Clear product data
      setError(error.message);
    }
  };

  return (
    <div>
      <p>
        <h1 className="title">Amo Stock Search</h1>
      </p>
      <form className="form">
        <br />
        <input
          type="text"
          id="productId"
          value={searchInput}
          placeholder="กรุณากรอกรหัสสินค้าหรือข้อมูลสินค้า"
          onChange={(e) => setProductId(e.target.value)}
        />
        <br />
        <button type="submit" className="btn" onClick={handleSearchBYID}>
          ค้นหาด้วยรหัสสินค้า
        </button>
        <button
          type="submit"
          className="btn-productname"
          onClick={handleSearchBYProductName}
        >
          ค้นหาด้วยข้อมูลสินค้า
        </button>
      </form>
      {error && <p>Error: {error}</p>}
      {productData &&
        productData.map((product, index) => (
          <ProductDetails key={index} productData={product} />
        ))}
    </div>
  );
}

export default App;
