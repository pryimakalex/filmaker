import { UploadForm } from '@/features/media/UploadForm';
import { Screen } from '@/shared/ui/Screen';

export default function UploadScreen() {
  return (
    <Screen scroll title="Upload" subtitle="Mock upload flow — no real video backend.">
      <UploadForm />
    </Screen>
  );
}
