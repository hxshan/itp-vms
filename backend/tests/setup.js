// Test setup file
const { exec } = require('child_process');

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.MONGO_URI = 'mongodb://localhost:27017/vms-test';

// Global test timeout
jest.setTimeout(10000);

// Cleanup after tests
afterAll(async () => {
  // Clean up any test data or connections
  console.log('🧹 Cleaning up test environment...');
});
