import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import styles from "../styles/componentStyles/UserCarsRelationsStyles";

// Icons & colors
import {
  TopViewCarIcon,
  ExclamationMarkIcon,
  CheckMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./Icons";
import { getCarColorHex } from "../assets/car_colors";
import { Colors } from "../styles/GlobalStyle";

// API
import { sendNeedToGoNotification } from "../BE_Api/ApiManager";

// Custom alert
import { Alert } from "./CustomAlert";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.8; // 80% of screen
const CARD_MARGIN = 16;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN;
const NAVIGATION_BUTTON_SIZE = Math.max(48, SCREEN_WIDTH * 0.12); // Responsive button size

const UserCarsRelations = ({ userCarsRelations = [], userCarLeft }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [leftButtonActive, setLeftButtonActive] = React.useState(false);
  const [rightButtonActive, setRightButtonActive] = React.useState(false);
  const flatListRef = React.useRef(null);

  // Filter cars that have parking relationships
  const filteredCarsRelations = userCarsRelations.filter(item => 
    item && 
    typeof item === "object" && 
    (item.isBlocking?.length > 0 || item.isBlockedBy?.length > 0)
  );

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

  const renderCarInfo = (car) => {
    if (!car) return null;
    const isOwnerKnown = car.hasOwner !== false;

    return (
      <View style={styles.carInfoContainer}>
        <View style={styles.carIconContainer}>
          <TopViewCarIcon size={40} color={getCarColorHex(car.color)} />
        </View>

        <View style={styles.carDetails}>
          <Text style={styles.carDetailsText}>
            {car.brand} {car.model}
          </Text>
          <Text style={styles.separatorText}>---</Text>
          <Text style={styles.carDetailsText}>{car.plateNumber}</Text>
        </View>

        <TouchableOpacity
          style={
            isOwnerKnown
              ? styles.checkMarkContainer
              : styles.exclamationMarkContainer
          }
          onPress={() => {
            Alert.alert(
              isOwnerKnown 
                ? "Owner found in our records !" 
                : "No owner yet in our records.",
              isOwnerKnown
                ? "We can notify them directly." 
                : "We can't notify anyone yet.\nIf you meet the owner, tell them about our app so you won't get blocked again.",
              [{ text: "Got it !" }]
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

  const renderCarList = (cars = [], title) => {
    if (!cars.length) return null;

    return (
      <View style={styles.carListContainer}>
        <Text style={styles.carListTitle}>{title}</Text>
        {cars.map(
          (car, idx) =>
            car && (
              <View key={car.plateNumber || idx}>{renderCarInfo(car)}</View>
            )
        )}
      </View>
    );
  };

  return (
    <View style={styles.userCarsRelationsContainer}>
      <Text style={styles.mainTitle}>Your Cars Relations</Text>

             {/* Carousel with FlatList */}
       <FlatList
         ref={flatListRef}
         data={filteredCarsRelations}
         keyExtractor={(item, idx) => item?.car?.plateNumber || idx.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate={0.8}
        snapToAlignment="center"
        contentContainerStyle={{
          paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 4, // center first & last card
        }}
        renderItem={({ item, index }) => {
          if (!item || typeof item !== "object") return null;
          const { car: userCar, isBlocking = [], isBlockedBy = [] } = item;

          return (
              <View
                style={[
                  styles.cardContainer,
                  {
                    width: CARD_WIDTH,
                    marginRight:
                      index === userCarsRelations.length - 1 ? 0 : CARD_MARGIN,
                  },
                ]}
              >
                {/* User Car */}
                {(!!isBlockedBy.length || !!isBlocking.length) && (
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
        }}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / SNAP_INTERVAL
          );
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
        pagingEnabled={false}
        bounces={true}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
      />

             {/* Scroll Hint */}
       {filteredCarsRelations.length > 1 && (
         <Text style={styles.scrollHintText}>
           Swipe or use arrows to navigate between your cars
         </Text>
       )}

             {/* Carousel Navigation */}
       {filteredCarsRelations.length > 1 && (
        <View style={styles.carouselNavigationContainer}>
          <TouchableOpacity
            style={[
              styles.navigationButton,
              currentIndex === 0 && styles.navigationButtonDisabled,
              leftButtonActive && styles.navigationButtonActive,
            ]}
            onPress={() => {
              if (currentIndex > 0 && flatListRef.current) {
                flatListRef.current.scrollToIndex({
                  index: currentIndex - 1,
                  animated: true,
                  viewPosition: 0.5,
                });
              }
            }}
            onPressIn={() => setLeftButtonActive(true)}
            onPressOut={() => setLeftButtonActive(false)}
            disabled={currentIndex === 0}
          >
            <ChevronLeftIcon
              size={NAVIGATION_BUTTON_SIZE * 0.6}
              color={
                currentIndex === 0 ? Colors.mediumGray : Colors.gradientOrange
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
                         style={[
               styles.navigationButton,
               currentIndex === filteredCarsRelations.length - 1 &&
                 styles.navigationButtonDisabled,
               rightButtonActive && styles.navigationButtonActive,
             ]}
             onPress={() => {
               if (
                 currentIndex < filteredCarsRelations.length - 1 &&
                 flatListRef.current
               ) {
                flatListRef.current.scrollToIndex({
                  index: currentIndex + 1,
                  animated: true,
                  viewPosition: 0.5,
                });
              }
            }}
            onPressIn={() => setRightButtonActive(true)}
            onPressOut={() => setRightButtonActive(false)}
            disabled={currentIndex === userCarsRelations.length - 1}
          >
            <ChevronRightIcon
              size={NAVIGATION_BUTTON_SIZE * 0.6}
                             color={
                 currentIndex === filteredCarsRelations.length - 1
                   ? Colors.mediumGray
                   : Colors.gradientOrange
               }
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default UserCarsRelations;
