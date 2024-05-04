import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ProductgridList from "./ProductgridList";

const ShopProducts = ({ products, layout }) => {
  const [allProducts, setAllProducts] = useState(products);

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row ${layout && layout}`}>
        <ProductgridList products={allProducts} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
};

export default ShopProducts;
