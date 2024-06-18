import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import OpenSellModal from "./OpenSellModal";

export default function MultiActionAreaCard({ crop }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Card
      sx={{
        maxWidth: 345,
        background: "#1e1e1e",
        color: "#ffffff",
        borderRadius: "5px",
        border: "2px solid yello",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          image={crop.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "#ffffff" }}
          >
            {crop?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#ffffff" }}>
            {crop.use}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          sx={{ color: "#1919da", background: "#53d8d8" }}
          onClick={handleOpen}
        >
          Sell
        </Button>
      </CardActions>

      <OpenSellModal open={open} setOpen={setOpen} crop={crop} />
    </Card>
  );
}
