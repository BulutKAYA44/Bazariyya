import PropTypes from "prop-types";
import React, { useState } from "react";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";

const ShopSidebar = ({
  products,
  getFilterParams,
  sideSpaceClass,
  categories,
  filterData,
}) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch />

      {/* filter by categories */}
      <ShopCategories
        categories={categories}
        getFilterParams={(data) => getFilterParams(data)}
        filterData={filterData}
      />

      <div className="sidebar-widget" style={{ marginTop: "30px" }}>
        <div className="pro-sidebar-search mb-50 mt-25">
          <span>Fiyat: </span>
          <form className="pro-sidebar-search-form price" action="#">
            <input
              type="text"
              placeholder="min"
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <input
              type="text"
              placeholder="max"
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </form>
          <button
            className="price-search-button"
            onClick={() =>
              getFilterParams({ ...filterData, minPrice, maxPrice })
            }
          >
            Ara
          </button>
          <button
            className="price-search-button"
            onClick={() =>
              getFilterParams({ categoryId: 0, minPrice: 0, maxPrice: 0 })
            }
          >
            Temizle
          </button>
        </div>
      </div>

      {/* filter by color */}
      {/* <ShopColor colors={uniqueColors} getSortParams={getSortParams} /> */}

      {/* filter by size */}
      {/* <ShopSize sizes={uniqueSizes} getSortParams={getSortParams} /> */}

      {/* filter by tag */}
      {/* <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> */}
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
