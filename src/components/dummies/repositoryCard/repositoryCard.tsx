import { FC } from "react";
import { styled } from "@mui/system";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Link,
  Stack,
  Chip,
} from "@mui/material";

const RepositoryCardContainer = styled(Card)({
  width: "100%",
});

interface RepositoryCardProps {
  name: string;
  repoUrl: string;
  description?: string | null;
  createdAt: string;
  cloneUrl: string;
  languages: string[];
}

export const RepositoryCard: FC<RepositoryCardProps> = ({
  name,
  repoUrl,
  description,
  createdAt,
  cloneUrl,
  languages,
}) => {
  return (
    <RepositoryCardContainer key={name}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h6">
          <Link
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            color="textPrimary"
            underline="none"
          >
            {name}
          </Link>
        </Typography>
        {description && (
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        )}
        {languages.length && (
          <Stack direction="row" gap={1} alignItems="center" flexWrap={"wrap"}>
            <Typography variant="body2" color="textSecondary">
              Языки:
            </Typography>
            <Stack direction="row" gap={1} flexWrap={"wrap"} marginBottom="2px">
              {languages.map((lang) => (
                <Chip key={lang} label={lang} size="small" />
              ))}
            </Stack>
          </Stack>
        )}
        <Typography variant="body2" color="textSecondary">
          Дата создания: {new Date(createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          href={cloneUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Клонировать
        </Button>
      </CardActions>
    </RepositoryCardContainer>
  );
};
