import React, { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  OpenSans_400Regular,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";

import BottomNavigate from "./BottomNavigate";
import OnboardingScreen from "../screens/OnboardingScreen";
import isAppFirstLaunchedC from "../api/LoadFirst";

const Stack = createStackNavigator();

export default function IndexNavigate() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<boolean | null>(
    null
  );

  const getData = async () => {
    const isData = await isAppFirstLaunchedC();
    setIsAppFirstLaunched(isData);
  };

  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
  });

  useEffect(() => {
    getData();
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    isAppFirstLaunched != null && (
      <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayout}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group screenOptions={{ headerShown: false }}>
              {isAppFirstLaunched && (
                <Stack.Screen
                  name="OnboardingScreen"
                  component={OnboardingScreen}
                />
              )}
              <Stack.Screen name="BottomNavigate" component={BottomNavigate} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    )
  );
}
