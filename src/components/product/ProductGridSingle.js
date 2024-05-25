import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import priceFormat from "../../helpers/priceFormatter";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const ProductGridSingle = ({
  product,
  sliderClassName,
  spaceBottomClass,
  newProduct,
}) => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const handleWishlistClick = (action) => {
    if (action === "increase") {
      setWishlistCount((prevCount) => prevCount + 1);
    } else if (action === "decrease" && wishlistCount > 0) {
      setWishlistCount((prevCount) => prevCount - 1);
    }
  };

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (action === "decrease" && quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(value === "" ? 0 : parseInt(value, 10));
    }
  };

  const handleFocus = () => {
    setShowPlaceholder(false);
  };

  const handleBlur = () => {
    if (quantity === 0) {
      setShowPlaceholder(true);
    }
  };

  return (
    <Fragment>
      <div className={`col-xl-4 col-md-6 col-lg-4 col-sm-6 mb-4 ${sliderClassName ? sliderClassName : ""}`}>
        <div className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}>
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              <img
                className="default-img"
                src={product.productImages[0]?.url}
                alt={product.name}
              />
              {newProduct && (
                <div className="product-img-badges">
                  <span className="badge badge-new">Yeni</span>
                </div>
              )}
            </Link>
          </div>
          <div className="product-content">
            <h3 className="product-title">
              <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                {product.name}
              </Link>
            </h3>
            <div className="product-price">
              <span>{priceFormat(product.price)}</span>
            </div>
            <div className="product-actions">
              <button className="btn btn-primary add-to-cart-btn">Sepete Ekle</button>
              <div className="wishlist-actions">
                <Button
                  variant="contained"
                  onClick={() => handleQuantityChange("increase")}
                >
                  +
                </Button>
                <TextField
                  value={quantity === 0 ? "" : quantity}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={showPlaceholder ? "kg" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {showPlaceholder ? "" : ""}
                      </InputAdornment>
                    ),
                    style: showPlaceholder ? { color: "lightgrey" } : {}
                  }}
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={() => handleQuantityChange("decrease")}
                >
                  -
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  product: PropTypes.object.isRequired,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  newProduct: PropTypes.bool,
};

export default ProductGridSingle;
