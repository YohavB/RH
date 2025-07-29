# 🚗 RushHour API Implementation

This directory contains the complete API implementation for the RushHour app, following the official API documentation.

## 📁 File Structure

```
src/BE_Api/
├── API_SDK_DOCUMENTATION.md    # Official API documentation
├── ApiCalls.ts                 # Real API implementation
├── ApiManager.ts               # API manager with mock/real switching
├── MockApiCalls.ts             # Mock API implementation for development
└── README.md                   # This file
```

## 🔧 API Implementation Overview

The API implementation has been completely rewritten to match the official backend API documentation. It includes:

### ✅ New Features
- **Complete Authentication System**: OAuth2 with Google, Facebook, and Apple
- **JWT Token Management**: Automatic token handling and refresh
- **Health Check Endpoint**: Server status monitoring
- **User Management**: Full CRUD operations for users
- **Car Management**: Find, create, and manage cars
- **User-Car Relationships**: Assign and remove cars from users
- **Car Relations**: Blocking relationships between cars
- **Notifications**: Send "need to go" notifications
- **Error Handling**: Comprehensive error handling with proper types
- **TypeScript Support**: Full type safety with interfaces and enums

### 🔄 Backward Compatibility
- All legacy endpoints are preserved with deprecation warnings
- Gradual migration path from old to new API
- Mock API support for development and testing

## 🚀 Quick Start

### Basic Usage

```typescript
import { 
  googleLogin, 
  getUserCars, 
  createCarBlockingRelationship,
  healthCheck 
} from '../BE_Api/ApiManager';

// Check server health
const health = await healthCheck();
console.log('Server status:', health.status);

// Login with Google
const authResponse = await googleLogin('google_id_token');
console.log('Logged in user:', authResponse.user);

// Get user's cars
const userCars = await getUserCars(authResponse.user.id);
console.log('User cars:', userCars.cars);

// Create car blocking relationship
const carRelations = await createCarBlockingRelationship(456, 789);
console.log('Car relations:', carRelations);
console.log('Notification status:', carRelations.message);
```

### Authentication Flow

```typescript
import { googleLogin, refreshToken, logout } from '../BE_Api/ApiManager';

// 1. Login
const auth = await googleLogin(googleIdToken);

// 2. Token is automatically stored and used for subsequent requests
const userCars = await getUserCars(auth.user.id);

// 3. Refresh token when needed
const newAuth = await refreshToken();

// 4. Logout
await logout();
```

## 📋 API Endpoints

### Health Check
```typescript
const health = await healthCheck();
// Returns: { status: "UP", timestamp: "...", service: "...", version: "..." }
```

### Authentication
```typescript
// OAuth Login
const auth = await googleLogin(idToken);
const auth = await facebookLogin(accessToken);
const auth = await appleLogin(idToken);

// Token Management
const newAuth = await refreshToken();
await logout();
```

### Users
```typescript
// User Management
const user = await createUser(userData);
const user = await getUserById(123);
const user = await getUserByEmail('user@example.com');
const user = await updateUser(userData);
await deactivateUser(123);
await activateUser(123);
```

### Cars
```typescript
// Car Management
const car = await findOrCreateCar('ABC123', Countries.IL, userId);
```

### User-Car Relationships
```typescript
// User-Car Management
const userCars = await assignCarToUser(userId, carId);
const userCars = await getUserCars(userId);
const userCars = await removeCarFromUser(userId, carId);
```

### Car Relations (Blocking)
```typescript
// Car Blocking Relationships
const relations = await createCarBlockingRelationship(blockingCarId, blockedCarId);
const relations = await getCarRelations(carId);
const relations = await removeCarBlockingRelationship(blockingCarId, blockedCarId);
await removeAllCarRelations(carId);
```

### Notifications
```typescript
// Send Notifications
const notification = await sendNeedToGoNotification(blockedCarId);
```

## 🔧 Configuration

### Environment Variables

