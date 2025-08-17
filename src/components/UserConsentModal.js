import React, { useState, useRef } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import styles from "../styles/componentStyles/UserConsentModalStyles";

const UserConsentModal = ({ isVisible, onAccept }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollViewRef = useRef(null);

  // Reset scroll state when modal becomes visible
  React.useEffect(() => {
    if (isVisible) {
      setHasScrolledToBottom(false);
    }
  }, [isVisible]);

  const termsAndConditions = `
TERMS AND CONDITIONS OF USE

1. ACCEPTANCE OF TERMS
By using RushHour, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the application.

2. SERVICE DESCRIPTION
RushHour is a parking assistance application that helps users manage parking situations and communicate with other drivers.

3. USER RESPONSIBILITIES
- You must provide accurate and truthful information
- You are responsible for maintaining the security of your account
- You must not use the service for any illegal or unauthorized purpose
- You must respect other users' privacy and rights

4. PRIVACY AND DATA
- We collect and process personal data as described in our Privacy Policy
- Your data is used to provide the service and improve user experience
- We implement appropriate security measures to protect your information

5. LIMITATION OF LIABILITY
- RushHour is provided "as is" without warranties
- We are not liable for any damages arising from the use of the service
- Users are responsible for their own actions and decisions

6. MODIFICATIONS
We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.

7. CONTACT INFORMATION
For questions about these terms, please contact our support team.

By clicking "I Accept Terms and Conditions", you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
`;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Terms and Conditions</Text>
            <Text style={styles.subtitle}>
              Please read and accept the terms to continue
            </Text>
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={styles.content}
            showsVerticalScrollIndicator={true}
            onScroll={(event) => {
              const { contentOffset, contentSize, layoutMeasurement } =
                event.nativeEvent;
              const paddingToBottom = 20; // Allow some padding for better UX
              const isAtBottom =
                contentOffset.y + layoutMeasurement.height >=
                contentSize.height - paddingToBottom;

              if (isAtBottom && !hasScrolledToBottom) {
                setHasScrolledToBottom(true);
              }
            }}
            scrollEventThrottle={16} // For smooth scroll detection
          >
            <Text style={styles.termsText}>{termsAndConditions}</Text>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.acceptButton,
                !hasScrolledToBottom && styles.acceptButtonDisabled,
              ]}
              onPress={onAccept}
              activeOpacity={0.8}
              disabled={!hasScrolledToBottom}
            >
              <Text
                style={
                  hasScrolledToBottom
                    ? styles.acceptButtonText
                    : styles.acceptButtonTextDisabled
                }
              >
                I Accept Terms and Conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UserConsentModal;
