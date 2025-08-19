import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "../styles/componentStyles/CarDeleteModalStyles";

const CarDeleteModal = ({ isVisible, car, onConfirm, onCancel, isLastCar }) => {
  const handleOutsidePress = () => {
    onCancel();
  };

  const handleModalPress = () => {
    // Prevent closing when clicking on the modal content
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={handleModalPress}>
            <View style={styles.modalContainer}>
              {isLastCar ? (
                <>
                  <Text style={styles.modalTitleLastCar}>
                    This is your last registered car.
                  </Text>
                  <Text style={styles.modalTitleLastCar}>
                    Are you sure you want to delete it?
                  </Text>
                </>
              ) : (
                <Text style={styles.modalTitle}>
                  Are you sure you want to delete this car?
                </Text>
              )}

              <View style={styles.carPreview}>
                <View style={styles.previewDetails}>
                  <View style={styles.previewRow}>
                    <Text style={styles.previewLabel}>License #:</Text>
                    <Text style={styles.previewValue}>{car?.plateNumber}</Text>
                  </View>
                  <View style={styles.previewRow}>
                    <Text style={styles.previewLabel}>Make:</Text>
                    <Text style={styles.previewValue}>{car?.brand}</Text>
                  </View>
                  <View style={styles.previewRow}>
                    <Text style={styles.previewLabel}>Model:</Text>
                    <Text style={styles.previewValue}>{car?.model}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onCancel}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={onConfirm}
                >
                  <Text style={styles.deleteButtonText}>Yes, delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CarDeleteModal;
