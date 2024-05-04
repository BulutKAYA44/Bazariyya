import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu, categories }) => {
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
          {categories?.main?.map((category, index) => {
            return (
              <li key={index}>
                <Link to={""}>
                  {category.name}
                  {sidebarMenu ? (
                    <span>
                      <i className="fa fa-angle-right"></i>
                    </span>
                  ) : (
                    <i className="fa fa-angle-down" />
                  )}
                </Link>
                <ul className="submenu">
                  {categories?.sub?.filter((item) => item.categoryId === category.id)
                    .map((subCategory, index) => {
                      return (
                        <li key={index}>
                          <Link
                            to={
                              process.env.PUBLIC_URL +
                              "/product-list?catId=" +
                              subCategory.id
                            }
                          >
                            {subCategory.name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};
export default connect(mapStateToProps)(multilanguage(NavMenu));
