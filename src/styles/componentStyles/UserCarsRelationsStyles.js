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
  carouselScrollView: {
    flex: 1,
    borderWidth: 10,
    borderColor: '#96CEB4', // Green
  },
  carouselContainer: {
    paddingHorizontal: 20,
    borderWidth: 10,
    borderColor: '#FFEAA7', // Yellow
  },
  userCarsRelationItemFirst: {
    marginLeft: 0,
    borderWidth: 1,
    borderColor: '#98D8C8', // Mint
  },
  userCarsRelationItemLast: {
    marginRight: 0,
    borderWidth: 1,
    borderColor: '#F7DC6F', // Gold
  },
  carouselIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  carouselDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.mediumGray,
    marginHorizontal: 4,
  },
  carouselDotActive: {
    backgroundColor: Colors.mainOrange,
    width: 10,
    height: 10,
  },
  carouselNavigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  navigationButton: {
    minWidth: 48,
    minHeight: 48,
    marginTop: 5,
    borderRadius: 24,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: Colors.gradientOrange,
    padding: 12,
  },
  navigationButtonDisabled: {
    borderColor: Colors.mediumGray,
    backgroundColor: Colors.inputBackground,
    shadowOpacity: 0.05,
    elevation: 1,
  },
  navigationButtonActive: {
    backgroundColor: Colors.gradientOrange,
    transform: [{ scale: 0.95 }],
  },
  scrollHintText: {
    textAlign: 'center',
    color: Colors.mediumGray,
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
  },
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.gradientOrange,
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
    borderWidth: 1,
    borderColor: '#F8BBD9', // Light Pink
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
    borderColor: Colors.gradientOrange,
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
  },
});
