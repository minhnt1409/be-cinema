import cloudinary from "../config/cloudinaryConfig.js"

const uploadImage = async (req, res) => {
  try {
    const images = req.files.map(file => file.path)

    const uploadedImages = []

    for (let image of images){
      const result = await cloudinary.uploader.upload(image)
      uploadedImages.push({
        url: result.secure_url,
        publicId: result.public_id,
      })
    }

    return res.status(200).json({
      message: "Upload iamge successfully!!!",
      data: uploadedImages,
    })
  } catch (error) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    })
  }
}

const removeImage = async (req, res) => {
  try {
    const publicId = req.params.publicId

    const results = await cloudinary.uploader.destroy('cinema/'+ publicId)

    if (results.result === "not found") {
      throw new Error("Delete image failded!!!")
    }

    return res.status(200).json({
      message: "Delete iamge successfully!!!",
    })
  } catch (error) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    })
  }
}

export default {
  uploadImage,
  removeImage
}