import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("app")}</h1>
    </div>
  );
}
