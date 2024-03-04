const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const rateLimiter = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const credentials = require("./middleware/credentials");

const port = process.env.PORT || 3001;
const windowMs = process.env.WINDOW;
const max = process.env.MAX_REQUEST;
const message = process.env.RATE_LIMIT_MESSAGE;

const {
  handleUnknownRoute,
  handleError,
  errorHandler,
} = require("./middleware/error");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");
const imageRoutes = require("./api/routes/images");
const categoryRoutes = require("./api/routes/categories");
const reviewsRoutes = require("./api/routes/reviews");
const wishlistRoutes = require("./api/routes/wishlist");
const profileRoutes = require("./api/routes/profile");
const trackingRoutes = require("./api/routes/tracking");
const cartRoutes = require("./api/routes/cart");
const corsOptions = require("./config/corsOptions");

app.use(rateLimiter({ windowMs, max, message }));
// Handle options credentials check - before CORS!
app.use(credentials);
//app.use(cors(corsOptions));
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
}); */

app.get("/", (req, res) => {
  res.render("index.html");
});
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/user", userRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/cart", cartRoutes);
//app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));

// app.use(errorHandler);
app.all("*", handleUnknownRoute);
app.use(handleError);

/* app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
}); */

app.listen(port, () => {
  console.log("Server running on port 3001");
});

module.exports = app;
