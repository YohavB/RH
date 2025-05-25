import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Colors } from '../styles/GlobalStyle';

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

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selector: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.mainOrange,
  },
  selectorText: {
    color: Colors.mainOrange,
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.mainOrange,
    marginBottom: 16,
    textAlign: 'center',
  },
  carList: {
    maxHeight: '80%',
  },
  carItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  plateNumber: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.darkGray,
  },
  carDetails: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: Colors.gray,
    marginTop: 4,
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: Colors.darkGray,
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
});

export default CarSelector; 