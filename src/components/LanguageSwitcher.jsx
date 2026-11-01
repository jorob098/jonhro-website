import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../i18n";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <select
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      value={i18n.resolvedLanguage || "en"}
      className="language-dropdown"
      aria-label={t("nav.Language")}
    >
      {LANGUAGES.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
