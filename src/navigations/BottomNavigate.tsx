import React, { useState, useEffect } from "react";
import {  AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeNavigate from "./HomeNavigate";
import ProfileNavigate from "./ProfileNavigate";
import LoginNavigate from "./LoginNavigate";
import COLORS from "../components/util/Colors";
import { getUsuarioAuth } from "../api/auth";

const Tab = createBottomTabNavigator();

const BottomNavigate = ({ navigation }: any) => {
  const [isLogged, setIsLogged] = useState<boolean>();

  const loadPerfil = async () => {
    const data = await getUsuarioAuth();
    const booleanVar = data.valueOf();

    setIsLogged(booleanVar);
  };

  useEffect(() => {
    loadPerfil();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="ProfileNavigate"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }: any) => {
          if (route.name === "HomeNavigate") {
            return <AntDesign name="home" size={size} color={color} />;
          } else if (route.name === "LoginNavigate") {
            return <AntDesign name="user" size={size} color={color} />;
          } else if (route.name === "ProfileNavigate") {
            return <AntDesign name="user" size={24} color={color} />;
          }
        },
        tabBarActiveTintColor: COLORS.primaryRR,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      {!isLogged && (
        <Tab.Screen name="LoginNavigate" component={LoginNavigate} />
      )}

      {isLogged && (
        <Tab.Screen name="ProfileNavigate" component={ProfileNavigate} />
      )}
      
      <Tab.Screen name="HomeNavigate" component={HomeNavigate} />
    </Tab.Navigator>
  );
};

export default BottomNavigate;
