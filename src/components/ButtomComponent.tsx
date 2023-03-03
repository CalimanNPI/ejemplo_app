import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import COLORS from "./util/Colors";
import Colors from "./util/Colors";
import FONTS from "./util/Fonts";

const SIZES = ["small", "medium", "large"];
const TYPES = [
  "primary",
  "secondary",
  "accent",
  "error",
  "warning",
  "info",
  "success",
  "primaryR",
  "primaryRR",
];
const ROUNDED = ["small", "medium", "large"];

export default function ButtomComponent({
  children,
  onPress,
  type,
  size,
  label,
  rounded,
  disabled,
}: any) {
  const btnSize = SIZES.includes(size) ? size : "small";
  const btnType = TYPES.includes(type) ? type : "primary";
  const btnRound = ROUNDED.includes(rounded) ? rounded : "small";

  const btnStyle = {
    height: 40,
    width: btnSize === "large" ? "100%" : btnSize === "medium" ? "65%" : "35%",

    borderRadius:
      btnRound === "small"
        ? 5
        : btnRound === "medium"
        ? 15
        : btnRound === "large"
        ? 25
        : 35,

    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      btnType === "primary"
        ? Colors.primary
        : btnType === "secondary"
        ? Colors.secondary
        : btnType === "accent"
        ? Colors.accent
        : btnType === "error"
        ? Colors.error
        : btnType === "warning"
        ? Colors.warning
        : btnType === "info"
        ? Colors.info
        : btnType === "primaryR"
        ? Colors.primaryR
        : btnType === "primaryRR"
        ? Colors.primaryRR
        : Colors.primaryB,
  };

  return (
    <TouchableOpacity style={btnStyle} onPress={onPress} disabled={disabled}>
      <Text style={[FONTS.subTitle, { color: COLORS.white, }]}>{label}</Text>
    </TouchableOpacity>
  );
}
