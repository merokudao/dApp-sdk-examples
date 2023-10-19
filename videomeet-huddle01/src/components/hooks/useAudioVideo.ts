import { useContext } from 'react';
import { VideoMeetContext } from '../ClientComponents/HuddleProvider';

export const useAudioVideo = () => {
  const client = useContext(VideoMeetContext);

  if (!client) {
    throw new Error('No Spaces Client found');
  }

  return {
    fetchAudioStream: client.fetchAudioStream,
    enumerateAudioDevices: client.enumerateMicDevices,
    produceAudio: client.produceAudio,
    stopAudioStream: client.stopAudioStream,
    stopProducingAudio: client.stopProducingAudio,
    fetchVideoStream: client.fetchVideoStream,
    produceVideo: client.produceVideo,
    stopVideoStream: client.stopVideoStream,
    stopProducingVideo: client.stopProducingVideo,
    enumerateVideoDevices: client.enumerateCamDevices,
  };
};
