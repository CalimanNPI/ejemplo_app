import { StyleSheet, TextInput, View } from "react-native";
import COLORS from "./util/Colors";
import FONTS from "./util/Fonts";

const InputComponentBorder = ({
  onChangeText,
  placeholder,
  keyboardType,
  value,
}: any) => {
  return (
    <View style={styles.inputContainer}>
      {/*<Text style={FONTS.desc}>{placeholder}</Text>*/}
      <TextInput
        style={[styles.inputs, FONTS.desc]}
        keyboardType={keyboardType}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  inputs: {
    height: 45,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.grayT0_3,
    color: COLORS.gray,
    paddingLeft: 10,
    backgroundColor: COLORS.white,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
});

export default InputComponentBorder;
