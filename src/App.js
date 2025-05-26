import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StatusBar } from "react-native";
import Login from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import Settings from "./screens/SettingsScreen";
import SplashScreen from "./screens/SplashScreen";
import AddCarScreen from "./screens/AddCarScreen";
import PlateRecognitionScreen from "./screens/PlateRecognitionScreen";
import CarConfirmationScreen from "./screens/CarConfirmationScreen";
import { ScreenNames } from "./classes/RHClasses";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import GlobalStyle, { Colors } from "./styles/GlobalStyle";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const Stack = createStackNavigator();

// Default navigation theme with a white background
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
              name={ScreenNames.SPLASH}
              component={SplashScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name={ScreenNames.LOGIN}
              component={Login}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name={ScreenNames.ADD_CAR}
              component={AddCarScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name={ScreenNames.PLATE_RECOGNITION}
              component={PlateRecognitionScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name={ScreenNames.CAR_CONFIRMATION}
              component={CarConfirmationScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name={ScreenNames.MAIN}
              component={MainScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name={ScreenNames.SETTINGS}
              component={Settings}
              options={{ gestureEnabled: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
