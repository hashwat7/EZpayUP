const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middlewares/middleware");

const signupBody = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  username: zod.string().email(),
  password: zod.string(),
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res
      .status(411)
      .json({ message: "Email already taken/ Invalid inputs" });
  }

  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(411).json({ message: "User already exists" });
  }

  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const user = await User.create({
    username,
    password,
    firstName,
    lastName,
  });

  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET);

  await Account.create({
    userId: userId,
    balance: 1 + Math.random() * 10000,
  });

  res.json({ message: "User created successfully", token });
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Invalid username/password" });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(user);
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({
      token,
    });
    return;
  }
  res.status(411).json({
    message: "Incorrect Email/Password",
  });
});

router.get("/username", authMiddleware, async (req, res) => {
  const user = await User.findOne({ _id: req.userId });

  res.json({ firstName: user.firstName, lastName: user.lastName });
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({ message: "Error while updating information" });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({ message: "User updated successfully" });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  console.log(filter);
  let users = [];
  const excludedUserId = req.userId;

  // Check if filter contains a space indicating full name search
  if (filter.includes(" ")) {
    const [firstName, lastName] = filter.split(" ");

    // Search by partial match for firstName and lastName
    if (lastName) {
      users = await User.find({
        $and: [
          { firstName: { $regex: firstName, $options: "i" } }, // Case insensitive
          { lastName: { $regex: `^${lastName}`, $options: "i" } }, // Case insensitive, starts with lastName
          { _id: { $ne: excludedUserId } }, // Exclude the specific user by _id
        ],
      });
    } else {
      users = await User.find({
        $and: [
          { firstName: { $regex: firstName, $options: "i" } }, // Case insensitive
          { _id: { $ne: excludedUserId } }, // Exclude the specific user by _id
        ],
      });
    }
  } else {
    // Search by partial match for firstName or lastName
    users = await User.find({
      $and: [
        {
          $or: [
            { firstName: { $regex: filter, $options: "i" } }, // Case insensitive
            { lastName: { $regex: filter, $options: "i" } }, // Case insensitive
          ],
        },
        { _id: { $ne: excludedUserId } }, // Exclude the specific user by _id
      ],
    });
  }

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
