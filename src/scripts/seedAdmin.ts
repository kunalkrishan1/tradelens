import mongoose from 'mongoose';
import connectToDatabase from '../lib/mongodb';
import User from '../models/User';

async function seedAdmin() {
  console.log('--- TradeLens Admin Seeder ---');
  try {
    await connectToDatabase();

    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('✓ Admin user already exists. Skipping bootstrap.');
      process.exit(0);
    }

    const admin = new User({
      username: 'admin',
      email: 'admin@tradelens.trade',
      password: 'admin', // Will be hashed by pre-save hook
      role: 'admin',
      firstName: 'System',
      lastName: 'Administrator',
      isActive: true,
      isEmailVerified: true,
      mustChangePassword: true,
    });

    await admin.save();
    console.log('✓ Bootstrap admin user successfully created!');
    console.log('  Username: admin');
    console.log('  Role: admin');
    console.log('  Notice: mustChangePassword flag is set to true.');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('✗ Failed to seed admin user:', error);
    process.exit(1);
  }
}

seedAdmin();

