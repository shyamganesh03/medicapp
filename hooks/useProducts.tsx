import {
  get_categories_list,
  get_product_by_id,
  get_product_list_by_category_id,
} from "@/api/products_api";
import firestore from "@react-native-firebase/firestore";
import { useState } from "react";
import uuid from "react-native-uuid";
import useHandleError from "./useHandleError";

const useProducts = () => {
  const [isFetchingCategoryList, setIsFetchingCategoryList] = useState(false);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [isFetchingMedicinesList, setIsFetchingMedicinesList] = useState(false);
  const [productList, setProductList] = useState<any>([]);
  const [isFetchingMedicinesDetails, setIsFetchingMedicinesDetails] =
    useState(false);
  const [medicinesDetails, setMedicinesDetails] = useState<any>([]);
  const [isFetchingProduct, setIsFetchingProduct] = useState(false);
  const [product, setProduct] = useState<any>([]);

  const { handleError } = useHandleError();

  const uploadMedicines = async () => {
    try {
      const medicinesCollection = firestore().collection("Medicines_Types");
      const medicines: any = ["Gel", "Injection", "Syrup", "Capsule", "Tablet"];

      for (const medicine of medicines) {
        const id = uuid.v4();
        await medicinesCollection.doc(id).set({ name: medicine, id: id });
      }
      console.log("Medicines uploaded successfully.");
    } catch (error) {
      handleError(error);
      console.error("Error uploading medicines:", error);
    }
  };

  const getMedicinesCategoriesList = async ({
    limit = 0,
  }: {
    limit?: number;
  }) => {
    try {
      setIsFetchingCategoryList(true);
      const result = await get_categories_list();
      setIsFetchingCategoryList(false);
      setCategoryList(result);
    } catch (error) {
      setIsFetchingCategoryList(false);
      console.error("Error fetching medicines categories:", error);
      handleError(error);
      return [];
    }
  };

  const getProductsByCategoryId = async (id: string) => {
    try {
      setIsFetchingMedicinesList(true);
      const productList = await get_product_list_by_category_id(id);
      setIsFetchingMedicinesList(false);
      console.log("productList: ", productList);
      setProductList(productList);
    } catch (error) {
      setIsFetchingMedicinesList(false);
      handleError(error);
      console.error("Error fetching medicines categories:", error);
    }
  };

  const getProductDetails = async (productID: string) => {
    try {
      setIsFetchingProduct(true);
      const result = await get_product_by_id(productID);
      setProduct(result);
      setIsFetchingProduct(false);
    } catch (error) {
      setIsFetchingMedicinesDetails(false);
      handleError(error);
      console.error("Error fetching medicines details:", error);
    }
  };

  return {
    categoryList,
    isFetchingCategoryList,
    isFetchingMedicinesDetails,
    isFetchingMedicinesList,
    isFetchingProduct,
    medicinesDetails,
    product,
    productList,
    getMedicinesCategoriesList,
    getProductDetails,
    getProductsByCategoryId,
    uploadMedicines,
  };
};

export default useProducts;
