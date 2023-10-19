import { useContext } from 'react';
import { VideoMeetContext } from '../ClientComponents/HuddleProvider';

const useMeet = () => {
  const spacesClient = useContext(VideoMeetContext);
  if (!spacesClient) {
    throw new Error('No Spaces Client found');
  }

  return {
    client: spacesClient,
    joinLobby: spacesClient.joinLobby,
    leaveLobby: spacesClient.leaveLobby,
    joinMeet: spacesClient.joinMeet,
    leaveMeet: spacesClient.leaveMeet,
    endMeet: spacesClient.endMeet,
  };
};

export default useMeet;
