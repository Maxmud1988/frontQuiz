import React from "react";
import { Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // Метод для смены языка
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, p: 2 }}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => changeLanguage("en")}
      >
        EN
      </Button>
      <Button
        variant="outlined"
        size="small"
        onClick={() => changeLanguage("ru")}
      >
        RU
      </Button>
      <Button
        variant="outlined"
        size="small"
        onClick={() => changeLanguage("uz")}
      >
        UZ
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;
