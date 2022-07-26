import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Main from "./Main";
import NeedToGo from "./NeedToGo";
import Settings from "./Settings";
import SplashScreen from "./SplashScreen";
import { Provider } from "react-redux";
import { Store } from "../src/redux/store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ header: () => null }}>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
