import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Fonts, Colors } from '../styles/GlobalStyle';

/**
 * Reusable car card component
 * @param {object} car - Car details object
 * @param {function} onDelete - Function to call when delete is confirmed
 */
const CarCard = ({ car, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  
  // Toggle options menu
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  
  // Show delete confirmation modal
  const promptDelete = () => {
    setShowOptions(false);
    setShowDeleteModal(true);
  };
  
  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    if (onDelete) {
      onDelete(car);
    }
  };
  
  return (
    <View style={styles.cardContainer}>
      {/* Car Image and Details */}
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={car.image || { uri: 'https://cdn.pixabay.com/photo/2018/03/21/18/16/kia-sportage-3247649_960_720.jpg' }}
            style={styles.carImage}
          />
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>License #:</Text>
            <Text style={styles.detailValue}>{car.plateNumber}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Make:</Text>
            <Text style={styles.detailValue}>{car.make}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Model:</Text>
            <Text style={styles.detailValue}>{car.model}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Year:</Text>
            <Text style={styles.detailValue}>{car.year}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Color:</Text>
            <Text style={styles.detailValue}>{car.color}</Text>
          </View>
        </View>
        
        {/* Options Menu Button */}
        <TouchableOpacity style={styles.optionsButton} onPress={toggleOptions}>
          <Text style={styles.optionsIcon}>•••</Text>
        </TouchableOpacity>
        
        {/* Options Menu Popup */}
        {showOptions && (
          <View style={styles.optionsMenu}>
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={promptDelete}
            >
              <Text style={styles.optionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Are you sure you want to delete this car?</Text>
            
            <View style={styles.carPreview}>
              <Image 
                source={car.image || { uri: 'https://cdn.pixabay.com/photo/2018/03/21/18/16/kia-sportage-3247649_960_720.jpg' }}
                style={styles.previewImage}
              />
              <View style={styles.previewDetails}>
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>License #:</Text>
                  <Text style={styles.previewValue}>{car.plateNumber}</Text>
                </View>
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>Make:</Text>
                  <Text style={styles.previewValue}>{car.make}</Text>
                </View>
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>Model:</Text>
                  <Text style={styles.previewValue}>{car.model}</Text>
                </View>
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>Year:</Text>
                  <Text style={styles.previewValue}>{car.year}</Text>
                </View>
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>Color:</Text>
                  <Text style={styles.previewValue}>{car.color}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={handleDeleteConfirm}
              >
                <Text style={styles.deleteButtonText}>Yes, delete</Text>
              </TouchableOpacity>
            </View>
            
            {/* Close button */}
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowDeleteModal(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    overflow: 'visible',
  },
  contentContainer: {
    flexDirection: 'row',
    padding: 16,
    position: 'relative',
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
  },
  carImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#A0A0A0',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: '#000',
  },
  optionsButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
    zIndex: 1,
  },
  optionsIcon: {
    fontSize: 18,
    color: '#666',
    transform: [{ rotate: '90deg' }],
  },
  optionsMenu: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 2,
  },
  optionItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#FF3B30',
  },
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
    position: 'relative',
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: '#000',
    marginBottom: 24,
  },
  carPreview: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    padding: 16,
    marginBottom: 24,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
  },
  previewDetails: {
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  previewLabel: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#A0A0A0',
  },
  previewValue: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: '#000',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    width: '45%',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#000',
  },
  deleteButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.mainOrange,
    width: '45%',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 14,
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

export default CarCard; 