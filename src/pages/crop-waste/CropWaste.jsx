import React, { useEffect, useState } from "react";
import Crop from "../../components/crop/Crop";
import "./crop.css"; // Import the CSS file for styling
import axios from "axios";

const crops = [
  {
    name: "Rice Husk",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d6/Rice_chaffs.jpg",
    use: "Rice husks are used for energy production (as biofuel), in construction materials (such as insulation boards and bricks), in animal bedding, and as a substrate for growing mushrooms.",
  },
  {
    name: "Wheat Straw",
    image:
      "https://bloximages.chicago2.vip.townnews.com/agupdate.com/content/tncms/assets/v3/editorial/c/92/c9245a56-201f-11ee-90d8-97d2f5fea2e6/64adab37bde27.image.jpg?resize=1200%2C675",
    use: "Wheat straw is used for animal bedding, as a raw material for producing biofuels (like ethanol), in mushroom cultivation, and as a construction material (for thatching roofs and making composite boards).",
  },
  {
    name: "Corn Cobs",
    image:
      "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/k%2Farchive%2F48eec6e193c6ed9fa556038d41a0ec14afd438e5",
    use: "Corn cobs can be used as a source of biofuel, as animal feed, in the production of industrial absorbents and abrasives, and as a filler material in biodegradable plastics.",
  },
  {
    name: "Tobacco Crop Residues",
    image:
      "https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,ar_4:3,f_auto,q_auto,g_auto/shape/cover/sport/istock-90652349-b968ee4969b4fa3aecf62406b6c44089.jpg",
    use: "Tobacco leaves and stems can be repurposed for natural insecticides, organic fertilizers, and as ingredients in pharmaceuticals and cosmetics. They can also improve soil quality when composted.",
  },
  {
    name: "Cotton Stalks and Leaves",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSU4kb-XMfaubLrHfmoP-KfZTVMo9VthmoHg&s",
    use: "Cotton stalks and leaves are used as raw materials for producing paper and cardboard, making compost, and producing biofuels. They are also used in manufacturing pressed wood products.",
  },
  {
    name: "Sugarcane Bagasse",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUo39ue7NMAX0L3EcWDITu2h9T4lJgp-RNyQ&s",
    use: "Castor bean husks and shells are used for producing biofuels and as a source of organic matter in agriculture. Castor oil extraction waste can be used as organic fertilizer or for biogas production.",
  },
];

const CropWaste = () => {
  const [cropwastes, setCropWastes] = useState(null);

  const fetchCropWastes = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get("http://localhost:8081/api/crops/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCropWastes(response.data);
        console.log(response);
        console.log("Crop wastes fetched successfully");
        console.log(cropwastes);
      })
      .catch((error) => {
        console.error("Error fetching crop wastes:", error);
      });
  };

  useEffect(() => {
    fetchCropWastes();
  }, []);

  return (
    <div className="crop my-4">
      <div className="w-40  left-container">
        <div>
          {cropwastes?.map((cropwaste, index) => (
            <div key={index} className="crop-waste-item bg-slate-950">
              <h2>{cropwaste.cropName}</h2>
              <p>Quantity: {cropwaste.quantity}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="crop1 hide-scrollbar ">
        {crops.map((crop, index) => (
          <Crop key={index} crop={crop} />
        ))}
      </div>
    </div>
  );
};

export default CropWaste;
