import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import styles from '../styles/componentStyles/CarSelectorStyles';

const CarSelector = ({ cars, selectedCar, onSelect, style }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

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
            : 'Select your car'}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Your Car</Text>
            <FlatList
              data={cars}
              renderItem={renderItem}
              keyExtractor={(item) => item.plateNumber}
              style={styles.carList}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};



export default CarSelector; 