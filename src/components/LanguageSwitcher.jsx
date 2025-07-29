import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    console.log("Language changed to", lang);
  };

  return (
    <select
      onChange={handleChange}
      value={i18n.language}
      className="language-dropdown"
    >
      <option value="en">🇺🇸 English</option>
      <option value="tl">🇵🇭 Filipino</option>
      <option value="es">🇪🇸 Español</option>
      <option value="ja">🇯🇵 日本語</option>
      <option value="zh">🇨🇳 中文</option>
      <option value="ko">🇰🇷 한국어</option>
    </select>
  );
}
