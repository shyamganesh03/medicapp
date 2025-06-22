import { getAuth } from "@react-native-firebase/auth";

export async function getAuthToken() {
  const auth = getAuth().currentUser;
  const accessToken = await auth?.getIdToken();
  return `Bearer ${accessToken}`;
}
