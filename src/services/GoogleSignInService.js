import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getAuth, getApp } from "../firebase/config";
import { GoogleAuthProvider } from '@react-native-firebase/auth';

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
    return response && response.user && response.idToken;
  }

  isErrorWithCode(error) {
    return error && error.code;
  }

  isNoSavedCredentialFoundResponse(response) {
    return response && !response.data;
  }

  async signInWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      
      // Create a Google credential with the token
      const credential = GoogleAuthProvider.credential(idToken);
      
      // Sign in to Firebase with the credential using Firebase v23+ modular API
      const auth = getAuth(getApp());
      const userCredential = await auth.signInWithCredential(credential);
      
      if (userCredential && userCredential.user) {
        return { 
          success: true, 
          data: {
            user: userCredential.user,
            idToken: idToken
          }
        };
      } else {
        return { success: false, error: "Invalid response from Firebase Auth" };
      }
    } catch (error) {
      console.log("signInWithGoogle error", error);
      
      if (this.isErrorWithCode(error)) {
        switch (error.code) {
          case 'SIGN_IN_CANCELLED':
            return { success: false, error: "Sign in cancelled by user" };
          case 'IN_PROGRESS':
            return { success: false, error: "Sign in already in progress" };
          case 'PLAY_SERVICES_NOT_AVAILABLE':
            return { success: false, error: "Play services not available" };
          case 'SIGN_IN_REQUIRED':
            return { success: false, error: "Sign in required" };
          default:
            return { success: false, error: `Google Sign-In error: ${error.code}` };
        }
      } else {
        return {
          success: false,
          error: error.message || "An unexpected error occurred during Google Sign-In",
        };
      }
    }
  }

  async getGoogleCurrentUserSilently() {
    try {
      console.log("Attempting silent Google sign-in...");
      
      // Check if user is already signed in
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (!isSignedIn) {
        console.log("User not signed in to Google, silent sign-in not possible");
        return {
          success: false,
          error: "User not signed in to Google"
        };
      }

      const { idToken } = await GoogleSignin.signInSilently();
      console.log("Silent sign-in successful, got idToken");
      
      // Create a Google credential with the token
      const credential = GoogleAuthProvider.credential(idToken);
      console.log("Created Google credential");
      
      // Sign in to Firebase with the credential using Firebase v23+ modular API
      const auth = getAuth(getApp());
      const userCredential = await auth.signInWithCredential(credential);
      console.log("Firebase sign-in successful");
      
      if (userCredential && userCredential.user) {
        return { 
          success: true, 
          data: {
            user: userCredential.user,
            idToken: idToken
          }
        };
      } else {
        return { success: false, error: "No saved credential found" };
      }
    } catch (error) {
      console.error("Silent sign-in error details:", error);
      console.error("Error stack:", error.stack);
      
      // Check for specific Google Sign-In errors
      if (this.isErrorWithCode(error)) {
        switch (error.code) {
          case 'SIGN_IN_REQUIRED':
            return { success: false, error: "Sign in required - user not authenticated" };
          case 'IN_PROGRESS':
            return { success: false, error: "Sign in already in progress" };
          case 'PLAY_SERVICES_NOT_AVAILABLE':
            return { success: false, error: "Play services not available" };
          default:
            return { success: false, error: `Google Sign-In error: ${error.code}` };
        }
      } else {
        return {
          success: false,
          error: error.message || "Failed to get google current user silently",
        };
      }
    }
  }

  async signOutWithGoogle() {
    try {
      // Sign out from Firebase using Firebase v23+ modular API
      const auth = getAuth(getApp());
      await auth.signOut();
      
      // Clear any existing sign-in state
      await GoogleSignin.clearCachedToken();
      
      // Sign out from Google
      await GoogleSignin.signOut();
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "Failed to sign out" };
    }
  }

  // Get current Firebase user using Firebase v23+ modular API
  getCurrentUser() {
    const auth = getAuth(getApp());
    return auth.currentUser;
  }

  // Listen to auth state changes using Firebase v23+ modular API
  onAuthStateChanged(callback) {
    const auth = getAuth(getApp());
    return auth.onAuthStateChanged(callback);
  }
}

export default new GoogleSignInService();
