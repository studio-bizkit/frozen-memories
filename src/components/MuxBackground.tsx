"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Hls from "hls.js";
import mux from "mux-embed";

interface MuxBackgroundProps {
	className?: string;
}

export default function MuxBackground({ className }: MuxBackgroundProps) {
	const playbackId = process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID;
	const envKey = process.env.NEXT_PUBLIC_MUX_ENV_KEY; // optional analytics
	const videoRef = useRef<HTMLVideoElement>(null);

	// Build the Mux HLS URL if we have a playback ID
	const hlsUrl = useMemo(() => {
		if (!playbackId) return null;
		return `https://stream.mux.com/${playbackId}.m3u8`;
	}, [playbackId]);

	useEffect(() => {
		if (!hlsUrl || !videoRef.current) return;

		let hls: Hls | null = null;
		const video = videoRef.current;
		const initTime = mux.utils.now();

		const initializeVideo = async () => {
			try {
				// Attempt native HLS (Safari)
				if (video.canPlayType("application/vnd.apple.mpegurl")) {
					video.src = hlsUrl;
					video.play().catch(() => {});
				} else if (Hls.isSupported()) {
					// HLS.js for other browsers
					hls = new Hls({ enableWorker: true, lowLatencyMode: false });
					hls.loadSource(hlsUrl);
					hls.attachMedia(video);
					hls.on(Hls.Events.MANIFEST_PARSED, () => {
						video.play().catch(() => {});
					});
					hls.on(Hls.Events.ERROR, (_event, data) => {
						if (data.fatal) {
							switch (data.type) {
								case Hls.ErrorTypes.NETWORK_ERROR:
									hls?.startLoad();
									break;
								case Hls.ErrorTypes.MEDIA_ERROR:
									hls?.recoverMediaError();
									break;
								default:
									hls?.destroy();
							}
						}
					});
					// Mux Data monitoring (optional)
					if (envKey) {
						mux.monitor(video, {
							debug: false,
							hlsjs: hls,
							Hls,
							data: {
								env_key: envKey,
								player_name: "Home Background Video",
								player_init_time: initTime,
								video_title: "Home Header",
							},
						});
					}
				} else {
					// No HLS support
				}
			} catch (_error) {
				// swallow; background is non-blocking
			}
		};

		initializeVideo();

		return () => {
			if (hls) hls.destroy();
		};
	}, [hlsUrl, envKey]);

	if (!hlsUrl) return null;

	return (
		<div className={className ?? "absolute inset-0"} style={{ pointerEvents: "none" }}>
			<video
				ref={videoRef}
				muted
				autoPlay
				playsInline
				loop
				preload="auto"
				className="absolute inset-0 w-full h-full object-cover"
				aria-hidden
			/>
		</div>
	);
}
