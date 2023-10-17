import { useContext } from 'react';
import { AudiospaceContext } from '../ClientComponents/HuddleProvider';

export const useAppUtils = () => {
  const client = useContext(AudiospaceContext);

  if (!client) {
    throw new Error('No Spaces Client found');
  }

  return {
    setAvatar: client.setAvatar,
    setDisplayName: client.setDisplayName,
    sendData: client.sendData,
  };
};
