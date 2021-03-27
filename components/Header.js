import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Header = (props) => {
  return (
    <View styles={styles.header}>
      <Text styles={styles.title}>tissssck</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 900,
    paddingTop: "36",
    backgroundColor: "#79CDCD",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "black",
    fontSize: 18,
  },
});
export default Header;
