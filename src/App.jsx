import React, { useState } from 'react';
import './App.css';
import ProductDetails from './component/ProductDetails.jsx';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearchBYID = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while fetching data
    try {
      const response = await fetch(
        `https://damp-forest-85365-524db93b1e7f.herokuapp.com/products/search/id/${searchInput}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      if (response.status === 204) {
        setProductData([]);
        setError('ไม่พบสินค้ารหัสนี้ในคลัง กรุณาลองใหม่อีกครั้ง');
        setLoading(false); // Set loading to false after handling response
        return;
      }
      const data = await response.json();
      setProductData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setProductData(null);
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after handling response
    }
  };

  const handleSearchBYProductName = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while fetching data
    try {
      const response = await fetch(
        `https://damp-forest-85365-524db93b1e7f.herokuapp.com/products/search/name/${searchInput}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      if (response.status === 204) {
        setProductData([]);
        setError('ไม่พบข้อมูลสินค้านี้ในคลัง กรุณาลองใหม่อีกครั้ง');
        setLoading(false); // Set loading to false after handling response
        return;
      }
      const data = await response.json();
      setProductData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setProductData(null);
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after handling response
    }
  };

  return (
    <div>
      <h1 className="title">Amo Stock Search</h1>
      <form className="form">
        <input
          type="text"
          id="productId"
          value={searchInput}
          placeholder="กรุณากรอกรหัสสินค้าหรือข้อมูลสินค้า"
          onChange={(e) => setSearchInput(e.target.value)}
        />
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
      {loading && <div className="loading">Loading...</div>}
      {error && <p>Error: {error}</p>}
      {productData &&
        productData.map((product, index) => (
          <ProductDetails key={index} productData={product} />
        ))}
    </div>
  );
}

export default App;
