interface Props {
  url: string;
}

function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

function sanitizeVideoId(videoId: string): string | null {
  const sanitized = videoId.replace(/[^a-zA-Z0-9_-]/g, "");
  if (sanitized !== videoId) {
    return null;
  }
  return sanitized;
}

export function YouTubeEmbed({ url }: Props) {
  const rawVideoId = getYouTubeId(url);
  const videoId = rawVideoId ? sanitizeVideoId(rawVideoId) : null;

  if (!videoId) {
    return (
      <div className="bg-gray-200 rounded-lg p-4 text-gray-500">
        動画を読み込めません
      </div>
    );
  }

  return (
    <div className="relative w-full pt-[56.25%]">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
