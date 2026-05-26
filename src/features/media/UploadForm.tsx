import { useState } from 'react';
import { Text, View } from 'react-native';

import { mediaService } from '@/services/api/media.service';
import { projectsService } from '@/services/api/projects.service';
import { useQuery } from '@/shared/hooks/useQuery';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { TextField } from '@/shared/ui/TextField';
import type { ReelUploadProgress } from '@/types/media';

const STATUS_LABELS: Record<ReelUploadProgress, string> = {
  idle: 'Ready',
  creating_upload: 'Preparing…',
  uploading: 'Uploading…',
  processing: 'Processing…',
  ready: 'Done',
  failed: 'Failed',
};

type Props = {
  onComplete?: () => void;
};

export function UploadForm({ onComplete }: Props) {
  const projects = useQuery(() => projectsService.listProjects());

  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState<string | undefined>();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [status, setStatus] = useState<ReelUploadProgress>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  function selectMockVideo() {
    setSelectedFile(`reel-${Date.now()}.mp4`);
    setError('');
  }

  async function upload() {
    if (!title.trim() || !selectedFile) {
      setError('Add a title and select a video.');
      return;
    }

    setError('');
    setStatus('uploading');

    try {
      await mediaService.uploadMediaMock(
        { title: title.trim(), projectId },
        (nextStatus, nextProgress) => {
          setStatus(nextStatus);
          setProgress(nextProgress);
        },
      );
      onComplete?.();
    } catch (err) {
      setStatus('failed');
      setError(err instanceof Error ? err.message : 'Upload failed');
    }
  }

  const isUploading = status === 'uploading' || status === 'processing';

  return (
    <View className="gap-5">
      <Card className="items-center gap-3 border-dashed py-8">
        <Text className="text-3xl text-accent/60">🎬</Text>
        <Text className="text-center text-base text-white">
          {selectedFile ?? 'Video picker placeholder'}
        </Text>
        <Button
          label={selectedFile ? 'Change file' : 'Select video'}
          variant="secondary"
          onPress={selectMockVideo}
        />
      </Card>

      <TextField
        label="Title"
        value={title}
        onChangeText={setTitle}
        placeholder="Festival teaser"
      />

      {projects && projects.length > 0 ? (
        <View className="gap-2">
          <Text className="text-sm text-muted">Project (optional)</Text>
          <View className="flex-row flex-wrap gap-2">
            <Button
              label="None"
              size="sm"
              variant={!projectId ? 'primary' : 'secondary'}
              onPress={() => setProjectId(undefined)}
            />
            {projects.map((project) => (
              <Button
                key={project.id}
                label={project.title}
                size="sm"
                variant={projectId === project.id ? 'primary' : 'secondary'}
                onPress={() => setProjectId(project.id)}
              />
            ))}
          </View>
        </View>
      ) : null}

      {status !== 'idle' ? (
        <Card className="gap-2">
          <Text className="text-sm text-white">{STATUS_LABELS[status]}</Text>
          <View className="h-2 overflow-hidden rounded-full bg-surface-elevated">
            <View
              className="h-full bg-accent"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </View>
        </Card>
      ) : null}

      {error ? <Text className="text-sm text-danger">{error}</Text> : null}

      <Button label="Upload (mock)" loading={isUploading} onPress={upload} />
    </View>
  );
}
