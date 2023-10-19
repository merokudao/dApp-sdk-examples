'use client';

import { VideoMeetClient } from '@dapp-sdk/videomeet-huddle01';
import dynamic from 'next/dynamic';
import React, { createContext } from 'react';

type ToasterProps = {
  children: React.ReactNode;
};

export const VideoMeetContext = createContext<VideoMeetClient | null>(null);

const HuddleProvider: React.FC<ToasterProps> = ({ children }) => {
  const huddleClient = new VideoMeetClient(
    process.env.NEXT_PUBLIC_HUDDLE_PROJECT_ID ?? ''
  );
  return (
    <VideoMeetContext.Provider value={huddleClient}>
      <main>{children}</main>
    </VideoMeetContext.Provider>
  );
};
export default HuddleProvider;
