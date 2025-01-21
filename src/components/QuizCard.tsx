// src/components/QuizCard.tsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const QuizCard: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card sx={{ width: isMobile ? "100%" : "300px", margin: "16px" }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
