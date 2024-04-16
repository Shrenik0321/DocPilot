import multer from "multer";

// setting up upload strategy
const inMemoryStorage = multer.memoryStorage();

const fileUploadMiddleware = (req, res, next) => {
  const upload = multer({ storage: inMemoryStorage }).fields([
    { name: "file", maxCount: 1 },
  ]);

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(400).json({ message: "File upload error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err });
    }
    next();
  });
};

export default fileUploadMiddleware;
