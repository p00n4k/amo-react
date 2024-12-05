import React, { useState } from 'react';
import './App.css';
import ProductDetails from './component/ProductDetails.jsx';

function App() {
  const [idInput, setIdInput] = useState('');
  const [productInfoInput, setProductInfoInput] = useState('');
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (body) => {
    try {
      const response = await fetch(
        'https://damp-forest-85365-524db93b1e7f.herokuapp.com/products/search',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...body, page, limit: 10 }), // Include pagination
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }

      if (response.status === 204) {
        setProductData([]);
        setError('ไม่พบสินค้าตรงกับข้อมูลที่ค้นหา กรุณาลองใหม่อีกครั้ง');
        setTotalPages(1);
        return;
      }

      const data = await response.json();
      setProductData(data.products); // Assuming response includes products and total count
      setTotalPages(Math.ceil(data.total / 10)); // Assuming backend sends total count
      setError(null);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setError(error.message);
      setProductData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    if (idInput || productInfoInput) {
      fetchData({ id: idInput, name: productInfoInput });
    } else {
      setError('กรุณากรอกข้อมูลในช่องค้นหา');
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    setLoading(true);
    fetchData({ id: idInput, name: productInfoInput });

    // Scroll to the top
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      {error && <p className="error-message">{error}</p>}
      {productData.map((product, index) => (
        <ProductDetails
          key={index}
          productData={product}
          productIndex={index + 1}
        />
      ))}

      <div className="pagination-container" style={{ marginBottom: '30px' }}>
        <button
          className="pagination-button"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span className="page-indicator">
          Page{page}of{totalPages}
        </span>
        <button
          className="pagination-button"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
