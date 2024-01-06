const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema(
    {
        image: { type: String, required: false },
    },
    );

ImageSchema.set("timestamps", true);

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;