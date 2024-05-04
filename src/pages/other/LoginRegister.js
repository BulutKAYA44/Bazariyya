import PropTypes from "prop-types";
import { useFormik } from "formik";
import { tryCatch } from "@thalesrc/js-utils";
import React, { Fragment, useContext } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { registerUser } from "../../services/auth";
import { useToasts } from "react-toast-notifications";
import { UserContext } from "../../context/UserContext";
import { LoadingContext } from "../../context/Loading";

const LoginRegister = ({ location }) => {
  const { pathname } = location;
  const { addToast } = useToasts();
  const { login } = useContext(UserContext);
  const { showLoading, hideLoading } = useContext(LoadingContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      isActive: true,
      phone: "",
    },
    onSubmit: async (data) => {
      showLoading();
      const [err, res] = await tryCatch(registerUser(data));

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
        addToast("Kayıt Başarılı", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
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

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data) => {
      await login(data);

      // if (err) {
      //   addToast(err.message, {
      //     appearance: "error",
      //     autoDismiss: true,
      //     autoDismissTimeout: 3000,
      //   });
      //   return;
      // }

      // if (res.isSuccess) {
      //   addToast("Giriş Başarılı", {
      //     appearance: "success",
      //     autoDismiss: true,
      //     autoDismissTimeout: 3000,
      //   });
      //   formik.resetForm();
      // }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    formikLogin.handleSubmit();
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Bazariyya Giriş</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Anasayfa
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Giriş Yap - Kayıt Ol
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Giriş Yap</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Kayıt Ol</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="email"
                                placeholder="E-posta"
                                value={formikLogin.values.email}
                                onChange={formikLogin.handleChange}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Parola"
                                value={formikLogin.values.password}
                                onChange={formikLogin.handleChange}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Beni Hatırla</label>
                                  {/* <Link to={process.env.PUBLIC_URL + "/"}>
                                    Şifremi Unuttum
                                  </Link> */}
                                </div>
                                <button
                                  style={{ width: "100%" }}
                                  type="submit"
                                  onClick={(e) => handleLogin(e)}
                                >
                                  <span>Giriş Yap</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="name"
                                placeholder="Ad"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                              />
                              <input
                                type="text"
                                name="surname"
                                placeholder="Soyad"
                                value={formik.values.surname}
                                onChange={formik.handleChange}
                              />
                              <input
                                type="text"
                                name="country"
                                placeholder="Ülke"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Parola"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                              />
                              <input
                                name="email"
                                placeholder="E-posta"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                              />
                              <input
                                type="numeric"
                                name="phone"
                                placeholder="Telefon Numarası"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                maxLength="10"
                              />
                              <div className="button-box">
                                <button
                                  type="submit"
                                  onClick={(e) => handleSubmit(e)}
                                >
                                  <span>Kayıt Ol</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
};

export default LoginRegister;
