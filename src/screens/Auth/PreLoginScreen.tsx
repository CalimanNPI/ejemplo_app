import { View, Image, StyleSheet, ImageBackground } from "react-native";
import Layout from "../../components/Layout";
import ButtomComponent from "../../components/ButtomComponent";

const PreLoginScreen = ({ navigation }: any) => {
  return (
    <Layout>
      <ImageBackground
        source={require("../../../assets/opcion5/pre-index2.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Image
            source={require("../../../assets/iconos/icono.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <ButtomComponent
            onPress={() => navigation.navigate("LoginScreen")}
            type={"primaryRR"}
            size={"large"}
            label={"Iniciar sesión"}
            rounded={"small"}
          />
        </View>
      </ImageBackground>
    </Layout>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  content: {
    flex: 8,
    margin:15, 
    alignItems: "center",
  },
  image: {
    marginTop: 60,
    width: 200,
    height: 100,
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: "row",
    marginHorizontal: 30,
    justifyContent: "space-around",
  },
});

export default PreLoginScreen;
