import { Alert as RNAlert } from "react-native";

let showAlertHandler = null;

export const setAlertHandler = (handler) => {
  showAlertHandler = handler;
};

export const Alert = {
  alert: (title, message = "", buttons, options) => {
    if (typeof title !== "string") {
      // Fallback to native Alert if incorrect usage
      return RNAlert.alert(title, message, buttons, options);
    }

    if (showAlertHandler) {
      showAlertHandler({ title, message, buttons, options });
    } else {
      RNAlert.alert(title, message, buttons, options);
    }
  },
};

export default Alert;

