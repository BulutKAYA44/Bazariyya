import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import priceFormat from "../../helpers/priceFormatter";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const ProductGridSingle = ({
  product,
  sliderClassName,
  spaceBottomClass,
  newProduct,
}) => {

  const [wishlistCount, setWishlistCount] = useState(0);

  const handleWishlistClick = (action) => {
    if (action === "increase") {
      setWishlistCount((prevCount) => prevCount + 1);
    } else if (action === "decrease" && wishlistCount > 0) {
      setWishlistCount((prevCount) => prevCount - 1);
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
            <Button>+</Button>
              <TextField
                id="filled-start-adornment"
                defaultValue="kg"
                size="small"
              />
              <Button>-</Button>
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
