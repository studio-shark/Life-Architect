
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import { GoogleAuth } from 'google-auth-library';

const app = express();
const PORT = parseInt(process.env.PORT) || 8080;

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloud SQL Configuration
// Ensure INSTANCE_CONNECTION_NAME, DB_USER, and DB_NAME are set in Cloud Run Environment Variables
const dbConfig = {
  socketPath: process.env.INSTANCE_CONNECTION_NAME ? `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}` : undefined,
  user: process.env.DB_USER, 
  database: process.env.DB_NAME,
  enableKeepAlive: true,
  // IAM Auth requires the cleartext plugin
  authPlugins: {
    mysql_clear_password: () => () => {
      return getAuthToken();
    }
  }
};

// Helper to get Google Cloud IAM Access Token
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/sqlservice.admin']
});

async function getAuthToken() {
  try {
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    return accessToken.token;
  } catch (error) {
    console.error('Error fetching auth token:', error);
    throw error;
  }
}

// Initialize Database Pool
// We create the pool lazily or ensure config is valid. 
// If running locally without Cloud SQL Proxy, this might fail unless mocked or configured for TCP.
let pool;
if (process.env.INSTANCE_CONNECTION_NAME) {
    pool = mysql.createPool(dbConfig);
} else {
    console.warn('INSTANCE_CONNECTION_NAME not set. Database features will be disabled.');
}

// API Endpoint: Test DB Connection
app.get('/api/test-db', async (req, res) => {
  if (!pool) {
      return res.status(503).json({ status: 'error', message: 'Database not configured' });
  }

  try {
    const [rows] = await pool.query('SELECT 1 as val');
    res.json({ 
      status: 'success', 
      message: 'Database connection successful', 
      result: rows[0] 
    });
  } catch (err) {
    console.error('Database query failed:', err);
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed', 
      error: err.message 
    });
  }
});

// Serve Static Files (Vite Build Output)
app.use(express.static(path.join(__dirname, 'dist')));

// SPA Fallback: Serve index.html for any unknown route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
