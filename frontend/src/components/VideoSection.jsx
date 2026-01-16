import { useState, useEffect, useRef } from "react";

export default function VideoSection({
  videoUrl,
  thumbnail,
  title,
  autoPlay = false,
  showControls = true,
  loop = false,
  aspectRatio = "16:9",
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailShown, setThumbnailShown] = useState(!!thumbnail);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 640,
    height: 360,
  });
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const maxWidth = 1300;
      const width = Math.min(containerWidth, maxWidth);

      // Calculate height based on aspect ratio
      const [aspectWidth, aspectHeight] = aspectRatio.split(":").map(Number);
      const height = (width * aspectHeight) / aspectWidth;

      setVideoDimensions({ width, height });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [aspectRatio]);

  // Start playing video when thumbnail is clicked
  const handleThumbnailClick = () => {
    setThumbnailShown(false);
    setIsPlaying(true);

    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
        // Fallback for browsers that block autoplay
        setIsPlaying(false);
      });
    }
  };

  if (!videoUrl) {
    return (
      <div className="text-center p-4 text-gray-500">
        No video link provided
      </div>
    );
  }

  return (
    <div className="my-8">
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
      )}

      <div
        ref={containerRef}
        className="flex justify-center items-center p-4 w-full"
      >
        <div className="relative w-full max-w-screen-xl rounded-lg shadow-lg overflow-hidden">
          {/* Custom play button overlay */}
          {thumbnailShown && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer group"
              onClick={handleThumbnailClick}
            >
              <div className="bg-black bg-opacity-40 rounded-full p-4 group-hover:bg-opacity-60 transition-all">
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Thumbnail */}
          {thumbnailShown && thumbnail && (
            <img
              src={thumbnail}
              alt="Video thumbnail"
              className="w-full h-auto rounded-lg"
              style={{
                width: videoDimensions.width,
                height: videoDimensions.height,
                objectFit: "cover",
              }}
            />
          )}

          {/* Video player */}
          <video
            ref={videoRef}
            src={videoUrl}
            width={videoDimensions.width}
            height={videoDimensions.height}
            controls={showControls}
            loop={loop}
            playsInline
            className="rounded-lg w-full"
            style={{ display: thumbnailShown ? "none" : "block" }}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      </div>
    </div>
  );
}
