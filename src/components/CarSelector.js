import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "../styles/componentStyles/CarSelectorStyles";
import { getCarColorHex } from "../assets/car_colors";
import { TopViewCarIcon } from "./Icons";
import { Colors } from "../styles/GlobalStyle";

const CarSelector = ({ cars, selectedCar, onSelect, style }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleOutsidePress = () => {
    setModalVisible(false);
  };

  const handleModalPress = () => {
    // Prevent closing when clicking on the modal content
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.carInfoContainer}
      onPress={() => {
        onSelect(item);
        setModalVisible(false);
      }}
    >
      <View style={styles.carIconContainer}>
        <TopViewCarIcon size={40} color={getCarColorHex(item.color)} />
      </View>
      <Text style={styles.carDetails}>
        {item.brand} {item.model}
      </Text>
      <Text style={styles.carDetails}>{item.plateNumber}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.carSelector}>
      <TouchableOpacity
        style={[styles.selector, selectedCar? {borderColor: Colors.mainGreen} : {borderColor: Colors.pinkish}]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {selectedCar
            ? `${selectedCar.brand} ${selectedCar.model} - ${selectedCar.plateNumber}`
            : "Select your current car"}
        </Text>
      </TouchableOpacity> 

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={handleModalPress}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  Which car are you driving?
                </Text>
                <FlatList
                  data={cars}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.plateNumber}
                  style={styles.carList}
                />
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CarSelector;
