import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { setAlertHandler } from "./CustomAlert";
import styles from "../styles/componentStyles/CustomAlertStyles";

const normalizeButtons = (buttons) => {
  if (!Array.isArray(buttons) || buttons.length === 0) {
    return [{ text: "OK" }];
  }
  return buttons.slice(0, 3); // keep parity with RN which supports up to 3
};

const CustomAlertProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [payload, setPayload] = useState({ title: "", message: "", buttons: [{ text: "OK" }] });

  const handleShow = useCallback(({ title, message, buttons }) => {
    setPayload({ title: title || "", message: message || "", buttons: normalizeButtons(buttons) });
    setVisible(true);
  }, []);

  useEffect(() => {
    setAlertHandler(handleShow);
    return () => setAlertHandler(null);
  }, [handleShow]);

  const onPressButton = useCallback((btn, index) => {
    setVisible(false);
    if (btn && typeof btn.onPress === "function") {
      try { btn.onPress(); } catch (_) {}
    }
  }, []);

  const renderButtons = useMemo(() => {
    return (payload.buttons || [{ text: "OK" }]).map((btn, idx) => (
      <TouchableOpacity
        key={`${idx}-${btn.text || "btn"}`}
        style={idx === 0 && (payload.buttons?.length || 1) > 1 ? styles.secondaryButton : styles.primaryButton}
        onPress={() => onPressButton(btn, idx)}
      >
        <Text style={idx === 0 && (payload.buttons?.length || 1) > 1 ? styles.secondaryButtonText : styles.primaryButtonText}>
          {btn.text || "OK"}
        </Text>
      </TouchableOpacity>
    ));
  }, [payload.buttons, onPressButton]);

  return (
    <View style={{ flex: 1 }}>
      {children}
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                {payload.title ? <Text style={styles.title}>{payload.title}</Text> : null}
                {payload.message ? <Text style={styles.message}>{payload.message}</Text> : null}
                <View style={styles.buttonsContainer}>{renderButtons}</View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CustomAlertProvider;

