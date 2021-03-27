import React from "react";
import { View } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "react-native-paper";

const CustomHeaderButton = (props) => {
  return (
    <View>
      <Badge
        style={{
          marginBottom: -7,
        }}
        visible={props.iconName === "people-outline" ? true : false}
      >
        5
      </Badge>
      <HeaderButton
        {...props}
        IconComponent={Ionicons}
        iconSize={29}
        color={"white"}
      />
    </View>
  );
};

export default CustomHeaderButton;
