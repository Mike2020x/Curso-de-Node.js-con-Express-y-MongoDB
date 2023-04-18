const express = require("express");
const cookieSession = require("cookie-session");
const app = express();
//middlewares
const logger = (req, res, next) => {
  console.log("Nueva petición HTTP");
  next();
};
app.set("view engine", "pug");
app.set("views", "views");
app.use(
  cookieSession({
    secret: "una_cadena_secreta",
    maxAge: 24 * 60 * 660 * 1000,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
//Muestra la lista de notas
app.get("/", (req, res) => {
  const notes = req.session.notes || [];
  res.render("index", { notes });
});
//Muestra el formulario para crear una nota
app.get("/notes/new", (req, res) => {
  res.render("new");
});
//Permite crear una nota
app.post("/notes", (req, res) => {
  req.session.id = (req.session.id || 0) + 1;
  const id = req.session.id;
  req.session.notes = req.session.notes || [];
  req.session.notes.push({
    id: id,
    title: req.body.title,
    body: req.body.body,
  });
  res.redirect("/");
});

app.listen(3000, () => console.log("Listening on port 3000"));
