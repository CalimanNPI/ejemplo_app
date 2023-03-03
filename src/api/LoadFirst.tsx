import AsyncStorage from "@react-native-async-storage/async-storage";

const isAppFirstLaunchedC = async () => {
  const data = await AsyncStorage.getItem("@isAppFirstLaunched");

  if (data) {
    return false;
  } else {
    await AsyncStorage.setItem("@isAppFirstLaunched", JSON.stringify(false));
    return true;
  }
};

export default isAppFirstLaunchedC;
