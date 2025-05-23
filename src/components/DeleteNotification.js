import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Fonts, Colors } from '../styles/GlobalStyle';

/**
 * Delete notification modal component
 * @param {boolean} visible - Whether the notification is visible
 * @param {string} licensePlate - The deleted car's license plate
 * @param {string} make - The deleted car's make
 * @param {function} onClose - Function to call when notification is closed
 */
const DeleteNotification = ({ visible, licensePlate, make, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Your {make} {licensePlate} was deleted.
          </Text>
          
          <TouchableOpacity 
            style={styles.okButton}
            onPress={onClose}
          >
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
          
          {/* Close button */}
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: '#000',
    marginBottom: 24,
    textAlign: 'center',
  },
  okButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.mainOrange,
    width: '50%',
    alignItems: 'center',
  },
  okButtonText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.white,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#999',
  },
});

export default DeleteNotification; 