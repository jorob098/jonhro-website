import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about">
  <div class="container">
    <h2>{t("aboutPage.Licensed Customs Broker in Cebu — Your Trusted Trade Partner")}</h2>
    <p>
      {t("aboutPage.Since passing the PRC Customs Broker Licensure Examination in 2011, I’ve dedicated over a decade to helping businesses in Cebu and beyond navigate the complexities of import and export. As a freelance customs broker, I provide not just compliance—but clarity, speed, and strategic value in every transaction.",
    )}</p>
    <p>
      {t("aboutPage.Whether you’re a small business exploring international markets or a growing enterprise managing complex shipments, I tailor solutions that prioritize efficiency, transparency, and results. My services go beyond processing documents—I become your partner in achieving smooth and cost-effective customs clearance.",
   )}</p>
    <p>
      {t("aboutPage.If youre looking for a reliable, licensed customs broker who understands the pulse of Philippine trade and the demands of global logistics, let’s work together to move your goods smarter and faster."
    )}</p>
    <a href="#contact" class="cta-button">{t("aboutPage.Work With Me")}</a>
  </div>
</section>

  );
}