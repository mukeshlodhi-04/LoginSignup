require('dotenv').config();
const express = require('express')
const cors = require('cors');
require('./models/db');
const productRoute = require('./routes/product.route');
const authRoute = require("./routes/auth.route");
const bodyParser = require('body-parser');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require("cloudinary").v2;
const multer = require('multer');
const db = require('./models/db');


const app = express()
app.use(cors({
  origin: 'http://localhost:5174', // Allow requests from frontend origin
  methods: ['POST', 'GET', 'PUT', 'DELETE'], // Allow relevant HTTP methods
  credentials: true // if you’re handling cookies/auth
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


PORT = process.env.PORT;

app.use('/api/auth',authRoute);
app.use('/api/products',productRoute);


app.get('/', (req, res) => {
    res.send("testing ")
  })

  cloudinary.config({
     cloud_name: "fileupload005",
      api_key: "547862391189388",
      api_secret: "rDsg0XG-c6Sa8ltHU_wHbZsq540",
  });
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "uploads", // Folder name in Cloudinary
      allowed_formats: ["jpg", "png", "jpeg", "webp"], // Allowed file types
    },
  });
  
  
  const upload = multer({ storage });
  
  // API Endpoint for Upload
  app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "File not uploaded!" });
    }
  
    res.status(200).json({
      message: "File uploaded successfully!",
      fileUrl: req.file.path, // Cloudinary URL
    });
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})