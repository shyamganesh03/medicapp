import firestore from "@react-native-firebase/firestore";

const useFireBase = () => {
  const usersCollection = firestore().collection("Users");

  const createNewUser = async (userDetails: any) => {
    const result = await usersCollection
      .doc(userDetails?.id)
      .set(userDetails)
      .catch((error) => {
        console.log("error on create new user: ", userDetails);
      });
    return result;
  };

  const getCurrentUserDetails = async (userID: string) => {
    const result = await usersCollection.doc(userID).get();
    return { result };
  };
  return { createNewUser };
};

export default useFireBase;
