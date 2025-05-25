// Environment configuration
export const ENV = {
  // Current environment
  ENVIRONMENT: 'DEMO', // 'DEMO' | 'DEVELOPMENT' | 'PRODUCTION'
  
  // API Configuration
  API_URL: 'https://api.unblock.com',  // Will be used when not in demo mode
  
  // Demo data configuration
  DEMO_DELAY: 1000,  // Milliseconds to simulate API calls in demo mode
};

// Helper functions
export const isDemoMode = () => ENV.ENVIRONMENT === 'DEMO';

// Export a frozen object to prevent modifications
export default Object.freeze(ENV); 