```bash
# API Base URL (defaults to 192.168.0.182:8008)
API_BASE_URL=https://your-production-domain.com

# Node Environment (determines mock vs real API)
NODE_ENV=development  # Uses mock API
NODE_ENV=production   # Uses real API
```

### API Manager Configuration

```typescript
import { getApiMode, forceMockMode, forceRealMode } from '../BE_Api/ApiManager';

// Check current API mode
const mode = getApiMode();
console.log('Current mode:', mode.mode); // 'MOCK' or 'REAL'

// Force specific mode (useful for testing)
const mockApi = forceMockMode();
const realApi = forceRealMode();
```

## 🔄 Migration Guide

### From Legacy API to New API

#### Old Way (Deprecated)
```typescript
// Old car endpoints
const cars = await findAllCars();
const car = await findCarByPlateNumber('ABC123', Countries.IL);
const result = await saveCar(carInfo, userId, existingCars);

// Old user-car endpoints
const userCars = await getAllUsersCars();
const userCars = await getUsersCarsByUserId(userId);

// Old blocking endpoints
const result = await updateBlockedCarByPlateNumber(blockingPlate, blockedPlate, userId, status);
```

#### New Way (Recommended)
```typescript
// New car endpoints
const car = await findOrCreateCar('ABC123', Countries.IL, userId);

// New user-car endpoints
const userCars = await getUserCars(userId);
const userCars = await assignCarToUser(userId, carId);

// New blocking endpoints
const relations = await createCarBlockingRelationship(blockingCarId, blockedCarId);
const relations = await getCarRelations(carId);
```

### Migration Checklist

- [ ] Replace `findAllCars()` with `findOrCreateCar()`
- [ ] Replace `saveCar()` with `findOrCreateCar()` + `assignCarToUser()`
- [ ] Replace `getAllUsersCars()` with `getUserCars(userId)`
- [ ] Replace `updateBlockedCarByPlateNumber()` with `createCarBlockingRelationship()`
- [ ] Replace `releaseBlockedCarByPlateNumber()` with `removeCarBlockingRelationship()`
- [ ] Add authentication flow with `googleLogin()`, `facebookLogin()`, or `appleLogin()`
- [ ] Update error handling to use new error response format

## 🧪 Testing

### Mock API Testing

```typescript
import { forceMockMode } from '../BE_Api/ApiManager';

// Force mock mode for testing
const mockApi = forceMockMode();

// Test authentication
const auth = await mockApi.googleLogin('mock_token');
console.log('Mock auth:', auth);

// Test car operations
const car = await mockApi.findOrCreateCar('TEST123', Countries.IL);
console.log('Mock car:', car);
```

### Error Handling Testing

```typescript
try {
  const user = await getUserById(999); // Non-existent user
} catch (error) {
  console.log('Error:', error.cause);
  console.log('Error code:', error.errorCode);
}
```

## 📊 Data Types

### Core Interfaces

```typescript
// User
interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  urlPhoto?: string;
}

// Car
interface CarDTO {
  id: number;
  plateNumber: string;
  country: Countries;
  brand: string;
  model: string;
  color: string;
  carLicenseExpireDate?: string;
}

// Car Relations
interface CarRelationsDTO {
  car: CarDTO;
  isBlocking: CarDTO[];
  isBlockedBy: CarDTO[];
  message?: string; // Notification status
}
```

### Enums

```typescript
enum Countries {
  UNKNOWN = 0,
  IL = 1  // Israel
}

enum UserCarSituation {
  IS_BLOCKING = "IS_BLOCKING",
  IS_BLOCKED = "IS_BLOCKED"
}
```

## 🚨 Error Handling

### Error Response Format

```typescript
interface ErrorResponse {
  cause: string;      // Human-readable error message
  errorCode: number;  // HTTP status code
}
```

### Common Error Scenarios

```typescript
try {
  const user = await getUserById(999);
} catch (error) {
  if (error.errorCode === 404) {
    console.log('User not found');
  } else if (error.errorCode === 401) {
    console.log('Unauthorized - need to login');
  } else {
    console.log('Unexpected error:', error.cause);
  }
}
```

