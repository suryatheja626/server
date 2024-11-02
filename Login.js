const bcrypt = require("bcrypt");
const user = require("../../models/user");
const { createtoken } = require("./path/to/your/token/module"); // Adjust the path as necessary

const loginUser  = async (req, res) => {
  try {
    const login = await user.findOne({
      email: req.body.email,
    });

    if (!login) {
      res.status(404).json({
        message: "Email not found",
        status: "404 Not Found",
      });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      login.password
    );

    if (!validPassword) {
      res.status(400).json({
        message: "Invalid password",
        status: "400 Bad Request",
      });
      return;
    }

    const token = createtoken(login._id.toString());

    res.status(200).json({
      name: login.name,
      email: login.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "500 Internal Server Error, User not logged in",
    });
  }
};

module.exports = { loginUser  };