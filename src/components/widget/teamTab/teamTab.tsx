import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import TeamImg from "@/assets/images/team.webp";
import { sendIPC } from "@/utils";

export const TeamTab = () => {
  const handleOpenTeamWindow = () => {
    sendIPC("open-team-window");
  };

  return (
    <Card sx={{ minWidth: 300, maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="team img"
        height="140"
        image={TeamImg}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Моя команда
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Кол-во участников: 10
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpenTeamWindow}>
          Редактировать
        </Button>
      </CardActions>
    </Card>
  );
};
