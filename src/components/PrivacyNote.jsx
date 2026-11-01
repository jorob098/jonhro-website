import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PrivacyNote() {
  const { t } = useTranslation();
  return (
    <p className="privacy-note">
      {t('form.privacyNote')} <Link to="/privacy">{t('footer.privacy')}</Link>.
    </p>
  );
}
