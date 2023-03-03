import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PerfilScreen from "../screens/perfilscreen/PerfilScreen";
import CardScreen from "../screens/perfilscreen/CardScreen";

const Stack = createNativeStackNavigator();

const ProfileNavigate = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PerfilScreen" component={PerfilScreen} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "modal",
          headerShown: false,
        }}
      >
        <Stack.Screen name="CardScreen" component={CardScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ProfileNavigate;
