const fs = require("fs");
const path = require("path");

const uploadFiles = (req, res) => {
  try {
    const files = req.files; // Access uploaded files
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Process files as needed
    res.status(200).json({
      message: "Files uploaded successfully",
      files: files.map((file) => ({
        originalName: file.originalname,
        uploadedName: file.filename,
        size: file.size,
        mimeType: file.mimetype,
      })),
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error uploading files", error: err.message });
  }
};

const getFiles = (req, res) => {
  let { folder = "" } = req.params;
  
  // const baseUrl = `${req.protocol}://${req.get("host")}/files/shared`; 
  
  folder =folder.split(',') ||[]
  
  const sharedFolderPath = path.join(process.env.SHARED_FOLDER, ...folder);
  console.log(sharedFolderPath);


  // Read directory contents
  fs.readdir(sharedFolderPath, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Unable to access shared folder" });
    }

    // Fetch file details (extension and stats)
    const fileDetails = files.map((file) => {
      const filePath = path.join(sharedFolderPath, file);

      // Get file stats
      const stats = fs.statSync(filePath);

      return {
        name: file,
        extension: path.extname(file), // Extract file extension
        isDirectory: stats.isDirectory(), // Check if it's a folder
        size: stats.size, // File size in bytes
        uniqueId: stats.ino, // Inode number as a unique identifier (optional)
        // url:
        //   !stats.isDirectory() && isImage(file) // Check if the file is an image
        //     ? `${baseUrl}/${encodeURIComponent(file)}`
        //     : null,
      };
    });

    res.status(200).json(fileDetails);
  });
};


const isImage = (fileName) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
  return imageExtensions.includes(path.extname(fileName).toLowerCase());
};

module.exports = { uploadFiles, getFiles };
