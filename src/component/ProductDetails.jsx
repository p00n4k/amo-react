import React from 'react';

const ProductDetails = ({ productData }) => {
  return (
    <>
      {productData && (
        <div>
          <p className="productid">
            <span className="productid-head">Code:</span>{' '}
            {productData.product_stock_id}
          </p>
          <p className="productname">
            <span className="productname-head">Info:</span>
            <span className="productname-value">
              {' '}
              {productData.product_detail}
            </span>
          </p>
          <p className="producttotal">
            <span className="producttotal-head">Stock:</span>{' '}
            <span className="product_quantity">
              {productData.product_quantity}
            </span>{' '}
            {productData.product_unit}
          </p>
          <p className="warehouse_id">
            <span className="warehouse_id-head">คลัง:</span>{' '}
            {productData.warehouse_id} {productData.warehouse_name}
          </p>

          <hr />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
