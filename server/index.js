const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const adminModel = require("./models/admin");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors({
  origin:["https://crud-mern-front-three.vercel.app","https://crud-mern-front-three.vercel.app/add","https://crud-mern-front-three.vercel.app/studens","https://crud-mern-front-three.vercel.app/getImage","https://crud-mern-front-three.vercel.app/register","https://crud-mern-front-three.vercel.app/login","https://crud-mern-front-three.vercel.app/update-user/:id","https://crud-mern-front-three.vercel.app/delete-user/:id","https://crud-mern-front-three.vercel.app/admin-info"],
  methods:["POST","DELETE","GET","DELETE","PUT"],
  credentials:true
}));
mongoose.connect(
  "mongodb+srv://tarik:tarik@cluster0.dxik4tm.mongodb.net/?retryWrites=true&w=majority"
);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/add", upload.single("file"), async (req, res) => {
  const { firstName, lastName, email, enrollNumber, phone } = req.body;
  const image = req.file.filename;

  try {
    const student = await userModel.create({
      firstName,
      lastName,
      email,
      phone,
      enrollNumber,
      image,
    });

    res.send("New student has been added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding student");
  }
});
app.get("/getImage", (req, res) => {
  userModel
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.post("/register", async (req, res) => {
  const userEmail = req.body.email;
  const userPwd = req.body.password;
  const addedUser = new adminModel({
    email: userEmail,
    password: userPwd,
  });
  try {
    await addedUser.save();
    res.send("new user have been created");
  } catch (err) {
    console.log(err);
  }
});
app.get("/students", async (req, res) => {
  userModel.find({}).then((data) => res.send(data));
});
app.post("/login", async (req, res) => {
  const adminEmail = req.body.email;
  const adminPwd = req.body.password;
  const checkAdmin = await adminModel.findOne({ email: adminEmail });
  if (!checkAdmin) {
    return res.send("this user doesn't exist");
  }
  const checkPwd = await bcrypt.compare(adminPwd, checkAdmin.password);
  if (checkPwd) {
    res.send("garanted acces");
  } else {
    res.send("incorrect password");
  }
});
app.put("/update-user/:id", async (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndUpdate(
      { _id: id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        enrollNumber: req.body.enrollNumber,
      },
      { new: true }
    )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});
app.delete("/delete-user/:id", async (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});
app.get("/admin-info", async (req, res) => {
  adminModel.find({}).then((data) => res.send(data));
});
app.listen(8000, () => {
  console.log("server running on port 8000");
});
