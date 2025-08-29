import { NextResponse } from "next/server";
import User from "../../../models/user";
import { connectDB } from "../../../helper/db";

export async function POST(request) {
  await connectDB();
  const { name, email, userid, password } = await request.json();

  // Check if user already exists
  const existing = await User.findOne({ $or: [{ email }, { userid }] });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Create new user
  const user = new User({ name, email, userid, password });
  await user.save();
  return NextResponse.json({ message: "Signup successful", user });
}
