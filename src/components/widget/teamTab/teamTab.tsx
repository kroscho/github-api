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
import { useEffect, useState } from "react";
import { WorkerMessage } from "@/workers/workerMessages";

export const TeamTab = () => {
  const [memberCount, setMemberCount] = useState(0);

  const handleOpenTeamWindow = () => {
    sendIPC("open-team-window");
  };

  useEffect(() => {
    const worker = new SharedWorker(
      new URL("../../../workers/sharedWorker", import.meta.url)
    );

    worker.port.start();

    worker.port.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const message = event.data;
      if (message.type === "UPDATE_COUNT") {
        setMemberCount(message.count);
      }
    };
  }, []);

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
          Кол-во участников: {memberCount}
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
