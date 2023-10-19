import { useContext } from 'react';
import { VideoMeetContext } from '../ClientComponents/HuddleProvider';

export const useAcl = () => {
  const client = useContext(VideoMeetContext);

  if (!client) {
    throw new Error('No Spaces Client found');
  }

  return {
    createCohost: client.createCohost,
    hostControls: client.hostControl,
    kickPeer: client.kickPeer,
  };
};
