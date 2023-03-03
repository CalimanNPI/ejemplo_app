import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ButtomComponent from "../../components/ButtomComponent";
import AlertComponent from "../../components/AlertComponent";

import {
  getUsuarioAuth,
  login,
  setTokenAuth,
  setUsuarioAuth,
} from "../../api/auth";
import InputComponentBorder from "../../components/inputComponentBorder";
import { ImageBackground } from "react-native";
import Layout from "../../components/Layout";
import ButtonBackComponent from "../../components/ButtomBackComponent";
import COLORS from "../../components/util/Colors";

const LoginScreen = ({ navigation }: any) => {
  const [disable, setDisable] = useState<boolean>(false);
  const [form, setForm] = useState({ clave: "", email: "", pass: "" });
  const [errro, setErrro] = useState([]);

  const onClickListener = async () => {
    setDisable(true);
    const data = await login(form);

    if (data.data.token) {
      setErrro([]);
      setTokenAuth(form.clave, data.data.token);
      setUsuarioAuth(data.data);
      setForm({ clave: "", email: "", pass: "" });
      navigation.push("BottomNavigate");
    }

    if (data.data.error) {
      setErrro(data.data.error);
    }

    setDisable(false);
  };

  useEffect(() => {
    async () => {
      const data = await getUsuarioAuth();
      const booleanVar = data.valueOf();

      if (booleanVar) navigation.navigate("BottomNavigate");
    };
  });

  const handleChange = (name: any, value: any) =>
    setForm({ ...form, [name]: value });

  return (
    <Layout>
      <ImageBackground
        source={require("../../../assets/opcion5/pre-index2.jpg")}
        style={styles.backgroundImage}
      >
        <ButtonBackComponent onPress={() => navigation.pop()} icon={"left"} />
        <View style={styles.formContainer}>
          <View style={styles.content}>
            {errro.map((value, index) => {
              return (
                <AlertComponent label={value} type={"error"} key={index} />
              );
            })}
            <InputComponentBorder
              placeholder="Correo electrónico"
              keyboardType={"email-address"}
              value={form.email}
              onChangeText={(text: string) => handleChange("email", text)}
            />
            <InputComponentBorder
              placeholder="Clave de usuario"
              keyboardType={"numeric"}
              value={form.clave}
              onChangeText={(text: string) => handleChange("clave", text)}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <ButtomComponent
              onPress={() => onClickListener()}
              type={"primaryRR"}
              size={"large"}
              label={"Iniciar sesión"}
              rounded={"small"}
              disabled={disable}
            />
          </View>
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
  formContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 50,
    marginTop: 150,
    padding: 20,
    borderRadius: 10,
    backgroundColor: COLORS.grayT0_3,
  },
  content: {
    flex: 8,

    justifyContent:"center"
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: "row",
    marginHorizontal: 30,
    justifyContent: "space-around",
  },
});

export default LoginScreen;
