import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { RootDrawerParamList } from "./types";

import TabNavigator from "./TabNavigator";
import StackNavigator from "./StackNavigator";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

function MainNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Stack" component={StackNavigator} />
      <Drawer.Screen name="Tabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

export default MainNavigator;
