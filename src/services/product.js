import { tryCatch } from "@thalesrc/js-utils";
import http from "./http";
import {
  ADD_PRODUCT_URL,
  GET_CATEGORIES_URL,
  GET_CITYES,
  GET_DISTRICTS,
  GET_PRODUCTS_URL,
  GET_PRODUCT_ATTRIBUTE_DEFINITIONS_URL,
  GET_PRODUCT_ATTRIBUTE_VALUES_URL,
  HOME_PRODUCT_URL,
  PRODUCT_URL,
  UPLOAD_IMAGE_URL,
} from "../utils/url";
import { pathWithQueryString } from "../helpers/pathWithQueryString";

let config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export async function getHomeProducts() {
  const [error, result] = await tryCatch(http.post(HOME_PRODUCT_URL));
  if (error) throw error;

  return result.data;
}

export async function productDetail(id) {
  const [error, result] = await tryCatch(http.get(`${PRODUCT_URL}/${id}`));
  if (error) throw error;

  return result.data;
}

export async function getProducts(payload) {
 
   console.log(payload);
  const [error, result] = await tryCatch(http.post(GET_PRODUCTS_URL, payload));
  if (error){
    console.log(error);
    throw error;
  } 

  return result.data;
}

export async function getAllCategories(payload) {
  const [error, result] = await tryCatch(
    http.post(GET_CATEGORIES_URL, payload)
  );
  if (error) throw error;

  return result.data;
}

export async function getProductAttributeDefinitions(payload) {
  const [error, result] = await tryCatch(
    http.post(GET_PRODUCT_ATTRIBUTE_DEFINITIONS_URL, payload)
  );
  if (error) throw error;

  return result.data;
}

export async function getProductAttributeValues(payload) {
  const [error, result] = await tryCatch(
    http.post(GET_PRODUCT_ATTRIBUTE_VALUES_URL, payload)
  );
  if (error) throw error;

  return result.data;
}

export async function getCityes(payload) {
  const [error, result] = await tryCatch(http.post(GET_CITYES, payload));
  if (error) throw error;

  return result.data;
}

export async function getDistricts(payload) {
  const [error, result] = await tryCatch(http.post(GET_DISTRICTS, payload));
  if (error) throw error;

  return result.data;
}

export async function addProduct(payload) {
  const [error, result] = await tryCatch(http.post(ADD_PRODUCT_URL, payload));
  if (error) throw error;

  return result.data;
}

export async function uploadProductImage(payload, formData) {
  const url = pathWithQueryString(UPLOAD_IMAGE_URL, payload);
  
  const [error, result] = await tryCatch(http.post(url, formData, config));
  if (error) throw error;

  return result.data;
}
