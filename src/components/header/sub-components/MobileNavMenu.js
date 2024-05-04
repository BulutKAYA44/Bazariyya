import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const MobileNavMenu = ({ categories }) => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        {categories?.main?.map((category, index) => {
          return (
            <li className="menu-item-has-children" key={index}>
              <Link to={""}>
                {category.name}
                <span className="menu-expand">
                  <i></i>
                </span>
              </Link>
              <ul className="sub-menu">
                {categories?.sub
                  ?.filter((item) => item.categoryId === category.id)
                  .map((subCategory, index) => {
                    return (
                      <li className="menu-item-has-children" key={index}>
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
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};
export default connect(mapStateToProps)(multilanguage(MobileNavMenu));
