'use client';

import { useEffect, useRef } from 'react';

import Hls from 'hls.js';

type Props = {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  controls?: boolean;
  ariaHidden?: boolean;
  ariaLabel?: string;
};

export function LocalHlsVideo({
  src,
  poster,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = 'metadata',
  controls = false,
  ariaHidden,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = muted;
    video.loop = loop;
    video.playsInline = playsInline;

    const canNative = video.canPlayType('application/vnd.apple.mpegURL');
    if (canNative) {
      video.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls({ maxBufferLength: 10, maxMaxBufferLength: 30 });
      hls.loadSource(src);
      hls.attachMedia(video);
      hlsRef.current = hls;
    }

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (autoPlay) video.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, autoPlay, muted, loop, playsInline]);

  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={preload}
      controls={controls}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
    />
  );
}
