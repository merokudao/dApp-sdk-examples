import { useContext } from 'react';
import { AudiospaceContext } from '../ClientComponents/HuddleProvider';

export const useAudio = () => {
  const client = useContext(AudiospaceContext);

  if (!client) {
    throw new Error('No Spaces Client found');
  }

  return {
    fetchAudioStream: client.fetchAudioStream,
    produceAudio: client.produceAudio,
    stopAudioStream: client.stopAudioStream,
    stopProducingAudio: client.stopProducingAudio,
  };
};
