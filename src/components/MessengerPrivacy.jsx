import LegalPage from './LegalPage';
import { MESSENGER_BOT_PRIVACY } from '../content/legal';

export default function MessengerPrivacy() {
  return (
    <LegalPage
      path="/messenger-privacy"
      doc={MESSENGER_BOT_PRIVACY}
      otherLink={{ to: '/privacy', label: 'Website Privacy Policy' }}
    />
  );
}
