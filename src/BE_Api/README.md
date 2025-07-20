# API System Documentation

This directory contains the API layer for the Rush Hour app, with support for both real and mock API calls.

## Files Overview

### `ApiCalls.ts`
- Contains real API calls to the backend server
- Uses axios for HTTP requests
- Includes authentication token handling
- Error handling and logging

### `MockApiCalls.ts`
- Contains mock implementations of all API endpoints
- Simulates backend responses with realistic data
- Includes delay simulation for realistic API behavior
- Comprehensive logging for debugging

### `ApiManager.ts`
- Acts as a facade for the API system
- Automatically switches between real and mock APIs based on `NODE_ENV`
- Provides a unified interface for all API calls
- Includes utility functions for testing and debugging

## Usage

### Basic Usage
Instead of importing directly from `ApiCalls.ts`, import from `ApiManager.ts`:

```typescript
// ✅ Recommended - Use ApiManager
import { saveCar, deleteCar, findAllCars } from '../BE_Api/ApiManager';

// ❌ Avoid - Direct imports
import { saveCar } from '../BE_Api/ApiCalls';
```

### Environment-Based Switching
The ApiManager automatically switches between real and mock APIs:

- **Development mode** (`NODE_ENV=development`): Uses `MockApiCalls`
- **Production mode** (`NODE_ENV=production`): Uses `ApiCalls`

### API Endpoints Available

#### Cars API
- `findAllCars()` - Get all cars
- `findCarByPlateNumber(plateNumber, country)` - Find car by plate
- `createOrUpdateCar(plateNumber, country, userId)` - Create/update car
- `saveCar(carInfo, userId, existingCars)` - Save car with user association
- `deleteCar(carId, userId, existingCars)` - Delete car

#### Users Cars API
- `getAllUsersCars()` - Get all user-car relationships
- `getUsersCarsByPlateNumber(plateNumber)` - Get by plate number
- `getUsersCarsByUserId(userId)` - Get by user ID
- `getUsersCarsByUserAndPlate(userId, plateNumber)` - Get specific relationship
- `getUsersCarsByBlockedPlateNumber(blockedPlateNumber)` - Get blocking cars
- `getUsersCarsByBlockingPlateNumber(blockingPlateNumber)` - Get blocked cars
- `updateBlockedCarByPlateNumber(blockingCarPlate, blockedCarPlate, userId, userStatus)` - Update blocking
- `releaseBlockedCarByPlateNumber(blockingCarPlate, blockedCarPlate, userId, userStatus)` - Release blocking
- `sendNeedToGoNotification(blockedCarPlate)` - Send notification

#### Users API
- `findAllUsers()` - Get all users
- `findUserById(id)` - Find user by ID
- `findUserByEmail(email)` - Find user by email
- `findUserByExternalId(externalId)` - Find user by external ID
- `createOrUpdateUser(userDTO)` - Create/update user

### Utility Functions

#### Check API Mode
```typescript
import { getApiMode } from '../BE_Api/ApiManager';

const mode = getApiMode();
console.log(mode); // { isDevelopment: true, isProduction: false, mode: 'MOCK', nodeEnv: 'development' }
```

#### Force API Mode (for testing)
```typescript
import { forceMockMode, forceRealMode } from '../BE_Api/ApiManager';

// Force mock mode for testing
const mockApi = forceMockMode();
await mockApi.saveCar(carInfo, userId, existingCars);

// Force real mode
const realApi = forceRealMode();
await realApi.saveCar(carInfo, userId, existingCars);
```

## Mock Data

The mock API includes realistic test data:

### Sample Cars
- Plate: "1234567" - Toyota Corolla (White)
- Plate: "7654321" - Honda Civic (Black)

### Sample Users
- John Doe (john.doe@example.com)
- Jane Smith (jane.smith@example.com)

### Sample User-Car Relationships
- User 1 owns car "1234567"
- User 2 owns car "7654321" and blocks car "1234567"

## Backend API Structure

The mock API is based on the actual backend controllers:

### Cars Controller (`/api/cars`)
- `GET /` - Find all cars
- `GET /by-plate` - Find car by plate number and country
- `POST /car` - Create or update car

### Users Cars Controller (`/api/users-cars`)
- `GET /` - Find all user-car relationships
- `GET /by-plate` - Find by plate number
- `GET /by-user` - Find by user ID
- `GET /by-user-and-plate` - Find specific relationship
- `GET /blocking` - Find blocking cars
- `GET /blocked` - Find blocked cars
- `POST /update-blocked` - Update blocking relationship
- `POST /release-blocked` - Release blocking relationship
- `POST /send-need-to-go-notification` - Send notification

### Users Controller (`/api/users`)
- `GET /` - Find all users
- `GET /by-id` - Find user by ID
- `GET /by-email` - Find user by email
- `POST /` - Create or update user

## Migration Guide

To migrate existing code to use the new ApiManager:

1. **Replace imports**:
   ```typescript
   // Old
   import { saveCar } from '../BE_Api/ApiCalls';
   
   // New
   import { saveCar } from '../BE_Api/ApiManager';
   ```

2. **Update function calls** (no changes needed - same signatures)

3. **Test in both modes**:
   ```typescript
   // Test in development (mock mode)
   NODE_ENV=development npm start
   
   // Test in production (real mode)
   NODE_ENV=production npm start
   ```

## Benefits

1. **Environment Isolation**: Easy switching between development and production
2. **Consistent Interface**: Same API regardless of mode
3. **Better Testing**: Mock data for reliable testing
4. **Debugging**: Comprehensive logging in mock mode
5. **Development Speed**: No backend dependency during development
6. **Production Safety**: Real API calls in production

## Troubleshooting

### Mock API Not Working
- Check `NODE_ENV` is set to 'development'
- Verify imports are from `ApiManager.ts`
- Check console logs for API mode confirmation

### Real API Not Working
- Check `NODE_ENV` is set to 'production'
- Verify backend server is running
- Check network connectivity
- Verify authentication tokens

### Type Errors
- Ensure all imports include proper TypeScript types
- Check that function signatures match between real and mock APIs 