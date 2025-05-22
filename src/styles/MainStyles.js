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
  },
  containerCars: {
    width: "100%",
    height: "80%",
  },
  containerCar: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
  },
  containerCarPicture: {
    flex: 1,
    height: "70%",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
  },
  car: {
    width: 50,
    height: 110,
  },
  containerActionMain: {
    flex: 5,
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  plate: {
    position: "absolute",
    zIndex: -1,
    width: 300,
    height: 50,
  },
  littlePlate: {
    position: "absolute",
    zIndex: -1,
    width: 50,
    height: 10,
    right: 2,
  },
  blockingButton: {
    backgroundColor: "#fff",
    width: 150,
    height: 50,
    borderRadius: 15,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  settings: {
    zIndex: 2,
    position: "absolute",
    left: "88%",
    top: "5%",
    width: 50,
  },
  settingButton: {
    width: 40,
    height: 40,
  },
}); 