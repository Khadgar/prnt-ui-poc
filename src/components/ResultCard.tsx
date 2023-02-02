import React, { FC, useContext } from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import AppContext from "../contexts/AppContext";

interface ResultCardProps {
  imageUrl: string | undefined;
  imageDescription: string | undefined;
}

const ResultCard: FC<ResultCardProps> = ({ imageUrl, imageDescription }) => {
  const { newImageUrl } = useContext(AppContext);

  if (!newImageUrl) {
    return <></>;
  }
  return (
    <Card>
      <CardContent>
        <Typography
          paragraph
          sx={{ fontSize: 20 }}
          color="text.primary"
          gutterBottom
        >
          Generated Image
        </Typography>
        <Stack alignItems="center" spacing={2}>
          <img className="result-image" src={newImageUrl} alt="result" />
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {imageDescription ? imageDescription : ""}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
