const CLOUD_NAME = "drg3pojou";

const uplod_preset = "media-social";

export const uploadToCloudinary = async (file, fileType) => {
  if (file && fileType) {
    const data = new FormData();
    console.log(file, "file");
    data.append("file", file);
    data.append("upload_preset", uplod_preset);
    data.append("cloud_name", CLOUD_NAME);
    data.append("resource_type", fileType);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${fileType}/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    console.log(result, "result");
    return result.url;
  } else {
    console.log("Please provide file and fileType");
  }
};
