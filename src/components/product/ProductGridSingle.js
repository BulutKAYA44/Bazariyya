import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import priceFormat from "../../helpers/priceFormatter";

const ProductGridSingle = ({
  product,
  sliderClassName,
  spaceBottomClass,
  newProduct,
}) => {
  return (
    <Fragment>
      <div
        className={`col-xl-4 col-md-6 col-lg-4 col-sm-6 mb-25 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              <img
                className="default-img"
                src={product.productImages[0]?.url}
                alt=""
              />
              {product && (
                <img
                  className="hover-img"
                  src={product.productImages[1]?.url}
                  alt=""
                />
              )}
            </Link>
            {newProduct && (
              <div className="product-img-badges">
                <span className="purple">Yeni</span>
              </div>
            )}
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                {product.name}
              </Link>
            </h3>
            <div className="product-price">
              <span>{priceFormat(product.price)} </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default ProductGridSingle;
