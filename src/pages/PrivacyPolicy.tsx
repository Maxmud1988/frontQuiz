// src/pages/PrivacyPolicy.tsx
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, color: "#2ab4c0" }}>
        {t("privacyPolicy.title")}
      </Typography>
      <Box sx={{ textAlign: "justify", lineHeight: 1.6 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("privacyPolicy.welcome")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("privacyPolicy.intro")}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          1. {t("privacyPolicy.points.1")}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          2. {t("privacyPolicy.points.2")}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          3. {t("privacyPolicy.points.3")}
        </Typography>
        <Typography variant="body1">{t("privacyPolicy.contact")}</Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
