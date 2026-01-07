import { Button, ButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ButtonGroup size="small" variant="outlined" color="inherit">
      <Button
        onClick={() => changeLanguage("en")}
        variant={i18n.language === "en" ? "contained" : "outlined"}
      >
        EN
      </Button>
      <Button
        onClick={() => changeLanguage("ru")}
        variant={i18n.language === "ru" ? "contained" : "outlined"}
      >
        RU
      </Button>
    </ButtonGroup>
  );
};

