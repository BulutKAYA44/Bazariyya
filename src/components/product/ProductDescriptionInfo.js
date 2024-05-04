import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import priceFormat from "../../helpers/priceFormatter";
import Table from "../table";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
  addToast,
  addToCart,
  addToWishlist,
  addToCompare,
}) => {
  const advert = [
    { name: "İlan No", value: product?.id},
    { name: "Hayvan Sayısı", value: product?.quantity}
  ];

  const userItems = [
    { name: "Ad", value: product?.user?.name },
    { name: "Soyad", value: product?.user?.surname },
    { name: "Email", value: product?.user?.email },
    { name: "Telefon", value: product?.user?.phone },
  ];

  const addressItems = [
    { name: "Şehir", value: product?.address?.city },
    { name: "İlçe", value: product?.address?.district },
    { name: "Adres", value: product?.address?.addressText },
  ];

  return (
    <div className="product-details-content ml-70">
      <h2>{product?.name}</h2>
      <div className="product-details-price">
        <span>{priceFormat(product?.price)} </span>
      </div>
      <div className="pro-details-list" style={{padding:"0 0 1px"}}>
      <Table data={advert} />
      </div>
      <div className="product-detay-user">
        <Table data={userItems} />
      </div>
      <div className="product-detay-user mt-4">
        <Table data={addressItems} />
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);
