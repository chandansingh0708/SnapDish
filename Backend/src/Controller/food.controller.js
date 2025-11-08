const { uploadFiles } = require("../Storage/imagekit_storage");

const foodController = async (req, res) => {
  try {
    console.log("Partner Info:", req.partner);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploaded = await uploadFiles(req.file.buffer, req.file.originalname);
    
    const newFood=await 



    res.status(200).json({
      message: "Food uploaded successfully!",
      imageUrl: uploaded.url,
      fileId: uploaded.fileId,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
};

module.exports = { foodController };
