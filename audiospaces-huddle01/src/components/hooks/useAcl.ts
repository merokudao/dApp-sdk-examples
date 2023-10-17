import { useContext } from 'react';
import { AudiospaceContext } from '../ClientComponents/HuddleProvider';

export const useAcl = () => {
  const client = useContext(AudiospaceContext);

  if (!client) {
    throw new Error('No Spaces Client found');
  }

  return {
    createCohost: client.createCohost,
    createSpeaker: client.createSpeaker,
    createListener: client.createListener,
    hostControls: client.hostControl,
    kickPeer: client.kickPeer,
  };
};
