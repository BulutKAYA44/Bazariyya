import PropTypes from "prop-types";
import React, { Fragment, useContext } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useFetch } from "../../hooks/use-fetch";
import { productDetail } from "../../services/product";
import { LoadingContext } from "../../context/Loading";

const Product = ({ location, product }) => {
  const { id } = useParams();
  const { setLoading } = useContext(LoadingContext);

  const { pathname } = location;

  const [detailProduct] = useFetch(() => productDetail(id), {}, { setLoading });

  return (
    <Fragment>
      <MetaTags>
        <title>Bazariyya | Hayvan Bilgileri</title>
        <meta
          name="description"
          content=""
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Anasayfa
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Ürün Detay
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-35"
          spaceBottomClass="pb-35"
          product={detailProduct?.value}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-70"
          productFullDesc={product.fullDescription}
          productAttributes={detailProduct?.value?.productAttributes}
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        />
      </LayoutOne>
    </Fragment>
  );
};

Product.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  return {
    product: state.productData.products.filter(
      (single) => single.id === itemId
    )[0],
  };
};

export default connect(mapStateToProps)(Product);
