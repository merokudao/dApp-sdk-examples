// Components
import IntroPage from '@/components/IntroPage/IntroPage';
import { AudioSpacesClient } from '@dapp-sdk/audiospaces-huddle01';

interface RoomDetails {
  message: string;
  data: {
    roomId: string;
  };
}

export default async function Home() {
  const apiKey = process.env.NEXT_PUBLIC_HUDDLE_API_KEY ?? '';
  const {
    data: { roomId },
  } = await AudioSpacesClient.createMeet(apiKey, [], 'Test Audio Spaces');

  return <IntroPage roomId={roomId} />;
}
