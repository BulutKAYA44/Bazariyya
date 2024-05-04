import PropTypes from "prop-types";
import React from "react";

const ShopCategories = ({ categories, getFilterParams, filterData }) => {
  return (
    <div className="sidebar-widget pl-4">
      <h4 className="pro-sidebar-title">Kategoriler </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            {/* <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    getSortParams("category", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li> */}
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <label
                      htmlFor={`category${category.id}`}
                      className="checkmark"
                    >
                      {category.name}
                    </label>
                    <input
                      style={{ marginLeft: "10px" }}
                      type="checkbox"
                      id={`category${category.id}`}
                      name={`category${category.id}`}
                      checked={filterData.categoryId === category.id}
                      onChange={(e) => {
                        getFilterParams({
                          ...filterData,
                          categoryId: category.id,
                        });
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default ShopCategories;
