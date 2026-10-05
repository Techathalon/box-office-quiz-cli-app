import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is running 🚀',
  });
});

// Routes
routes(app);

export default app;
