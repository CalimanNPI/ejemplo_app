import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import CustomQRCode from "react-native-qrcode-svg";
import * as Brightness from "expo-brightness";

import { getCredential } from "../../api/auth";
import COLORS from "../../components/util/Colors";
import FONTS from "../../components/util/Fonts";
import ButtonBackComponent from "../../components/ButtomBackComponent";
import ButtomComponent from "../../components/ButtomComponent";
import Layout from "../../components/Layout";

const CardScreen = ({ navigation }: any) => {
  const [first, setFirst] = useState([]);

  const getCred = async () => {
    const data = await getCredential();
    setFirst(data);
    //console.log(data);

    /* await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );*/
  };

  useEffect(() => {
    getCred();
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === "granted") {
        Brightness.setBrightnessAsync(1);
      }
    })();
  }, []);

  const resetBrightness = async () => {
    navigation.pop();
     await Brightness.restoreSystemBrightnessAsync();
  };

  return (
    <Layout>
      <ButtonBackComponent onPress={resetBrightness} icon={"close"} />
      <PagerView style={styles.viewPager} initialPage={0}>
        {first.map((value, index) => (
          <View style={styles.container} key={index}>
            <View style={styles.content}>
              {value.pago_cred ? (
                <View style={styles.image}>
                  <CustomQRCode value={value.cred} size={250} />
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "column-reverse",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 20,
                  }}
                >
                  <Text
                    style={[
                      FONTS.desc,
                      { color: COLORS.primaryRR, marginHorizontal: 20 },
                    ]}
                  >
                    {"Pase a mostrador y obtenga su credencial digital"}
                  </Text>

                  <View style={{ width: 200 }}>
                    <ButtomComponent
                      onPress={() => getCred()}
                      type={"primaryRR"}
                      size={"large"}
                      label={"Actualizar"}
                      rounded={"small"}
                    />
                  </View>
                </View>
              )}
              <Text style={[FONTS.subTitle, { marginTop: 20 }]}>
                {value.nombre.trim()}
              </Text>
            </View>
          </View>
        ))}
      </PagerView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 39,
  },
});

export default CardScreen;
