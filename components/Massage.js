import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";

const CustomHeaderButton =props=> {

  const prettyDate2 = (time) =>{
    var date = time;
    var localeSpecificTime = date.toLocaleTimeString();
    return localeSpecificTime
      .replace(/:\d+ /, " ")
      .split(":")
      .splice(0, 2)
      .join(":");   
  } 


     
  return (
    <View style={{
      alignItems: props.self ? "flex-end" : "flex-start",
      justifyContent: props.self ? "flex-end" : "flex-start",
      height: "auto",
      flexDirection: "row",
      marginRight: props.self ? 10 : 0,
    }}>
      {!props.self ? (
        <Avatar.Text style={styles.avatar} size={37} label={props.name.split('')[0]+props.name.split('')[1]} />
      ) : null}
      <View style={{ ...styles.cha, ...{ backgroundColor: props.self ? "#0084ff" : "#e3e3e3" } }}>
        {!props.self ? (
          <Text style={{ ...styles.id }}>{props.name}</Text>
        ) : null}
        <Text textBreakStrategy={"highQuality"} style={{ color: props.self ? "white" : "black" }}>
          {props.massage}
        </Text>
        <Text style={{ ...styles.time, ...{ color: props.self ? "white" : "black" } }}>{prettyDate2(props.time)}</Text> 
      </View>
    </View>
  );
};  

const styles = StyleSheet.create({
  hry: {
    height: 110,
    flexDirection: "row",
  },
  avatar: {
    marginLeft: 10,
    marginTop: 10,
  },
  cha: {
    height: "auto",
    maxWidth: "70%",
    marginLeft: 7,
    marginTop: 10,
    padding: 6.5,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  id: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  time: {
    alignSelf: "flex-end",
  },
});
export default CustomHeaderButton;
