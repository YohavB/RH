import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Main from "./screens/Main";
import NeedToGo from "./screens/NeedToGo";
import Settings from "./screens/Settings";
import SplashScreen from "./screens/SplashScreen";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
