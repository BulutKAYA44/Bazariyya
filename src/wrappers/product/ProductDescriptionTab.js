import PropTypes from "prop-types";
import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

const ProductDescriptionTab = ({
  spaceBottomClass,
  productFullDesc,
  productAttributes,
}) => {
  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="additionalInfo">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">Ek Bilgiler</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Açıklama</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    {productAttributes &&
                      productAttributes
                        .filter(
                          (item) => item.productAttributeDefinitionCategoryId !== 32
                        )
                        .map((item, index) => {
                          return (
                            <li key={index}>
                              <span>{item.header} :</span> {item.value}
                            </li>
                          );
                        })}
                  </ul>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {console.log(productAttributes)}
                {productAttributes &&
                  productAttributes.find(
                    (item) => item.productAttributeDefinitionId === 32
                  )?.value}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductDescriptionTab;
