'use client';

import { useEffect, useRef, useState } from 'react';

import type Hls from 'hls.js';

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
  loadOnVisible?: boolean;
  /**
   * Delay the stream download: `idle` waits until the page has loaded and the
   * browser is idle; `interaction` waits for the visitor's first interaction,
   * or for the page to have been idle for a while.
   */
  deferUntil?: 'idle' | 'interaction';
  rootMargin?: string;
  /** Second to start playback from and to loop back to, e.g. to skip an intro. */
  startAt?: number;
  onPlaying?: () => void;
};

type NetworkInformation = { saveData?: boolean };

const INTERACTION_EVENTS = [
  'pointerdown',
  'pointermove',
  'touchstart',
  'keydown',
  'wheel',
  'scroll',
] as const;

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
  loadOnVisible = false,
  deferUntil,
  rootMargin = '200px',
  startAt,
  onPlaying,
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  // Native looping restarts from 0, so loop by hand when starting mid-video.
  const loopNatively = loop && !startAt;

  useEffect(() => {
    if (shouldLoad) return;

    const video = ref.current;
    if (!video) return;

    // Visitors on data saver keep the poster only.
    const connection = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;
    if (connection?.saveData) return;

    let cancelled = false;
    let observer: IntersectionObserver | undefined;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const start = () => {
      if (!cancelled) setShouldLoad(true);
    };

    // Let the first render and the largest paint finish before the stream
    // competes for bandwidth and main-thread time.
    const startWhenIdle = () => {
      const delay = deferUntil === 'interaction' ? 6000 : 1500;
      timeoutId = window.setTimeout(() => {
        // Safari has no requestIdleCallback.
        if (typeof window.requestIdleCallback === 'function') {
          idleId = window.requestIdleCallback(start, { timeout: 2500 });
        } else {
          start();
        }
      }, delay);
    };

    const schedule = () => {
      if (!deferUntil) return start();
      if (deferUntil === 'interaction') {
        INTERACTION_EVENTS.forEach((type) =>
          window.addEventListener(type, start, { once: true, passive: true })
        );
      }
      if (document.readyState === 'complete') startWhenIdle();
      else window.addEventListener('load', startWhenIdle, { once: true });
    };

    if (loadOnVisible && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          observer?.disconnect();
          schedule();
        },
        { rootMargin }
      );
      observer.observe(video);
    } else {
      schedule();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.removeEventListener('load', startWhenIdle);
      INTERACTION_EVENTS.forEach((type) =>
        window.removeEventListener(type, start)
      );
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [shouldLoad, loadOnVisible, deferUntil, rootMargin]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !shouldLoad) return;

    video.muted = muted;
    video.loop = loopNatively;
    video.playsInline = playsInline;

    const seekToStart = () => {
      if (startAt) video.currentTime = startAt;
    };
    const restart = () => {
      seekToStart();
      video.play().catch(() => {});
    };
    if (loop && startAt) video.addEventListener('ended', restart);

    let cancelled = false;
    const playNatively = () => {
      if (cancelled || !video.canPlayType('application/vnd.apple.mpegURL')) {
        return;
      }
      // Before a source is set, currentTime becomes the default start position.
      seekToStart();
      video.addEventListener('loadedmetadata', seekToStart, { once: true });
      video.src = src;
      if (autoPlay) video.play().catch(() => {});
    };

    // hls.js goes first even where HLS plays natively: native players fetch the
    // first segment before seeking to startAt. Native playback is the fallback
    // for browsers without Media Source Extensions (older iPhones).
    // Loaded on demand so the player never weighs on the initial bundle.
    import('hls.js')
      .then(({ default: HlsPlayer }) => {
        if (cancelled) return;
        if (!HlsPlayer.isSupported()) return playNatively();

        const hls = new HlsPlayer({
          startPosition: startAt ?? -1,
          maxBufferLength: 10,
          maxMaxBufferLength: 30,
        });
        hls.on(HlsPlayer.Events.ERROR, (_event, data) => {
          // Fall back to the poster instead of a frozen frame.
          if (data.fatal) {
            hls.destroy();
            hlsRef.current = null;
          }
        });
        hls.loadSource(src);
        hls.attachMedia(video);
        hlsRef.current = hls;
        if (autoPlay) video.play().catch(() => {});
      })
      .catch(playNatively);

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (autoPlay) video.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibility);
      video.removeEventListener('ended', restart);
      video.removeEventListener('loadedmetadata', seekToStart);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, autoPlay, muted, loop, loopNatively, playsInline, shouldLoad, startAt]);

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
      loop={loopNatively}
      playsInline={playsInline}
      preload={preload}
      controls={controls}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      onPlaying={onPlaying}
    />
  );
}
