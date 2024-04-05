import React from 'react';

const ProductDetails = ({ productData }) => {
  return (
    <>
      {productData && (
        <div>
          <h2 className="section-header">Product Details</h2>
          <p className="productid">
            <span className="productid-head">รหัสสินค้า:</span>{' '}
            {productData.product_stock_id}
          </p>
          <p className="productname">
            <span className="productname-head">ข้อมูลสินค้า:</span>
            <span className="productname-value">
              {' '}
              {productData.product_detail}
            </span>
          </p>
          <p className="producttotal">
            <span className="producttotal-head">มีอยู่ในสต็อก:</span>{' '}
            {productData.product_quantity} {productData.product_unit}
          </p>
          <p className="warehouse_id">
            <span className="warehouse_id-head">รหัสคลัง:</span>{' '}
            {productData.warehouse_id}
          </p>
          <p className="warehouse_name">
            <span className="warehouse_name-head">ชื่อคลัง:</span>{' '}
            {productData.warehouse_name}
          </p>
          <hr />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
