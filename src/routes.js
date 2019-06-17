import { createAppContainer, createStackNavigator } from "react-navigation";
import React from "react";
import { Image } from "react-native";

import New from "./pages/New";
import Feed from "./pages/Feed";

import Logo from "./assets/logo.png";

export default createAppContainer(
  createStackNavigator(
    {
      Feed,
      New
    },
    {
      defaultNavigationOptions: {
        headerTintColor: "#000",
        headerTitle: <Image style={{ marginHorizontal: 20 }} source={Logo} />,
        headerBackTitle: null
      },
      mode: "modal"
    }
  )
);
