import React, { FC } from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";

interface ResultCardProps {
  imageUrl: string;
  imageDescription: string | undefined;
}

const ResultCard: FC<ResultCardProps> = ({ imageUrl, imageDescription }) => {
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
          <img className="result-image" src={imageUrl} alt="result" />
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {imageDescription ? imageDescription : ""}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
