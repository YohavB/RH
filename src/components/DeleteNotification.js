import React from "react";
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import { Colors } from "../styles/GlobalStyle";
import styles from "../styles/componentStyles/DeleteNotificationStyles";

/**
 * Delete notification modal component
 * @param {boolean} visible - Whether the notification is visible
 * @param {string} licensePlate - The deleted car's license plate
 * @param {string} make - The deleted car's make
 * @param {function} onClose - Function to call when notification is closed
 */
const DeleteNotification = ({ visible, licensePlate, make, onClose }) => {
  const handleOutsidePress = () => {
    onClose();
  };

  const handleModalPress = () => {
    // Prevent closing when clicking on the modal content
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={handleModalPress}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Your {make} {licensePlate} was deleted.
              </Text>

              <TouchableOpacity style={styles.okButton} onPress={onClose}>
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeleteNotification;
