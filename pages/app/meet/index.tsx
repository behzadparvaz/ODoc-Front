import dynamic from 'next/dynamic';

const VideoCall = dynamic(() => import('@com/_organisms/VideoCall'), {ssr: false});

const Meet = () => <div>
  <VideoCall roomId={'testRoom'} />
</div>

export default Meet
