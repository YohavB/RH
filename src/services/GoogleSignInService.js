import AsyncStorageLib from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

class GoogleSignInService {
  constructor() {
    this.configureGoogleSignIn();
  }

  configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId:
        "864165576083-harqo14kmlvj6lrhmmrjomemo2v6ervu.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
      // scopes: "", // what API you want to access on behalf of the user, default is email and profile
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: "", // specifies a hosted domain restriction
      forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: "", // [Android] specifies an account name on the device that should be used
      iosClientId:
        "864165576083-ql4f8beguutmtrel407bbqog25otpu21.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
      openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }

  isSuccessResponse(response) {
    return response && response.data;
  }

  isErrorWithCode(error) {
    return error && error.code;
  }

  isNoSavedCredentialFoundResponse(response) {
    return response && !response.data;
  }

  async signInWithGoogle() {
    try {
      console.log("signInWithGoogle");
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (this.isSuccessResponse(response)) {
        return { success: true, data: response.data };
      } else {
        console.log("Sign in cancelled by user");
        return { success: false, error: "Sign in cancelled by user" };
      }
    } catch (error) {
      if (this.isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log("Sign in already in progress");
            return { success: false, error: "Sign in already in progress" };
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log("Play services not available");
            return { success: false, error: "Play services not available" };
          default:
            console.log("Some other error happened");
            return { success: false, error: "Some other error happened" };
        }
      } else {
        console.log("An error that's not related to google sign in occurred");
        return {
          success: false,
          error: "An error that's not related to google sign in occurred",
        };
      }
    }
  }

  async getGoogleCurrentUserSilently() {
    try {
      console.log("getGoogleCurrentUserSilently");
      const response = await GoogleSignin.signInSilently();
      if (this.isSuccessResponse(response)) {
        console.log("getGoogleCurrentUserSilently success");
        return { success: true, data: response.data };
      } else if (this.isNoSavedCredentialFoundResponse(response)) {
        console.log("getGoogleCurrentUserSilently no saved credential found");
        return { success: false, error: "No saved credential found" };
      }
    } catch (error) {
      console.log("getGoogleCurrentUserSilently error");
      console.log(error);
      return {
        success: false,
        error: error.message || "Failed to get google current user silently",
      };
    }
  }

  async signOutWithGoogle() {
    try {
      await GoogleSignin.signOut();
      return { success: true };
    } catch (error) {
      console.log("Sign out error:", error);
      return { success: false, error: error.message || "Failed to sign out" };
    }
  }
}

export default new GoogleSignInService();
