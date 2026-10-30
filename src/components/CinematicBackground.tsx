/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

/**
 * Persistent cinematic video background for NuwayX Tech.
 * - Plays as full-viewport background across ALL pages on both Desktop and Mobile.
 * - Desktop remains 100% identical in styling, positioning, brightness, and behavior.
 * - Mobile extends the fixed background to the full viewport with portrait-adapted framing.
 * - Stacked at z-0 directly on top of base obsidian color and behind all content (z-10/z-50).
 * - Persists during internal route navigation without restarting playback.
 * - Respects prefers-reduced-motion.
 * - Maintains text readability with balanced translucent obsidian overlay and radial vignette.
 * - Non-interactive (pointer-events-none) so clicks, scrolls, and forms work unimpeded.
 */
export const CinematicBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playbackStatus, setPlaybackStatus] = useState<'init' | 'playing' | 'paused' | 'error'>('init');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Both muted and defaultMuted are critical for browser autoplay policies in mobile & iframes
    video.muted = true;
    video.defaultMuted = true;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const attemptPlay = () => {
      if (!video) return;
      const prefersReducedMotion = motionQuery.matches;

      if (!prefersReducedMotion) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setPlaybackStatus('playing');
            })
            .catch((err) => {
              console.warn('[CinematicBackground] Autoplay waiting for interaction:', err?.message || err);
              setPlaybackStatus('paused');
            });
        }
      } else {
        video.pause();
        setPlaybackStatus('paused');
      }
    };

    attemptPlay();

    const handleCanPlay = () => attemptPlay();
    const handlePlaying = () => setPlaybackStatus('playing');
    const handlePause = () => setPlaybackStatus('paused');
    const handleError = (e: any) => {
      console.error('[CinematicBackground] Video error:', e);
      setPlaybackStatus('error');
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    motionQuery.addEventListener('change', attemptPlay);

    // Also attempt play when user first clicks or touches anywhere if browser blocked initial autoplay
    const handleUserInteraction = () => {
      if (video && video.paused && !motionQuery.matches) {
        attemptPlay();
      }
    };
    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      motionQuery.removeEventListener('change', attemptPlay);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      data-video-status={playbackStatus}
    >
      {/* Background Video - Positioned at fixed inset-0 z-0, portrait-optimized on mobile, 100% identical on desktop */}
      <video
        ref={videoRef}
        src="/videos/Nuway%20Animation.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        className="w-full h-full object-cover object-[center_35%] md:object-center opacity-80 contrast-125 saturate-110"
      />

      {/* Balanced translucent dark overlay: mobile uses subtle 48% wash, desktop remains exact 40% */}
      <div className="absolute inset-0 bg-[#05040a]/48 md:bg-[#05040a]/40 pointer-events-none" />

      {/* Radial vignette keeping text legible and edges atmospheric */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(5,4,10,0.65) 90%)'
        }}
      />
    </div>
  );
};
