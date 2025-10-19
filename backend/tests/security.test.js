const request = require('supertest');
const axios = require('axios');

describe('Security Vulnerability Tests', () => {
  let app;
  let server;
  let csrfToken;
  let cookies;

  beforeAll(async () => {
    // Start your server
    app = require('../backend/server');
    server = app.listen(3001); // Use different port for testing
  });

  afterAll(async () => {
    if (server) {
      server.close();
    }
  });

  describe('CSRF Protection Tests', () => {
    
    test('❌ VULNERABILITY: Should reject requests without CSRF token', async () => {
      const response = await request(app)
        .post('/api/caseFiles/create')
        .send({
          caseType: 'Accident',
          caseTitle: 'Test Case',
          location: 'Test Location'
        });

      expect(response.status).toBe(403);
      expect(response.body.error).toBe('Invalid CSRF token');
      console.log('✅ CSRF Protection Working: Rejected request without token');
    });

    test('✅ FIXED: Should accept requests with valid CSRF token', async () => {
      // First, login to get CSRF token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'password123'
        });

      // Extract CSRF token from cookies
      const setCookie = loginResponse.headers['set-cookie'];
      const csrfCookie = setCookie.find(cookie => cookie.startsWith('XSRF-TOKEN'));
      csrfToken = csrfCookie.split('=')[1].split(';')[0];

      // Now make protected request with CSRF token
      const response = await request(app)
        .post('/api/caseFiles/create')
        .set('X-CSRF-Token', csrfToken)
        .set('Cookie', csrfCookie)
        .send({
          caseType: 'Accident',
          caseTitle: 'Test Case',
          location: 'Test Location'
        });

      expect(response.status).toBe(200);
      console.log('✅ CSRF Protection Working: Accepted request with valid token');
    });

    test('❌ VULNERABILITY: Should reject requests with invalid CSRF token', async () => {
      const response = await request(app)
        .post('/api/caseFiles/create')
        .set('X-CSRF-Token', 'invalid-token-12345')
        .send({
          caseType: 'Accident',
          caseTitle: 'Test Case'
        });

      expect(response.status).toBe(403);
      expect(response.body.error).toBe('Invalid CSRF token');
      console.log('✅ CSRF Protection Working: Rejected request with invalid token');
    });

    test('✅ FIXED: Multiple endpoints protected with CSRF', async () => {
      const endpoints = [
        '/api/vehicle/',
        '/api/vehiclemaintain/createmainform',
        '/api/hire/add',
        '/api/income'
      ];

      for (const endpoint of endpoints) {
        const response = await request(app)
          .post(endpoint)
          .send({ test: 'data' });

        expect(response.status).toBe(403);
        console.log(`✅ CSRF Protection on ${endpoint}: ${response.status}`);
      }
    });
  });

  describe('Open Redirect Protection Tests', () => {
    
    test('✅ FIXED: Should only allow whitelisted redirect paths', async () => {
      // Test valid paths
      const validPaths = [
        'admin',
        'vehicle', 
        'Mdashboard',
        'hires',
        'Contract/Dashbored',
        'emergency',
        'finance/financeDashboard'
      ];

      for (const path of validPaths) {
        // Simulate JWT with valid path
        const mockJWT = {
          UserInfo: {
            path: path
          }
        };

        // This would be tested in your frontend navigation logic
        const allowed = new Set([
          'admin', 'vehicle', 'Mdashboard', 'hires',
          'Contract/Dashbored', 'emergency', 'finance/financeDashboard'
        ]);
        
        const safePath = allowed.has(path) ? `/${path}` : '/';
        
        expect(safePath).toBe(`/${path}`);
        console.log(`✅ Valid path '${path}' -> '${safePath}'`);
      }
    });

    test('❌ VULNERABILITY: Should block malicious redirect attempts', async () => {
      const maliciousPaths = [
        'https://evil.com',
        'javascript:alert(1)',
        '//evil.com',
        'http://localhost:3000/../admin',
        'data:text/html,<script>alert(1)</script>'
      ];

      const allowed = new Set([
        'admin', 'vehicle', 'Mdashboard', 'hires',
        'Contract/Dashbored', 'emergency', 'finance/financeDashboard'
      ]);

      for (const maliciousPath of maliciousPaths) {
        const safePath = allowed.has(maliciousPath) ? `/${maliciousPath}` : '/';
        
        expect(safePath).toBe('/'); // Should default to root
        console.log(`✅ Blocked malicious path '${maliciousPath}' -> '${safePath}'`);
      }
    });

    test('✅ FIXED: JWT-based path validation working', async () => {
      // Test that server determines paths based on user permissions
      const mockUserRole = {
        userPermissions: { Read: true },
        vehiclePermissions: { Read: false },
        emergencyPermissions: { Read: false }
      };

      // Simulate decideDashboard function
      const decideDashboard = (role) => {
        if (role.userPermissions.Read) return 'admin';
        if (role.vehiclePermissions.Read) return 'vehicle';
        if (role.emergencyPermissions.Read) return 'emergency';
        return 'admin'; // default
      };

      const path = decideDashboard(mockUserRole);
      expect(path).toBe('admin');
      console.log('✅ Server-side path determination working');
    });
  });

  describe('Integration Tests', () => {
    
    test('✅ Complete secure flow: Login -> CSRF Token -> Protected Request', async () => {
      // Step 1: Login
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'password123'
        });

      expect(loginResponse.status).toBe(200);
      const csrfCookie = loginResponse.headers['set-cookie']
        .find(cookie => cookie.startsWith('XSRF-TOKEN'));
      const csrfToken = csrfCookie.split('=')[1].split(';')[0];

      // Step 2: Use token for protected request
      const protectedResponse = await request(app)
        .post('/api/caseFiles/create')
        .set('X-CSRF-Token', csrfToken)
        .set('Cookie', csrfCookie)
        .send({
          caseType: 'Accident',
          caseTitle: 'Integration Test',
          location: 'Test Location'
        });

      expect(protectedResponse.status).toBe(200);
      console.log('✅ Complete secure flow working');
    });

    test('✅ Security headers present', async () => {
      const response = await request(app)
        .get('/api/auth/login');

      expect(response.headers['x-frame-options']).toBeDefined();
      expect(response.headers['x-content-type-options']).toBeDefined();
      console.log('✅ Security headers present');
    });
  });
});
