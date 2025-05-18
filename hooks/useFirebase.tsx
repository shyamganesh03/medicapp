import firestore from "@react-native-firebase/firestore";

const useFireBase = () => {
  const usersCollection = firestore().collection("Users");

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

  return { createNewUser, getCurrentUserDetails };
};

export default useFireBase;
