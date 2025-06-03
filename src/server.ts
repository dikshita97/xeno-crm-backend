import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connectDB } from './config/db';
import { initGooglePassport } from './utils/passportGoogle';
import authRoutes from './routes/auth';
import segmentRoutes from './routes/segment';
import campaignRoutes from './routes/campaign';
import vendorRoutes from './routes/vendor';

dotenv.config();
(async () => {
  await connectDB(process.env.MONGODB_URI!);
})();

initGooglePassport();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/segments', segmentRoutes);
app.use('/campaigns', campaignRoutes);
app.use('/vendor', vendorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on :${PORT}`));
