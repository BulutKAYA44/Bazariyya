import PropTypes from "prop-types";
import React from "react";

const ShopTopAction = ({
  getLayout,
  getFilterSortParams,
  productCount,
  sortedProductCount,
}) => {
  return (
    <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        <div className="shop-select mt-3">
          <label htmlFor="sort">Sıralama:</label>
          <select
            id="sort"
            onChange={(e) => getFilterSortParams(e.target.value)}
          >
            <option value="">Seçiniz</option>
            <option value="priceHighToLow">Artan Fiyat</option>
            <option value="priceLowToHigh">Azalan Fiyat</option>
          </select>
        </div>
      </div>

      {/* <div className="shop-tab">
        <button
          onClick={e => {
            getLayout("grid two-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th-large" />
        </button>
        <button
          onClick={e => {
            getLayout("grid three-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th" />
        </button>
        <button
          onClick={e => {
            getLayout("list");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-list-ul" />
        </button>
      </div> */}
    </div>
  );
};

ShopTopAction.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number,
};

export default ShopTopAction;
