// Environment configuration
export const ENV = {
  // Current environment
  ENVIRONMENT: process.env.NODE_ENV || 'DEVELOPMENT', // 'DEMO' | 'DEVELOPMENT' | 'PRODUCTION'
  
  // API Configuration
  API_URL: process.env.API_BASE_URL || 'http://192.168.0.182:8008',  // Local server URL
  API_BASE_URL: process.env.API_BASE_URL || 'http://192.168.0.182:8008',  // For compatibility
  
  // Demo data configuration
  DEMO_DELAY: 1000,  // Milliseconds to simulate API calls in demo mode
  
  // Local development settings
  LOCAL_SERVER_URL: 'http://192.168.0.182:8008',
  LOCAL_SERVER_PORT: 8008,
};

// Helper functions
export const isDemoMode = () => ENV.ENVIRONMENT === 'DEMO';
export const isDevelopmentMode = () => ENV.ENVIRONMENT === 'DEVELOPMENT' || ENV.ENVIRONMENT === 'development';
export const isProductionMode = () => ENV.ENVIRONMENT === 'PRODUCTION' || ENV.ENVIRONMENT === 'production';

// Get the appropriate API URL based on environment
export const getApiUrl = () => {
  // Always use local server for now
  const localUrl = ENV.LOCAL_SERVER_URL;
  console.log(`🌐 Using API URL: ${localUrl}`);
  return localUrl;
};

// Export a frozen object to prevent modifications
export default Object.freeze(ENV); 