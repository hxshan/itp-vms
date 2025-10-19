const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/userModel");

const MONGO_URI = "mongodb+srv://it22316318_db_user:pfpYznANBxtG2Gdu@vms.yjwifut.mongodb.net/"; 

const seedSuperAdminUser = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to DB");

    const roleId = "68d26ad64e3719bfbb1b2d8f"; // SUPER_ADMIN role _id
    const email = "superadmin@admin.com";

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Super admin already exists:", existing.email);
      process.exit(0);
    }

    // const passwordHash = await bcrypt.hash("SuperSecure123!", 10);

    const user = await User.create({
      firstName: "Super",
      lastName: "Admin",
      gender: "Other",
      dob: new Date("1990-01-01"),
      phoneNumber: "0000000000",
      nicNumber: "000000000V",
      status: "active",
      email,
      password: 'password1234',
      role: roleId,
      department: "Administration",
      jobTitle: "System Owner",
      employmentDate: new Date(),
      baseSalary: 0,
    });

    console.log("✅ Super Admin created:", user.email);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

seedSuperAdminUser();
