import LegalPage from './LegalPage';
import { PRIVACY } from '../content/legal';

export default function Privacy() {
  return <LegalPage path="/privacy" doc={PRIVACY} otherLink={{ to: '/terms', label: 'Terms of Use' }} />;
}
