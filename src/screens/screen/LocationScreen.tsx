import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { openURL } from "expo-linking";
import * as MailComposer from "expo-mail-composer";

import COLORS from "../../components/util/Colors";
import FONTS from "../../components/util/Fonts";
import CardComponent from "../../components/CardComponent";
const { width, height } = Dimensions.get("window");

const LocationScreen = () => {
  const [status, setStatus] = useState<string>();
  const [origin, setOrigin] = useState({
    latitude: 19.361687934069835,
    longitude: -99.16218744590878,
  });

  const [destination, setDestination] = useState({
    latitude: 19.36169157278851,
    longitude: -99.16182663558192,
  });

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setOrigin(current);
  };

  useEffect(() => {
    getLocationPermission();
  }, []);

  const Onregion = (region: any) => {
    console.log(region);
  };

  const _handleOpenMessenger = () => {
    openURL(
      "https://code.tutsplus.com/es/tutorials/get-started-with-layouts-in-react-native--cms-27418"
    );
  };
  const _handleOpenFacebook = () => {
    openURL("https://www.facebook.com/CentroDeportivoCoyoacanAc");
  };
  const _handleOpenInstagram = () => {
    openURL("https://www.instagram.com/centrodeportivocoyoacan/");
  };
  const _handleOpenYoutube = () => {
    openURL("https://www.youtube.com/user/cdcacOficial");
  };

  const showAlet = (option: any) => {
    Alert.alert("Alerta", "¿Quieres enviar un correo electrónico?", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Si", style: "default", onPress: sendEmail },
    ]);
  };

  const sendEmail = () => {
    let options = {
      subject: "Sending email with attachment",
      recipients: ["carlos.cdms.c@gmail.com"],
      body: "Enter email body here ...",
    };

    let promise = new Promise((resolve, reject) => {
      MailComposer.composeAsync(options)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });

    promise.then(
      (result: any) => setStatus("Status: email " + result.status),
      (error: any) => setStatus("Status: email " + error.status)
    );
  };

  return (
    <>
      <Text style={[FONTS.title, styles.titleContent]}>Contactanos</Text>
      <CardComponent
        children={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <View style={styles.containerText}>
                <AntDesign name="phone" style={styles.icons} />
                <Text style={[FONTS.desc, { color: COLORS.blak }]}>
                  5591830100 ext. 602.
                </Text>
              </View>
              <TouchableOpacity style={styles.containerText} onPress={showAlet}>
                <AntDesign name="mail" style={styles.icons} />
                <Text style={[FONTS.desc, { color: COLORS.blak }]}>
                  contacto@cdcac.com
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.containerText}
                onPress={_handleOpenMessenger}
              >
                <AntDesign name="message1" style={styles.icons} />
                <Text style={[FONTS.desc, { color: COLORS.blak }]}>
                  Messenger
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />

      <Text style={[FONTS.title, styles.titleContent]}>Ubicación</Text>

      <View style={styles.cardMap}>
        <MapView
          initialRegion={{
            latitude: 19.361687934069835,
            longitude: -99.16218744590878,
            latitudeDelta: 0.004245888672006259,
            longitudeDelta: 0.004877261817441081,
          }}
          showsUserLocation={true}
          style={styles.map}
        >
          <Marker
            coordinate={destination}
            draggable
            onDragEnd={(direction) =>
              setOrigin(direction.nativeEvent.coordinate)
            }
          />
        </MapView>
      </View>

      <View style={styles.contentSize}>
        <TouchableOpacity onPress={_handleOpenFacebook} style={styles.btnSize}>
          <Feather name="facebook" size={25} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity onPress={_handleOpenYoutube} style={styles.btnSize}>
          <Feather name="youtube" size={25} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity onPress={_handleOpenInstagram} style={styles.btnSize}>
          <AntDesign name="instagram" size={25} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: 160,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  containerText: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  icons: {
    color: COLORS.primaryRR,
    fontSize: 20,
    marginHorizontal: 20,
  },
  cardMap: {
    width,
    height: 300,
    borderRadius: 20,
    alignItems: "center",
  },
  map: {
    width: "90%",
    height: "90%",
  },

  contentSize: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },

  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: COLORS.grayT0_3,
    borderWidth: 1,
    marginHorizontal: 10,
    backgroundColor: COLORS.primaryRR,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  titleContent: {
    color: COLORS.blak,
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 20,
  },
});

export default LocationScreen;
