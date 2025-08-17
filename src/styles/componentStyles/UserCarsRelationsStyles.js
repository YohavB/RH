import { StyleSheet } from "react-native";
import { Colors } from "../GlobalStyle";

export default StyleSheet.create({
  userCarsRelationsContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textDark,
    textAlign: "center",
  },
  userCarsRelationsList: {
    flex: 1,
  },
  userCarsRelationItem: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  userCarSection: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBackground,
  },
  relationSection: {
    marginBottom: 20,
  },
  carListContainer: {
    marginBottom: 16,
  },
  carListTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textDark,
    marginBottom: 12,
  },
  userCarInfoHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  userCarDetailText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textDark,
  },
  carInfoContainer: {
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    borderRadius: 12,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 8,
    position: "relative",
  },
  carIconContainer: {
    position: "absolute",
    left: 10,
    marginRight: 10,
  },
  carDetails: {
    alignItems: "center",
    width: "100%",
  },
  carDetailsText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textDark,
  },
  separatorText: {
    fontSize: 10,
    marginHorizontal: 10,
    color: Colors.textDark,
  },
  actionButtonContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  needToGoButton: {
    width: "50%",
    backgroundColor: Colors.mainOrange,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: Colors.mainOrange,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  needToGoButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  iveLeftButton: {
    width: "50%",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.mainOrange,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: Colors.mainOrange,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  iveLeftButtonText: {
    color: Colors.mainOrange,
    fontSize: 16,
    fontWeight: "bold",
  },
  exclamationMarkContainer: {
    borderRadius: 12,
    position: "absolute",
    right: 10,
    backgroundColor: Colors.inputBackground,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkMarkContainer: {
    borderRadius: 12,
    position: "absolute",
    right: 10,
    backgroundColor: Colors.inputBackground,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  }
});
