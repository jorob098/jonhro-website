import LegalPage from './LegalPage';
import { TERMS } from '../content/legal';

export default function Terms() {
  return <LegalPage path="/terms" doc={TERMS} otherLink={{ to: '/privacy', label: 'Privacy Policy' }} />;
}
