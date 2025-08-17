import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Colors } from "../styles/GlobalStyle";
import styles from "../styles/componentStyles/CarCardStyles";
import CarOptionsMenu from "./CarOptionsMenu";
import CarDeleteModal from "./CarDeleteModal";

/**
 * Reusable car card component
 * @param {object} car - Car details object
 * @param {function} onDelete - Function to call when delete is confirmed
 */
const CarCard = ({ car, onDelete, isLastCar }) => {
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

  // Handle delete cancellation
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <View style={styles.cardContainer}>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>License #:</Text>
              <Text style={styles.detailValue}>{car.plateNumber}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Country:</Text>
              <Text style={styles.detailValue}>{car.country}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Make:</Text>
              <Text style={styles.detailValue}>{car.brand}</Text>
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

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionsButton}
              onPress={toggleOptions}
            >
              <Text style={styles.optionsIcon}>•••</Text>
            </TouchableOpacity>

            <CarOptionsMenu isVisible={showOptions} onDelete={promptDelete} />
          </View>
        </View>

      <CarDeleteModal
        isVisible={showDeleteModal}
        car={car}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLastCar={isLastCar}
      />
    </>
  );
};

export default CarCard;
