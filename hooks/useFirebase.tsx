import firestore from "@react-native-firebase/firestore";
import { useState } from "react";
import uuid from "react-native-uuid";

const useFireBase = () => {
  const usersCollection = firestore().collection("Users");
  const medicineTypeCollection = firestore().collection("Medicines_Types");
  const medicinesCollection = firestore().collection("Medicines");
  const [isFetchingCategoryList, setIsFetchingCategoryList] = useState(false);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [isFetchingMedicinesList, setIsFetchingMedicinesList] = useState(false);
  const [medicinesList, setMedicinesList] = useState<any>([]);
  const [isFetchingMedicinesDetails, setIsFetchingMedicinesDetails] =
    useState(false);
  const [medicinesDetails, setMedicinesDetails] = useState<any>([]);

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
      console.error("Error uploading medicines:", error);
    }
  };

  const createNewUser = async (userDetails: any) => {
    const result = await usersCollection
      .doc(userDetails?.uid)
      .set(userDetails)
      .catch((error) => {
        console.log("error on create new user: ", error);
        return { success: false };
      });
    return result;
  };

  const getCurrentUserDetails = async (userID: string) => {
    const result = await usersCollection.doc(userID).get();
    return { result };
  };

  const updateUserDetails = async (userID: string, userDetails: any) => {
    const result = await usersCollection
      .doc(userID)
      .update(userDetails)
      .then(() => {
        return { success: true };
      })
      .catch((error) => {
        console.log("error on update user details: ", error);
        return { success: false };
      });
    return result;
  };

  const getMedicinesCategoriesList = async ({
    limit = 0,
  }: {
    limit?: number;
  }) => {
    try {
      setIsFetchingCategoryList(true);
      const medicinesCollection = limit
        ? medicineTypeCollection.limit(limit)
        : medicineTypeCollection;
      const result = await medicinesCollection.get();
      const medicinesList: any = [];
      result.forEach((doc) => {
        medicinesList.push(doc.data());
      });
      setIsFetchingCategoryList(false);
      setCategoryList(medicinesList);
    } catch (error) {
      setIsFetchingCategoryList(false);
      console.error("Error fetching medicines categories:", error);
      return [];
    }
  };

  const getMedicinesListByCategory = async (category: string | string[]) => {
    try {
      setIsFetchingMedicinesList(true);
      const medicinesList =
        category === "All"
          ? await medicinesCollection.get()
          : await medicinesCollection.where("type", "==", category).get();
      const finalAArr: any[] = [];
      medicinesList.forEach((doc) => {
        finalAArr.push(doc.data());
      });
      setIsFetchingMedicinesList(false);
      setMedicinesList(finalAArr);
    } catch (error) {
      setIsFetchingMedicinesList(false);
      console.error("Error fetching medicines categories:", error);
    }
  };

  const getMedicineDetails = async (medicineID: string) => {
    try {
      setIsFetchingMedicinesDetails(true);
      const result = await medicinesCollection.doc(medicineID).get();
      setMedicinesDetails(result.data());
      setIsFetchingMedicinesDetails(false);
    } catch (error) {
      setIsFetchingMedicinesDetails(false);
      console.error("Error fetching medicines details:", error);
    }
  };

  return {
    categoryList,
    isFetchingCategoryList,
    isFetchingMedicinesList,
    isFetchingMedicinesDetails,
    medicinesDetails,
    medicinesList,
    createNewUser,
    getCurrentUserDetails,
    getMedicinesCategoriesList,
    getMedicineDetails,
    getMedicinesListByCategory,
    updateUserDetails,
    uploadMedicines,
  };
};

export default useFireBase;
