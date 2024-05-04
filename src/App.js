/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy, useContext } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { UserContextProvider } from "./context/UserContext";
import { LoadingContext, LoadingContextProvider } from "./context/Loading";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PrivateRoute from "./components/PrivateRoute";
import { setCategory } from "./redux/actions/categoryAction";
import { useFetch } from "./hooks/use-fetch";
import { getAllCategories } from "./services/product";
// home pages
const HomeFashion = lazy(() => import("./pages/home/HomeFashion"));
// product pages
const AddProductComp = lazy(() => import("./pages/AddProduct"));
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);
const ProductTabRight = lazy(() =>
  import("./pages/shop-product/ProductTabRight")
);
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = lazy(() =>
  import("./pages/shop-product/ProductFixedImage")
);

// blog pages
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogDetailsStandard = lazy(() =>
  import("./pages/blog/BlogDetailsStandard")
);

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));
const App = (props) => {
  const { setLoading } = useContext(LoadingContext);

  const [allSubCategories] = useFetch(
    () =>
      getAllCategories({
        pageCount: 0,
        pageIndex: 0,
        id: 0,
        categoryId: 0,
        isSubCategoryes: true,
        code: "",
      }),
    [],
    {
      setLoading,
    }
  );

  const [allMainCategories] = useFetch(
    () =>
      getAllCategories({
        pageCount: 0,
        pageIndex: 0,
        id: 0,
        categoryId: 0,
        isSubCategoryes: false,
        code: "",
      }),
    [],
    {
      setLoading,
    }
  );

  useEffect(() => {
    props.dispatch(
      setCategory({ main: allMainCategories.value, sub: allSubCategories.value })
    );
  }, [allMainCategories, allSubCategories]);

  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json"),
        },
      })
    );
  }, [props]);

  return (
    <LoadingContextProvider>
      <ToastProvider placement="bottom-right">
        <UserContextProvider>
          <BreadcrumbsProvider>
            <ScrollToTop>
              <Suspense
                fallback={
                  <div className="flone-preloader-wrapper">
                    <div className="flone-preloader">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                }
              >
                <Switch>
                  <Route
                    exact
                    path={process.env.PUBLIC_URL + "/"}
                    component={HomeFashion}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/home-fashion"}
                    component={HomeFashion}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/product-list"}
                    component={ShopGridStandard}
                  />
                  <PrivateRoute
                    component={AddProductComp}
                    path={process.env.PUBLIC_URL + "/add-product"}
                    exact
                  />

                  {/* Shop product pages */}
                  <Route
                    path={process.env.PUBLIC_URL + "/product/:id"}
                    render={(routeProps) => (
                      <Product
                        {...routeProps}
                        key={routeProps.match.params.id}
                      />
                    )}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/product-tab-left/:id"}
                    component={ProductTabLeft}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/product-tab-right/:id"}
                    component={ProductTabRight}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/product-sticky/:id"}
                    component={ProductSticky}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/product-slider/:id"}
                    component={ProductSlider}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/product-fixed-image/:id"}
                    component={ProductFixedImage}
                  />

                  {/* Blog pages */}
                  <Route
                    path={process.env.PUBLIC_URL + "/blog-standard"}
                    component={BlogStandard}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/blog-no-sidebar"}
                    component={BlogNoSidebar}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/blog-right-sidebar"}
                    component={BlogRightSidebar}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/blog-details-standard"}
                    component={BlogDetailsStandard}
                  />

                  {/* Other pages */}
                  <Route
                    path={process.env.PUBLIC_URL + "/about"}
                    component={About}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/contact"}
                    component={Contact}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/my-account"}
                    component={MyAccount}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/login-register"}
                    component={LoginRegister}
                  />

                  <Route
                    path={process.env.PUBLIC_URL + "/cart"}
                    component={Cart}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/wishlist"}
                    component={Wishlist}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/compare"}
                    component={Compare}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + "/checkout"}
                    component={Checkout}
                  />

                  <Route
                    path={process.env.PUBLIC_URL + "/not-found"}
                    component={NotFound}
                  />

                  <Route exact component={NotFound} />
                </Switch>
              </Suspense>
            </ScrollToTop>
          </BreadcrumbsProvider>
        </UserContextProvider>
      </ToastProvider>
    </LoadingContextProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
