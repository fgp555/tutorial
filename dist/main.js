const express = require("express");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(morgan("dev")); // Muestra logs concisos en consola (GET / - 200)

app.get("/", (req, res) => {
  res.send("Hello Express Server 19:39");
});

// Puerto configurable con fallback
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
