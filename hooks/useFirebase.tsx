import firestore from "@react-native-firebase/firestore";
import uuid from "react-native-uuid";

const useFireBase = () => {
  const usersCollection = firestore().collection("Users");
  const medicineTypeCollection = firestore().collection("Medicines_Types");
  const medicinesCollection = firestore().collection("Medicines");

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
      const medicinesCollection = limit
        ? medicineTypeCollection.limit(limit)
        : medicineTypeCollection;
      const result = await medicinesCollection.get();
      const medicinesList: any = [];
      result.forEach((doc) => {
        medicinesList.push(doc.data());
      });
      console.log("medicinesList: --> ", medicinesList);
      return medicinesList;
    } catch (error) {
      console.error("Error fetching medicines categories:", error);
      return [];
    }
  };

  const getMedicinesListByCategory = async (category: string) => {
    try {
      const medicinesList = await medicinesCollection
        .where("type", "==", category)
        .get();
      console.log("medicinesList: --> ", medicinesList);
      // return medicinesList;
    } catch (error) {
      console.error("Error fetching medicines categories:", error);
      return [];
    }
  };

  return {
    createNewUser,
    getCurrentUserDetails,
    getMedicinesListByCategory,
    getMedicinesCategoriesList,
    updateUserDetails,
    uploadMedicines,
  };
};

export default useFireBase;