## 🔐 Security

### Authentication Flow

1. **OAuth Login**: User authenticates with Google/Facebook/Apple
2. **JWT Token**: Backend returns JWT token for API access
3. **Automatic Token Management**: Token is stored and used automatically
4. **Token Refresh**: Token is refreshed when needed
5. **Logout**: Token is cleared on logout

### Token Management

```typescript
// Tokens are managed automatically
const auth = await googleLogin(idToken);
// Token is stored in AsyncStorage and used for all subsequent requests

// Manual token management (if needed)
import { updateAuthToken, clearAuthToken } from '../BE_Api/ApiCalls';
await updateAuthToken('new_token');
await clearAuthToken();
```

## 📱 React Native Integration

### Hook Example

```typescript
import { useState, useEffect } from 'react';
import { getUserCars, createCarBlockingRelationship } from '../BE_Api/ApiManager';

const useUserCars = (userId: number) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUserCars();
  }, [userId]);

  const loadUserCars = async () => {
    try {
      setLoading(true);
      const result = await getUserCars(userId);
      setCars(result.cars);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const blockCar = async (blockingCarId: number, blockedCarId: number) => {
    try {
      const result = await createCarBlockingRelationship(blockingCarId, blockedCarId);
      console.log('Notification status:', result.message);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return { cars, loading, error, blockCar, refresh: loadUserCars };
};
```

## 🎯 Best Practices

### 1. Use New Endpoints
- Prefer new endpoints over legacy ones
- Legacy endpoints show deprecation warnings
- New endpoints provide better type safety

### 2. Handle Errors Properly
```typescript
try {
  const result = await someApiCall();
} catch (error) {
  // Check error type and handle appropriately
  if (error.errorCode === 401) {
    // Redirect to login
  } else if (error.errorCode === 404) {
    // Handle not found
  } else {
    // Handle other errors
  }
}
```

### 3. Use TypeScript Types
```typescript
import { UserDTO, CarDTO, CarRelationsDTO } from '../classes/RHClasses';

// Use proper types for better development experience
const user: UserDTO = await getUserById(123);
const car: CarDTO = await findOrCreateCar('ABC123', Countries.IL);
const relations: CarRelationsDTO = await getCarRelations(car.id);
```

### 4. Check Notification Status
```typescript
const relations = await createCarBlockingRelationship(blockingCarId, blockedCarId);

// Always check the message for notification status
if (relations.message) {
  console.log('Notification status:', relations.message);
  
  if (relations.message.includes('No notifications sent')) {
    // Handle case where car has no owner
  }
}
```

### 5. Use Mock API for Development
```typescript
// In development, use mock API for faster iteration
if (__DEV__) {
  console.log('Using mock API for development');
}
```

## 🔍 Debugging

### Enable API Logging

```typescript
// Mock API automatically logs all calls
// Real API logs errors automatically

// Check API mode
import { getApiMode } from '../BE_Api/ApiManager';
console.log('API Mode:', getApiMode());
```

### Common Issues

1. **401 Unauthorized**: Token expired or invalid
   - Solution: Call `refreshToken()` or re-login

2. **404 Not Found**: Resource doesn't exist
   - Solution: Check IDs and parameters

3. **403 Forbidden**: Car has no owner for notifications
   - Solution: Check `message` field in response

4. **Network Error**: Server unreachable
   - Solution: Check `API_BASE_URL` and network connection

## 📚 Additional Resources

- [API SDK Documentation](./API_SDK_DOCUMENTATION.md) - Complete API reference
- [Backend API Documentation](https://your-backend-docs.com) - Backend API docs
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - TypeScript reference

## 🤝 Contributing

When adding new features:

1. Update both `ApiCalls.ts` and `MockApiCalls.ts`
2. Add proper TypeScript types in `RHClasses.ts`
3. Update this README with new endpoints
4. Add error handling for new endpoints
5. Test with both mock and real APIs

## 📄 License

This API implementation follows the same license as the main RushHour project. 