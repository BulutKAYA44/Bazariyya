import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ProductGridSingle from "../../components/product/ProductGridSingle";

const ProductGrid = ({ products, sliderClassName, spaceBottomClass }) => {
  return (
    <Fragment>
      {products?.map((product) => {
        return (
          <ProductGridSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            key={product.id}
          />
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array,
};

export default ProductGrid;
