const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middlewares");
const userApi = require("./routes/user");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// All Routes
app.use("/user", userApi);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    })
  )
  .catch((e) => console.log(e));
