import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Dynamically load the VideoCall component (because it uses `window` object)
const VideoCall = dynamic(() => import("@com/_organisms/VideoCall"), {
  ssr: false,
});

export default function VideoPage() {
  const router = useRouter();
  const { roomId } = router.query;

  if (!roomId) {
    return <p>Loading...</p>;
  }

  return (
    <VideoCall roomId={roomId} />
  );
}
