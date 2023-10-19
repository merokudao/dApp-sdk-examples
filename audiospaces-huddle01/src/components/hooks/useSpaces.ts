import { useContext } from 'react';
import { AudiospaceContext } from '../ClientComponents/HuddleProvider';

const useSpaces = () => {
  const spacesClient = useContext(AudiospaceContext);
  if (!spacesClient) {
    throw new Error('No Spaces Client found');
  }

  return {
    client: spacesClient,
    joinLobby: spacesClient.joinLobby,
    leaveLobby: spacesClient.leaveLobby,
    joinSpace: spacesClient.joinSpace,
    leaveSpace: spacesClient.leaveSpace,
    endSpace: spacesClient.endSpace,
  };
};

export default useSpaces;
