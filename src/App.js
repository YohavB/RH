import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StatusBar } from "react-native";
import Login from "./screens/Login";
import Main from "./screens/Main";
import NeedToGo from "./screens/NeedToGo";
import Settings from "./screens/Settings";
import SplashScreen from "./screens/SplashScreen";
import AddCarScreen from "./screens/AddCarScreen";
import PlateRecognitionScreen from "./screens/PlateRecognitionScreen";
import UserCarsScreen from "./screens/UserCarsScreen";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import GlobalStyle, { Colors } from "./styles/GlobalStyle";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator();

// Default navigation theme with white background
const navigationTheme = {
  dark: false,
  colors: {
    primary: Colors.mainOrange,
    background: Colors.background,
    card: Colors.white,
    text: Colors.textDark,
    border: '#E0E0E0',
    notification: Colors.mainOrange,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Return a blank screen or loading indicator while fonts load
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={GlobalStyle.container}>
        <NavigationContainer theme={navigationTheme}>
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
              name="AddCarScreen"
              component={AddCarScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="PlateRecognition"
              component={PlateRecognitionScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="UserCars"
              component={UserCarsScreen}
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
      </View>
    </Provider>
  );
}
