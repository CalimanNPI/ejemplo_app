import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "./util/Colors";
import FONTS from "./util/Fonts";

const TYPES = [
  "primary",
  "secondary",
  "accent",
  "error",
  "warning",
  "info",
  "success",
  "primaryR",
];

const AlertComponent = ({ label, type }: any) => {
  const bType = TYPES.includes(type) ? type : "primary";

  const bcolor =
    bType === "primary"
      ? COLORS.primary
      : bType === "secondary"
      ? COLORS.secondary
      : bType === "accent"
      ? COLORS.accent
      : bType === "error"
      ? COLORS.error
      : bType === "warning"
      ? COLORS.warning
      : bType === "info"
      ? COLORS.info
      : bType === "primaryR"
      ? COLORS.primaryR
      : COLORS.success;

  return (
    <View style={[styles.card, { borderColor: bcolor }]}>
      <Text style={[FONTS.desc, {textAlign:"center"}]}>
      <AntDesign name="warning" size={24} color={bcolor} />
        {" "+label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 5
  },
});

export default AlertComponent;
