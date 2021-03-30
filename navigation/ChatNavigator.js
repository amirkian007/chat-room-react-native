import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import chatroom from "../screens/chatroom";
import { Ionicons } from "@expo/vector-icons";
import * as authActions from "../store/actions/auth";
import onlineusers from "../screens/onlineusers";
import { screenOptions as chatroomScreenOptions } from "../screens/chatroom";
import { screenOptions as onlineuserScreenOptions } from "../screens/onlineusers";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
} from "react-native-paper";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: "#465881",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: "#465881",
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = (props) => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="chatroom"
        component={chatroom}
        options={chatroomScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="onlineusers"
        component={onlineusers}
        options={onlineuserScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.chat.socket);
  const name = useSelector((state) => state.auth.name);
  const email = useSelector((state) => state.auth.email);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Icon 
            icon="account"
            size={50}
          />
          <View style={{ marginLeft: 15, flexDirection: "column" }}>
            <Title style={styles.title}>{name}</Title>
            <Caption style={styles.caption}>{email}</Caption>
          </View>
        </View>
      </View>

      <DrawerItemList {...props} />
      <DrawerItem
        label="Online users"
        icon={({ focused, color, size }) => (
          <Ionicons
          name="md-home"
          size={size}
          color={focused ? "#7cc" : "#ccc"}
        />
        )}
        onPress={() => {
          props.navigation.navigate('chatroom', { screen: 'onlineusers' });
        }}
      />
      <DrawerItem
        label="LOG OUT"
        icon={({ focused, color, size }) => (
          <Ionicons
            color={focused ? "rgba(255, 16, 0,0.6)" : "rgba(255, 16, 0,0.6)"}
            size={size}
            name={"power-outline"}
          />
        )}
        onPress={() => {
          dispatch(authActions.logout());
          socket.disconnect()
        }}
        labelStyle={{ color: "rgba(255, 16, 0,0.6)" }}
      />
    </DrawerContentScrollView>
  );
}

export default function ChatNavigator() {
  const isopen = useSelector((state) => state.chat.isdrawer_open);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{
          gestureEnabled: isopen,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-home"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
        name="chatroom"
        component={AdminNavigator}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({

  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
 
});
