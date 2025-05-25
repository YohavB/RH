import { StyleSheet } from 'react-native';
import { Colors } from './GlobalStyle';

export default StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.blue,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 1,
    borderColor: "#FF0000", // Red
  },
  containerCars: {
    width: "100%",
    height: "80%",
    borderWidth: 1,
    borderColor: "#00FF00", // Green
  },
  containerCar: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    borderWidth: 1,
    borderColor: "#0000FF", // Blue
  },
  containerCarPicture: {
    flex: 1,
    height: "70%",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFFF00", // Yellow
  },
  car: {
    width: 50,
    height: 110,
    borderWidth: 1,
    borderColor: "#FF00FF", // Magenta
  },
  containerActionMain: {
    flex: 5,
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00FFFF", // Cyan
  },
  plate: {
    position: "absolute",
    zIndex: -1,
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#FFA500", // Orange
  },
  littlePlate: {
    position: "absolute",
    zIndex: -1,
    width: 50,
    height: 10,
    right: 2,
    borderWidth: 1,
    borderColor: "#800080", // Purple
  },
  blockingButton: {
    backgroundColor: "#fff",
    width: 150,
    height: 50,
    borderRadius: 15,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#008000", // Dark Green
  },
  settings: {
    zIndex: 2,
    position: "absolute",
    left: "88%",
    top: "5%",
    width: 50,
    borderWidth: 1,
    borderColor: "#FF4500", // OrangeRed
  },
  settingButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#4B0082", // Indigo
  },
}); 