/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { Fragment, useState, useContext, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import { LoadingContext } from "../../context/Loading";
import { getProducts } from "../../services/product";
import { useFetch } from "../../hooks/use-fetch";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import FilterPanel from "../../components/filter/FilterPanel";

const ShopGridStandard = ({ location, categories }) => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const catID = query.get("catId");
  const cityID = query.get("cityId");
  const userID = query.get("userId");
  const [layout, setLayout] = useState("grid three-column");
  const [, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState(null);
  const [sortedData, setSortedData] = useState([]);
  const [mergeCat, setMergeCat] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterData, setFilterData] = useState({
    categoryId: Number(catID),
    cityId: Number(cityID),
    minPrice: 0,
    maxPrice: 0,
  });
  const { setLoading } = useContext(LoadingContext);
  const { push } = useHistory();

  const pageLimit = 9;
  const [allProducts] = useFetch(
    () =>
      getProducts({
        pageCount: pageLimit,
        pageIndex: currentPage - 1,
        ...filterData,
      }),
    {},
    {
      setLoading,
      reloadDeps: [currentPage, filterData, catID],
      deps: [currentPage, filterData, catID],
    }
  );

  useEffect(() => {
    setFilterData({
      ...filterData,
      categoryId: Number(catID),
      cityId : Number(cityID),
      userId: Number(userID) ?? "",
    });
  }, [catID]);

  const { pathname } = location;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getFilterSortParams = (value) => {
    setSortType(value);
  };

  useEffect(() => {
    if (categories && categories.sub && categories.sub.length > 0) {
      setMergeCat([...categories.sub]);
    }
  }, [categories, catID]);

  useEffect(() => {
    if (sortType) {
      if (sortType === "priceHighToLow") {
        const sort = [...allProducts?.value].sort((a, b) => a.price - b.price);
        setSortedData(sort);
      } else {
        const sort = [...allProducts?.value].sort((a, b) => b.price - a.price);
        setSortedData(sort);
      }
    } else {
      setSortedData(allProducts.value);
    }
  }, [sortType, allProducts]);

  const getFilterParams = (data) => {
    setFilterData(data);
    if (data.categoryId === 0) {
      push("/product-list");
    } else {
      push(`/product-list?catId=${data.categoryId}`);
    }

    setShowFilter(false);
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Bazariyya | Hayvan Listesi</title>
        <meta
          name="description"
          content="Shop page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Anasafya
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Tüm Ürünler
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                {/* shop sidebar */}
                <button
                  className="text-center filter-btn"
                  style={{
                    background: "#a749ff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "5px 30px",
                    color: "#fff",
                  }}
                  onClick={() => setShowFilter(!showFilter)}
                >
                  Filtrele
                </button>

                <div className={`side-bar ${showFilter ? "active" : ""}`}>
                  <button
                    className="filter-btn "
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "10px",
                      border: "none",
                    }}
                    onClick={() => setShowFilter(false)}
                  >
                    X
                  </button>
                  <FilterPanel
                    categories={mergeCat}
                    sideSpaceClass="mr-30"
                    getFilterParams={(value) => getFilterParams(value)}
                    filterData={filterData}
                  />
                </div>
              </div>
              <div className="col-lg-9">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={(e) => getFilterSortParams(e)}
                />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={sortedData} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={allProducts ? 0: allProducts?.itemCount}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ShopGridStandard.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return { categories: state.categories };
};

export default connect(mapStateToProps)(ShopGridStandard);
