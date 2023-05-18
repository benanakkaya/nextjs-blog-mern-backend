import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {

  try {

    const { username, email, password } = req.body;

    const userCheck = await User.findOne({ username });

    if (userCheck) {
      return res.status(500).json({ message: "Böyle bir kullanıcı zaten var" });
    }

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return res.status(500).json({ message: "Bu e-mail zaten kayıtlı." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const CreatedUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "Kullanıcı başarıyla oluşturuldu.", user: CreatedUser });

  } catch (error) {
    return res.status(500).json({ error });

  }
};

export const Login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({ message: "Kayıtlı e-mail bulunamadı!" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(500).json({ message: "Parola yanlış." });
    }

    const token = jwt.sign(
      { userID: user._id, username: user.username },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Giriş işlemi başarılı!", token });

  } catch (err) {

    return res.status(500).json({ error: err });

  }
};
