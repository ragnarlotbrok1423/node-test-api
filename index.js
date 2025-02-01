const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const app = express();

app.use(express.json());
app.use(cors());

const user = [
  {
    id: 1,
    email: "erick.gonza12@gmail.com",
    password: "123456",
    name: "Erick",
    lastname: "Gonzalez",
    cellphone: "1234567890",
  },
  {
    id: 2,
    email: "jorge.j@gmail.com",
    password: "54321",
    name: "Jorge",
    lastname: "Jimenez",
    cellphone: "0987654321",
  },
];

app.get("/", (req, res) => {
  res.send("Api de prueba");
});

app.get("/api/user", (req, res) => {
  res.send(user);
});

app.post("/api/user", (req, res) => {
  const newUser = {
    id: user.length + 1,
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    lastname: req.body.lastname,
    cellphone: req.body.cellphone,
  };
  user.push(newUser);
  res.send(newUser);
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const userfound = user.find(
    (u) => u.email === email && u.password === password
  );
  if (userfound) {
    const key = crypto.randomBytes(16).toString("hex");
    res
      .status(200)
      .send({ message: "Usuario logeado correctamente", key: key });
  } else {
    res.status(401).send({ message: "Usuario o contraseña incorrecta" });
  }
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
