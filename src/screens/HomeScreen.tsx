import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";

import Layout from "../components/Layout";
import COLORS from "../components/util/Colors";
import LocationScreen from "./screen/LocationScreen";

const HomeScreen = () => {
  return (
    <Layout>
      <ImageBackground
        source={require("../../assets/opcion5/index.png")}
        style={styles.backgroundImage}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentHeader}>
          <Image
              style={styles.profilePhoto}
              source={require("../../assets/iconos/icono_b.png")}
            />
          </View>

          <LocationScreen />
        </ScrollView>
      </ImageBackground>
    </Layout>
  );
};

const styles = StyleSheet.create({
  profilePhoto:{
    width: "110%",
    height: 125,
    resizeMode: "contain"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  contentHeader: {
    margin: 20,
  },
  btn: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 2,
    //backgroundColor: "transparent",
    backgroundColor: COLORS.grayT0_3,
    borderRadius: 10,
    padding: 10,
  },
  bodyContent: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  coverPhoto: {
    width: "100%",
    height: 180,
  },
});

export default HomeScreen;
