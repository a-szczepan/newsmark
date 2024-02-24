const db = require("../database/db");
const User = require("../models/userModel")(db.sequelize, db.Sequelize);
const bcrypt = require("bcrypt");
const axios = require("axios");
const qs = require("qs");

const getGoogleOAuthTokens = async ({ code }, redirectURI) => {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_KEY,
    redirect_uri: redirectURI,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Google auth failed", error);
  }
};

const getGoogleUser = async (code, redirectURI) => {
  const { id_token, access_token } = await getGoogleOAuthTokens(
    { code },
    redirectURI
  );

  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Cannot get Google User: ", error);
  }
};

const createUserWithGoogle = async (email, googleId) => {
  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser)
      return { message: "Username or email is already registered" };

    const newUser = await User.create({ email, googleId });
    return newUser;
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Registration failed." });
  }
};

const getUserByGoogleId = async (googleId) => {
  try {
    const user = await User.findOne({ where: { googleId } });
    return user ? user : null;
  } catch (error) {
    console.error("Error retrieving user:", error);
  }
};

exports.registerWithPassword = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser)
      return res
        .status(409)
        .json({ message: "Username or email is already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    res.locals.user = {
      id: user.id,
      email: user.email,
    };

    return next();
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Registration failed." });
  }
};

exports.loginWithPassword = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid username or password" });

    res.locals.user = {
      id: user.id,
      email: user.email,
    };

    return next();
  } catch (error) {
    console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ message: "Login failed. Please try again later." });
  }
};

exports.registerWithGoogle = async (req, res, next) => {
  const code = req.query.code;
  try {
    const { id, email } = await getGoogleUser(
      code,
      process.env.REGISTER_GOOGLE_OAUTH_REDIRECT_URL
    );

    const existingUser = await User.findOne({ where: { googleId: id } });

    if (existingUser) {
      res.locals.user = {
        id: existingUser.id,
        email: existingUser.email,
      };

      res.locals.provider = "google";

      return next();
    }

    const user = await createUserWithGoogle(email, id);

    res.locals.user = {
      id: user.id,
      email: user.email,
    };

    res.locals.provider = "google";

    return next();
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Registration failed." });
  }
};

exports.loginWithGoogle = async (req, res, next) => {
  const code = req.query.code;
  try {
    const { id } = await getGoogleUser(
      code,
      process.env.LOGIN_GOOGLE_OAUTH_REDIRECT_URL
    );

    const user = await getUserByGoogleId(id);

    if (user == null)
      return res.status(404).json({ message: "User not found" });

    res.locals.user = {
      id: user.id,
      email: user.email,
    };

    res.locals.provider = "google";

    return next();
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Login failed." });
  }
};

exports.getCurrentUser = (req, res) => {
  if(res.locals.user)
  return res.status(200).send(res.locals.user);
};
