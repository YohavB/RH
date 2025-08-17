// Environment configuration
export const ENV = {
  // Current environment
  ENVIRONMENT: process.env.NODE_ENV || 'DEVELOPMENT', // 'DEVELOPMENT' | 'PRODUCTION'
  
  // API Configuration
  API_URL: process.env.API_URL || 'http://192.168.0.110:8008',  // Local server URL
  
};

// Helper functions
export const isDevelopmentMode = () => ENV.ENVIRONMENT === 'DEVELOPMENT' || ENV.ENVIRONMENT === 'development';
export const isProductionMode = () => ENV.ENVIRONMENT === 'PRODUCTION' || ENV.ENVIRONMENT === 'production';

// Get the appropriate API URL based on environment
export const getApiUrl = () => {
  // Try to get from environment variable first
  const envUrl = process.env.API_URL;
  if (envUrl) {
    console.log(`🌐 Using API URL from environment: ${envUrl}`);
    return envUrl;
  }
  
  // Fallback to local server
  const localUrl = ENV.API_URL;
  console.log(`🌐 Using default API URL: ${localUrl}`);
  console.log(`💡 To change the API URL, set the API_URL environment variable`);
  return localUrl;
};

// Export a frozen object to prevent modifications
export default Object.freeze(ENV); 