import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";

import {
  getUsuarioInfo,
  getClave,
  getMail,
  getImg,
  getNombre,
  logout,
} from "../../api/auth";
import FONTS from "../../components/util/Fonts";
import COLORS from "../../components/util/Colors";
import Layout from "../../components/Layout";
import ButtomComponent from "../../components/ButtomComponent";

const PerfilScreen = ({ navigation }: any) => {
  const [cuenta, setCuenta] = useState<string>("");
  const [usuario, setusuario] = useState([]);
  const [mail, setMail] = useState<string>("");
  const [foto, setFoto] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");

  const userInfo = async () => {
    const data = await getUsuarioInfo();
    setusuario(data.usuario);
    setCuenta(await getClave());
    setMail(await getMail());
    setNombre(await getNombre());
    setFoto(await getImg());
  };

  const createLogoutAlert = () => {
    Alert.alert("Cerrar sessión", "Si deseas finalizar la sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      { text: "OK", onPress: createLogout },
    ]);
  };

  const createLogout = async () => {
    const data = await logout();
    if (data) {
      navigation.push("BottomNavigate");
    }
  };

  useEffect(() => {
    userInfo();
  }, []);

  const base64Logo = "https://www.bootdey.com/image/280x280/7B68EE/000000";

  return (
    <Layout>
      <ImageBackground
        source={require("../../../assets/opcion5/index.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.headerContainer}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profilePhoto}
              source={{ uri: foto ? foto : base64Logo }}
            />
            <Text style={[FONTS.body, { textAlign: "center" }]}>{nombre}</Text>
            <Text style={[FONTS.desc, { textAlign: "center" }]}>{mail}</Text>
            <Text style={[FONTS.body, { textAlign: "center" }]}>{cuenta}</Text>
          </View>
        </View>

        <ButtomComponent
          onPress={() => navigation.navigate("CardScreen")}
          type={"primaryRR"}
          size={"large"}
          label={"Credencial digital"}
          rounded={"small"}
        />

        <ButtomComponent
          onPress={createLogoutAlert}
          type={"primaryRR"}
          size={"large"}
          label={"Cerrar sesión"}
          rounded={"small"}
        />
      </ImageBackground>
    </Layout>
  );
};

const styles = StyleSheet.create({
  /***uno */
  headerContainer: {
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
export default PerfilScreen;
