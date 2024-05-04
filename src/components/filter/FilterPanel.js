import PropTypes, { number } from "prop-types";
import React, { useState } from "react";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import { useFetch } from "../../hooks/use-fetch";

import {
  getCityes
} from "../../services/product";


const FilterPanel = ({
  products,
  getFilterParams,
  sideSpaceClass,
  categories,
  filterData,
}) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

 var cityId = 0;

  const setCity = (e) => {
    cityId = e.target.value;
  };

const [cities] = useFetch(
  () =>
    getCityes({
      pageCount: 0,
      pageIndex: 0,
      id: 0,
      countryId: 2,
    }),
  [],
  {

  }
);

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
      <div className="billing-info mb-35">
      <span style={{textAlign:"center", fontStyle:"bold", fontSize:"15px"}} >İl: </span>
            <select
              htmlFor="city"
              onChange={(e) => setCity(e)}
              name="address.cityId"
            >
              <option value="">Seçiniz</option>
              {cities?.value?.map((item) => {
                return (
                  <option
                    key={item.id}
                    value={parseInt(item.id)}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        <div className="pro-sidebar-search mb-50 mt-25">
          <span style={{textAlign:"center", fontStyle:"bold", fontSize:"15px"}} >Fiyat: </span>
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
              getFilterParams({ ...filterData, minPrice, maxPrice, cityId })
            }
          >
            Ara
          </button>
          <button
            className="price-search-button"
            onClick={() =>
              getFilterParams({ categoryId: 0, minPrice: 0, maxPrice: 0, cityId : 0 })
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


FilterPanel.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default FilterPanel;
