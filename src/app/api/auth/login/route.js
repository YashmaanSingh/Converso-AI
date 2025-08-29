import { NextResponse } from "next/server";
import User from "../../../models/user";
import { connectDB } from "../../../helper/db";

export async function POST(request) {
  await connectDB();
  const { userid, password } = await request.json();

  const user = await User.findOne({ userid });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }
  // Debug: log user and password
  console.log("User found:", user);
  console.log("Password from DB:", user.password, "Password from input:", password);
  if (user.password !== password) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Redirect to chat page on successful login
  const baseUrl = request.nextUrl.origin;
  return NextResponse.redirect(baseUrl + "/chat");
}
