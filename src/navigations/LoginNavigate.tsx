import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/Auth/LoginScreen";
import PreLoginScreen from "../screens/Auth/PreLoginScreen";

const Stack = createNativeStackNavigator();

const ProfileNavigate = () => {

  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PreLoginScreen" component={PreLoginScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ProfileNavigate;
