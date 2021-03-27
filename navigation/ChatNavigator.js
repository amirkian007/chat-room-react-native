import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Registration from "../screens/Reagisteration";
import chatrrom from "../screens/chatrrom";
import { Ionicons } from "@expo/vector-icons";
import * as authActions from "../store/actions/auth";

import { screenOptions as userProductsScreenOptions } from "../screens/chatrrom";
import { useDispatch } from "react-redux";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: '#465881'
   // backgroundColor: '#f0f0f0'
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

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={chatrrom}
        options={userProductsScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        inactiveBackgroundColor="red"
        label="log out"
        icon={({ focused, color, size }) => (
          <Ionicons
            color={color}
            size={size}
            name={focused ? "heart" : "heart-outline"}
          />
        )}
        onPress={() => {
          dispatch(authActions.logout());
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function ChatNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* <Drawer.Screen name="onlineusers" component={Registration} /> */}
      <Drawer.Screen name="chatrrom" component={AdminNavigator} />
    </Drawer.Navigator>
  );
}
