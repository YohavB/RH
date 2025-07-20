import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from '../styles/componentStyles/CarSelectorStyles';

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
      style={styles.carItem}
      onPress={() => {
        onSelect(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.plateNumber}>{item.plateNumber}</Text>
      <Text style={styles.carDetails}>
        {item.make} {item.model} - {item.color}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {selectedCar
            ? `${selectedCar.plateNumber} (${selectedCar.make} ${selectedCar.model})`
            : 'Select your current car'}
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
                <Text style={styles.modalTitle}>Which car are you driving?</Text>
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