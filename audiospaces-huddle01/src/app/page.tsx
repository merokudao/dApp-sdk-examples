// Components
import IntroPage from '@/components/IntroPage/IntroPage';
import {
  AudioSpacesClient,
  ICreateSpacesResponse,
} from '@dapp-sdk/audiospace-huddle01';
import axios from 'axios';

export default async function Home() {
  const apiKey = process.env.NEXT_PUBLIC_HUDDLE_API_KEY ?? '';
  const { data } = await axios.request<ICreateSpacesResponse>({
    method: 'POST',
    url: 'https://api.huddle01.com/api/v1/create-room',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    data: {
      title: 'Test Audio Spaces Room',
      hostWallets: [],
      roomType: 'AUDIO',
    },
  });

  return <IntroPage roomId={data.data.roomId} />;
}
