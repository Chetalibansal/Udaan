import { sign } from "jsonwebtoken";

const generateToken = (id, role) => {
  return sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// in login/register success:
res.json({
  _id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user._id, user.role)
});
