import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as authActions from "../store/actions/auth";
import * as chatActions from "../store/actions/chat";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const Onlineusers = ({ navigation }) => {
  const online_users = useSelector((state) => state.chat.online_users);
  const dispatch = useDispatch();
  useEffect(()=>{
  dispatch(chatActions.isdrawer_open(false))
  })
  const renderListItem = (itemData) => {
    return (
      <View style={styles.userinput}>
        <Text style={styles.textonilne}>{itemData.item}</Text>
        <Text style={styles.onlinetext}>ONILNE</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={online_users}
        renderItem={renderListItem.bind(this)}
      />
    </View>
  );
};

export default Onlineusers;

const styles = StyleSheet.create({
  userinput: {
    height: 60,
    margin: 10,
    alignItems: "center",
    paddingLeft: 15,
    flexDirection: "row",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 10,
    position: "relative",
  },
  container: {
    flex: 1,
  },
  textonilne: {
    fontSize: 18,
    color: "#0084ff",
  },
  onlinetext: {
    marginRight: 2,
    fontSize: 18,
    position: "absolute",
    color: "green",
    right: "5%",
  },
});
export const screenOptions = (navData) => {
 
 const dispatch = useDispatch();
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={"arrow-back-circle-outline"}
          onPress={() => {
           dispatch(chatActions.isdrawer_open(true))
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
    
    
  };
};