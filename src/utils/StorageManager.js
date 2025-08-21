import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  DEFAULT_COUNTRY: 'default_country',
};

class StorageManager {
  /**
   * Save a value to AsyncStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   */
  static async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to storage with key ${key}:`, error);
    }
  }

  /**
   * Get a value from AsyncStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} Stored value or default value
   */
  static async getItem(key, defaultValue = null) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error(`Error reading from storage with key ${key}:`, error);
      return defaultValue;
    }
  }

  /**
   * Remove a value from AsyncStorage
   * @param {string} key - Storage key
   */
  static async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from storage with key ${key}:`, error);
    }
  }

  /**
   * Save default country setting
   * @param {number} country - Country enum value
   */
  static async setDefaultCountry(country) {
    await this.setItem(STORAGE_KEYS.DEFAULT_COUNTRY, country);
  }

  /**
   * Get default country setting
   * @returns {number|null} Default country enum value or null if not set
   */
  static async getDefaultCountry() {
    return await this.getItem(STORAGE_KEYS.DEFAULT_COUNTRY, null);
  }

  /**
   * Clear default country setting
   */
  static async clearDefaultCountry() {
    await this.removeItem(STORAGE_KEYS.DEFAULT_COUNTRY);
  }
}

export default StorageManager;
export { STORAGE_KEYS };
