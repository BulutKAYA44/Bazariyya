/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import ImageUploader from "react-images-upload";
import React, { Fragment, useContext, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../layouts/LayoutOne";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import { useToasts } from "react-toast-notifications";
import { useFormik } from "formik";
import { tryCatch } from "@thalesrc/js-utils";
import { LoadingContext } from "../context/Loading";
import { useFetch } from "../hooks/use-fetch";
import {
  getCityes,
  getDistricts,
  getProductAttributeDefinitions,
  getProductAttributeValues,
  addProduct,
  uploadProductImage,
} from "../services/product";
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";

const RenderDropdown = ({ item, handleChange }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [, res] = await tryCatch(
        getProductAttributeValues({
          pageCount: 0,
          pageIndex: 0,
          productAttributeDefinitionCategoryId: item.productAttributeDefinitionCategoryId,
        })
      );

      await setData(res.value);
    }
    fetchData();
  }, []);

  return (
    <div className="billing-info">
      <label id={item.id}>{item.header}</label>
      <select
        htmlFor={item.id}
        onChange={(e) => handleChange(e, item)}
        name={item.header}
      >
        <option value="">Seçiniz</option>

        {data?.map((i, index) => {
          return (
            <option key={index} value={i.value}>
              {i.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const AddProductComp = ({ location, categories }) => {
  const { push } = useHistory();
  const { pathname } = location;
  const { addToast } = useToasts();
  const { showLoading, hideLoading, setLoading } = useContext(LoadingContext);
  const { user } = useContext(UserContext);
  const [images, setImages] = useState([]);

  const isFormFieldValid = (name) => !!formik.errors[name];
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      categoryId: 0,
      price: "",
      // quantity: "",
      isActive: true,
      userId: user && user.id,
      productAttributes: [],
      address: {
        addressName: "",
        addressText: "",
        countryId: 2,
        cityId: "",
        districtId: "",
      },
    },
    validate: (formData) => {
      let errors = {};
      if (!formData.name) {
        errors.name = "Boş Bırakılamaz";
      }

      if (!formData.price) {
        errors.price = "Boş Bırakılamaz";
      }

      if (!formData.quantity) {
        errors.quantity = "Boş Bırakılamaz";
      }

      if (!formData.address.addressName) {
        errors["address.addressName"] = "Boş Bırakılamaz";
      }

      if (!formData.address.addressText) {
        errors["address.addressText"] = "Boş Bırakılamaz";
      }

      if (!formData.address.cityId) {
        errors["address.cityId"] = "Boş Bırakılamaz";
      }

      if (!formData.address.districtId) {
        errors["address.districtId"] = "Boş Bırakılamaz";
      }

      if (formData.categoryId === 0) {
        errors.categoryId = "Boş Bırakılamaz";
      }

      return errors;
    },
    onSubmit: async (data) => {
      showLoading();
      if (images.length === 0) {
        addToast("Lütfen görsel ekleyin", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        hideLoading();
        return;
      }

      var errorAttribute = "";
      for(var index = 0 ; index < productAttribute.value.length; index++)
      {
        var attr = productAttribute.value[index];

        console.log(attr);
        if(attr.mandatory === "false")
          continue;

          const findAttr = data.productAttributes.findIndex(
            (i) => i.productAttributeDefinitionCategoryId === attr.productAttributeDefinitionCategoryId
          );
  
          if (findAttr !== -1) {
            if(data.productAttributes[findAttr].value === "")
            {
              errorAttribute = attr.header + " Boş olamaz";
              break;
            }
          }
          else {
            errorAttribute = attr.header + " Boş olamaz";
            break;
          }
      }

      if(errorAttribute !== "")
      {
        addToast(errorAttribute, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        hideLoading();
        return;
      }

      const converPayload = {
        ...data,
        categoryId: Number(data.categoryId),
        userId: user?.id,
        address: {
          ...data.address,
          cityId: Number(data.address.cityId),
          districtId: Number(data.address.districtId),
        },
      };
      const [err, res] = await tryCatch(addProduct(converPayload));

      if (err) {
        hideLoading();
        addToast(err.message, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        return;
      }

      if (res.isSuccess) {
        const imagesFormData = new FormData();

        images.forEach((file) => {
          imagesFormData.append("file", file);
        });

        const [errImg] = await tryCatch(
          uploadProductImage(
            {
              productId: res.value,
              isActive: true,
              isShowCase: true,
            },
            imagesFormData
          )
        );

        if (errImg) {
          addToast(errImg.message || "Görseller yüklenirken hata oluştu.", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          hideLoading();
          return;
        }

        addToast("Kayıt Başarılı", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });

        push(`/product-list?userId=${user?.id}`);
        formik.resetForm();
      } else {
        addToast(res.message, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      }
      hideLoading();
    },
  });

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
      setLoading,
    }
  );

  const [districts] = useFetch(
    () =>
      formik.values.address.cityId
        ? getDistricts({
            pageCount: 0,
            pageIndex: 0,
            id: 0,
            cityId: Number(formik.values.address.cityId),
          })
        : {},
    [],
    {
      setLoading,
      reloadDeps: [formik.values.address.cityId],
      deps: [formik.values.address.cityId],
    }
  );

  const [productAttribute] = useFetch(
    () =>
      getProductAttributeDefinitions({
        pageCount: 0,
        pageIndex: 0,
        categoryId: Number(formik.values.categoryId),
      }),
    [],
    {
      setLoading,
      reloadDeps: [formik.values.categoryId],
      deps: [formik.values.categoryId],
    }
  );

  const handleChange = (e, item) => {
    const copyProductAttributes = [...formik.values.productAttributes];
    const findAttr = copyProductAttributes.findIndex(
      (i) => i.productAttributeDefinitionCategoryId === item.productAttributeDefinitionCategoryId
    );
    try{

      if (findAttr !== -1) {
        copyProductAttributes[findAttr].value = e.target.value;
      } else {
        copyProductAttributes.push({
          productAttributeDefinitionCategoryId: item.productAttributeDefinitionCategoryId,
          value: e.target.value,
        });
      }
      
      formik.setFieldValue("productAttributes", copyProductAttributes);

    }catch(err)
    {
      console.log(copyProductAttributes);
      console.log(err);
    }
  };

  const onDrop = (pictureFiles, pictureDataURLs) => {
    setImages(pictureFiles);
  };

  const renderInput = (item) => {
    switch (item.attributeTypeStr) {
      case "Numeric":
        return (
          <div className="billing-info">
            <label id={item.id}>{item.header}</label>
            <input
              required="required"
              htmlFor={item.id}
              type="number"
              name={item.header}
              value={formik.values.productAttributes[item.productAttributeDefinitionCategoryId]?.value}
              onChange={(e) => handleChange(e, item)}
            />

            {item.mandatory && getFormErrorMessage()}
          </div>
        );
      case "TrueFalse":
      case "Combo":
        return <RenderDropdown item={item} handleChange={handleChange} />;
      case "Text":
        return (
          <div className="billing-info">
            <label>{item.header}</label>
            <input
              type="text"
              name={item.header}
              value={formik.values.productAttributes[item.productAttributeDefinitionCategoryId]?.value}
              onChange={(e) => handleChange(e, item)}
            />
          </div>
        );

      case "Description":
        return (
          <div className="billing-info">
            <label>{item.header}</label>
            <textarea
              name={item.header}
              value={formik.values.productAttributes[item.productAttributeDefinitionCategoryId]?.value}
              onChange={(e) => handleChange(e, item)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Bazariyya | Ürün Ekle</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Ana Sayfa
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Ürün Ekle
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Genel Bilgiler
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>İlan İsmi</label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                  />
                                  {getFormErrorMessage("name")}
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Fiyat</label>
                                  <input
                                    type="number"
                                    name="price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    min="1"
                                  />
                                  {getFormErrorMessage("price")}
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Ürün Sayısı</label>
                                  <input
                                    type="number"
                                    name="quantity"
                                    value={formik.values.quantity}
                                    onChange={formik.handleChange}
                                    min="1"
                                  />
                                  {getFormErrorMessage("quantity")}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Ürün Bilgileri
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info mb-35">
                                  <label id="cat">Kategori:</label>
                                  <select
                                    htmlFor="cat"
                                    onChange={formik.handleChange}
                                    name="categoryId"
                                  >
                                    <option value="">Seçiniz</option>
                                    {categories?.sub?.map((item) => {
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
                                  {getFormErrorMessage("categoryId")}
                                </div>
                              </div>
                              {productAttribute?.value?.map((item, index) => {
                                return (
                                  <div
                                    className="col-lg-6 col-md-6"
                                    key={item.productAttributeDefinitionCategoryId}
                                  >
                                    {renderInput(item)}
                                  </div>
                                );
                              })}
                              <div className="col-lg-12 col-md-12"></div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span> Adres Bilgileri{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info mb-35">
                                  <label id="city">Şehir:</label>
                                  <select
                                    htmlFor="city"
                                    onChange={formik.handleChange}
                                    value={formik.values.address.cityId}
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
                                  {getFormErrorMessage("address.cityId")}
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info mb-35">
                                  <label id="city">İlçe:</label>
                                  <select
                                    htmlFor="city"
                                    onChange={formik.handleChange}
                                    value={formik.values.address.districtId}
                                    name="address.districtId"
                                  >
                                    <option value="">Seçiniz</option>
                                    {districts?.value?.map((item) => {
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
                                  {getFormErrorMessage("address.districtId")}
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Adres İsmi</label>
                                  <input
                                    type="text"
                                    name="address.addressName"
                                    value={formik.values.address.addressName}
                                    onChange={formik.handleChange}
                                  />
                                  {getFormErrorMessage("address.addressName")}
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Adres Metin</label>
                                  <input
                                    type="text"
                                    name="address.addressText"
                                    value={formik.values.address.addressText}
                                    onChange={formik.handleChange}
                                  />
                                  {getFormErrorMessage("address.addressText")}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="3">
                          <h3 className="panel-title">
                            <span>4 .</span> Görsel Yükle
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse variant="link" eventKey="3">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="row">
                              <ImageUploader
                                withIcon={true}
                                buttonText="Görsel Seç"
                                onChange={(pictureFiles, pictureDataURLs) =>
                                  onDrop(pictureFiles, pictureDataURLs)
                                }
                                imgExtension={[".jpg", ".png", "jpeg"]}
                                maxFileSize={5242880}
                                withPreview={true}
                              />
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                  <div className="d-flex justify-content-center">
                    <button
                      className="text-center"
                      style={{
                        background: "#a749ff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "5px 30px",
                        color: "#fff",
                      }}
                      onClick={() => formik.handleSubmit()}
                    >
                      Kaydet ve Çık
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

AddProductComp.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return { categories: state.categories };
};

export default connect(mapStateToProps)(AddProductComp);