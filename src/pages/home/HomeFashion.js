import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import ProductGrid from "../../wrappers/product/ProductGrid";
import SectionTitle from "../../components/section-title/SectionTitle";
import Categories from "../../components/categories";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const HomeFashion = ({categories}) => {
  const { push } = useHistory();

  return (
    <Fragment>
      <MetaTags>
        <title>Bazariyya Anasayfa</title>
        <meta
          name="description"
          content="Bazariyya Anasayfa"
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* tab product */}
        {/* <TabProduct spaceBottomClass="pb-60" category="fashion" /> */}
        <div className="container mt-3">
          <button
            className="text-center"
            style={{
              backgroundColor: "#a749ff",
              border: "none",
              borderRadius: "8px",
              padding: "5px 30px",
              color: "#fff",
              display:"none"
            }}
            onClick={() => push("/add-product")}
          >
            Kayısınızı Satın
          </button>
          <SectionTitle
            titleText="Kategoriler"
            positionClass="text-center"
            spaceClass="mt-50"
          />
          <Categories categories={categories} />

          <SectionTitle
            titleText="En Son Eklenenler"
            positionClass="text-center"
            spaceClass="mb-50"
          />
          <div className="row">
            <ProductGrid type="new" limit={8} spaceBottomClass="mb-25" />
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(HomeFashion);
