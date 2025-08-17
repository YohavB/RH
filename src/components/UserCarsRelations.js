import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/componentStyles/UserCarsRelationsStyles";

// Icons & colors
import { TopViewCarIcon, ExclamationMarkIcon, CheckMarkIcon } from "./Icons";
import { getCarColorHex } from "../assets/car_colors";
import { Colors } from "../styles/GlobalStyle";

// API
import { sendNeedToGoNotification } from "../BE_Api/ApiManager";

// Custom alert
import { Alert } from "./CustomAlert";

const UserCarsRelations = ({ userCarsRelations = [], userCarLeft }) => {
  const handleINeedToGo = (userCar) => {
    Alert.alert(
      "You Need to Go ?",
      `By pressing "I Need to Go" we will notify all the blocking car(s) that you need to go.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "I Need to Go",
          onPress: () => sendNeedToGoNotification(userCar.id),
        },
      ]
    );
  };

  const handleIveLeft = (userCar) => {
    Alert.alert(
      "Are you leaving ?",
      `By pressing "Yes" we will notify all the blocked car(s) that you've left.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => userCarLeft(userCar.id) },
      ]
    );
  };

  const renderUserCarInfo = (car) => {
    if (!car) return null;

    return (
      <View style={styles.userCarInfoHeader}>
        <Text style={styles.userCarDetailText}>
          Your {car.brand} {car.model} - {car.plateNumber}
        </Text>
      </View>
    );
  };

  const renderCarList = (cars = [], title) => {
    if (!cars.length) return null;

    return (
      <View style={styles.carListContainer}>
        <Text style={styles.carListTitle}>{title}</Text>
        {cars.map(
          (car, idx) =>
            car &&
            typeof car === "object" && (
              <View key={car.plateNumber || idx}>{renderCarInfo(car)}</View>
            )
        )}
      </View>
    );
  };

  const renderCarInfo = (car) => {
    if (!car) return null;

    const isOwnerKnown = car.hasOwner !== false;

    return (
      <View style={styles.carInfoContainer}>
        <View style={styles.carIconContainer}>
          <TopViewCarIcon size={40} color={getCarColorHex(car.color)} />
        </View>

        {/* Car details */}
        <View style={styles.carDetails}>
          <Text style={styles.carDetailsText}>
            {car.brand} {car.model}
          </Text>
          <Text style={styles.separatorText}>---</Text>
          <Text style={styles.carDetailsText}>{car.plateNumber}</Text>
        </View>

        {/* Ownership indicator */}
        <TouchableOpacity
          style={
            isOwnerKnown
              ? styles.checkMarkContainer
              : styles.exclamationMarkContainer
          }
          onPress={() => {
            Alert.alert(
              "Car Ownership Status",
              isOwnerKnown
                ? "This car has a registered owner. We can send notifications to them."
                : "This car has no owner in our records. Try to find the owner and tell them about this app.",
              [{ text: "OK", style: { width: "50%" } }]
            );
          }}
        >
          {isOwnerKnown ? (
            <CheckMarkIcon size={24} color={Colors.mainGreen} />
          ) : (
            <ExclamationMarkIcon size={24} color={Colors.gradientOrange} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.userCarsRelationsContainer}>
      <Text style={styles.mainTitle}>Your Cars Relations</Text>

      <View style={styles.userCarsRelationsList}>
        {userCarsRelations.map((relation, idx) => {
          if (!relation || typeof relation !== "object") return null;

          const { car: userCar, isBlocking = [], isBlockedBy = [] } = relation;

          return (
            <View
              key={userCar.plateNumber || idx}
              style={styles.userCarsRelationItem}
            >
              {/* User Car */}
              {!!isBlockedBy.length && !!isBlocking.length && (
                <View style={styles.userCarSection}>
                  {renderUserCarInfo(userCar)}
                </View>
              )}

              {/* Blocked by others */}
              {!!isBlockedBy.length && (
                <View style={styles.relationSection}>
                  {renderCarList(isBlockedBy, "Is Blocked By")}
                  <View style={styles.actionButtonContainer}>
                    <TouchableOpacity
                      style={styles.needToGoButton}
                      onPress={() => handleINeedToGo(userCar)}
                    >
                      <Text style={styles.needToGoButtonText}>
                        I Need to Go
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Blocking others */}
              {!!isBlocking.length && (
                <View style={styles.relationSection}>
                  {renderCarList(isBlocking, "Is Blocking")}
                  <View style={styles.actionButtonContainer}>
                    <TouchableOpacity
                      style={styles.iveLeftButton}
                      onPress={() => handleIveLeft(userCar)}
                    >
                      <Text style={styles.iveLeftButtonText}>I've Left</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default UserCarsRelations;
