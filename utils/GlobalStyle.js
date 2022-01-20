import { StyleSheet } from "react-native";

export default StyleSheet.create({
  MainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#2169B6",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  Container: {
    width: "100%",
    height: "80%",
    backgroundColor: "#2169B6",
    alignItems: "center",
  },
  Input: {
    borderWidth: 1,
    padding: 10,
    width: 300,
    height: 50,
    borderColor: "#555",
    backgroundColor: "#fff",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
  },
  Pressable: {
    backgroundColor: "#fff",
    width: 250,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Settings: {
    position: "absolute",
    left: "85%",
    top: "-10%",
    width: 50,
  },
  SettingButton: {
    width: 40,
    height: 40,
  },
  Title: { fontSize: 60 },
  Text: { fontSize: 20, margin: 20 },
  ButtonText: {
    fontSize: 25,
  },
  Plate: {
    position: "absolute",
    zIndex: -1,
    width: 300,
    height: 50,
  },
  ContainerCars: {
    width: "100%",
    height: "80%",
    // borderWidth: 5,
    // borderColor: "brown",
  },
  ContainerCar: {
    width: "100%",
    // borderWidth: 1,
    // borderColor: "blue",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
  },
  Car: {
    width: 50,
    height: 110,
  },
});
