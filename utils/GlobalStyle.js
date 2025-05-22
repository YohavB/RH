import { StyleSheet } from "react-native";

// Define common colors and gradients for reuse
export const Colors = {
  orange: '#FF9E4E',
  pinkish: '#ED726B',
  white: '#FFFFFF',
  blue: '#2169B6',
  mainOrange: '#F5855F', // Main app color
};

export const Gradients = {
  orangeToPink: {
    colors: [Colors.orange, Colors.pinkish],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1.09 },
  },
};

export default StyleSheet.create({
  MainContainer: {
    // borderColor: "yellow",
    // borderWidth: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#2169B6",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
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
  InputLittlePlate: {
    borderWidth: 1,
    width: 50,
    height: 10,
    textAlign: "center",
    fontSize: 8,
    fontWeight: "bold",
    borderColor: "transparent",
  },
  Pressable: {
    backgroundColor: "#fff",
    width: 250,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  BlockingButton: {
    backgroundColor: "#fff",
    width: 150,
    height: 50,
    borderRadius: 15,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  Settings: {
    zIndex: 2,
    position: "absolute",
    left: "88%",
    top: "5%",
    width: 50,
  },
  SettingButton: {
    width: 40,
    height: 40,
  },
  Title: { fontSize: 60, textAlign: "center" },
  Text: {
    fontSize: 20,
    margin: 20,
    textAlign: "center",
  },
  ButtonText: {
    fontSize: 25,
  },
  Plate: {
    position: "absolute",
    zIndex: -1,
    width: 300,
    height: 50,
  },
  LittlePlate: {
    position: "absolute",
    zIndex: -1,
    width: 50,
    height: 10,
    right: 2,
  },
  ContainerCars: {
    width: "100%",
    height: "80%",
  },
  ContainerCar: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
  },
  ContainerCarPicture: {
    flex: 1,
    height: "70%",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
  },
  Car: {
    width: 50,
    height: 110,
  },
  ContainerActionMain: {
    flex: 5,
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  
  // Splash Screen Styles
  SplashContainer: {
    flex: 1,
    width: '100%',
  },
  SplashContentContainer: {
    flex: 1,
    paddingTop: 300,
    paddingLeft: 107,
    paddingRight: 105,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 28,
  },
  SplashTitle: {
    fontSize: 64,
    fontWeight: '600',
    color: 'white',
  },
  SplashLogoContainer: {
    alignItems: 'center',
    marginBottom: 200,
  },
  SplashTopRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  SplashBottomRow: {
    alignItems: 'center',
  },
  SplashRectangle: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 4,
  }
});
