import mysql from 'mysql2/promise';

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5, // Reduced limit for serverless environment
  queueLimit: 0,
  dateStrings: true // Return dates as strings to match frontend ISO expectations
};

// Robust Environment Detection
// Priority 1: Explicit INSTANCE_CONNECTION_NAME (Standard Cloud Run)
if (process.env.INSTANCE_CONNECTION_NAME) {
  dbConfig.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
} 
// Priority 2: Production Fallback (Hardcoded for us-west1 if env var is missing)
else if (process.env.NODE_ENV === 'production') {
  console.warn('INSTANCE_CONNECTION_NAME not found, using hardcoded us-west1 socket path');
  dbConfig.socketPath = '/cloudsql/gen-lang-client-0607890668:us-west1:life';
} 
// Priority 3: Local Development
else {
  dbConfig.host = process.env.DB_HOST || '127.0.0.1';
}

const db = mysql.createPool(dbConfig);

// Test Database Connection
db.getConnection()
  .then(connection => {
    console.log(`Database pool initialized successfully. Mode: ${dbConfig.socketPath ? 'Unix Socket' : 'TCP'}`);
    connection.release();
  })
  .catch(err => {
    console.error('Failed to initialize database pool:', err);
  });

export default db;
