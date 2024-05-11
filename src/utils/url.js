const BASE_URL = "https://api.bazariyya.com/api";

export const REGISTER_URL = `${BASE_URL}/Account/add-user`;
export const LOGIN_URL = `${BASE_URL}/Account/token`;
export const REFRESH_TOKEN_URL = `${BASE_URL}/Account/refresh-token`;
export const GET_USER_URL = `${BASE_URL}/Account/get-user`;

export const HOME_PRODUCT_URL = `${BASE_URL}/Product/get-showcase-products`;
export const GET_PRODUCTS_URL = `${BASE_URL}/Product/get-products`;
export const ADD_PRODUCT_URL = `${BASE_URL}/Product/add-product`;
export const UPLOAD_IMAGE_URL = `${BASE_URL}/Product/upload-product-image`;
export const PRODUCT_URL = `${BASE_URL}/Product`;
export const GET_CATEGORIES_URL = `${BASE_URL}/Category/get-categories`;

export const GET_PRODUCT_ATTRIBUTE_DEFINITIONS_URL = `${BASE_URL}/Product/get-product-attribute-definitions`;
export const GET_PRODUCT_ATTRIBUTE_VALUES_URL = `${BASE_URL}/Product/get-product-attribute-values`;

export const GET_CITYES = `${BASE_URL}/Address/get-cityes`;
export const GET_DISTRICTS = `${BASE_URL}/Address/get-districts`;
