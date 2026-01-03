"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { Mic, MicOff } from "lucide-react";

type MicWaveformProps = {
  onActiveChange?: (active: boolean) => void;
};

export default function MicWaveform({ onActiveChange }: MicWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = 500;
    const canvasHeight = 60;
    const barWidth = 2;
    const barSpacing = 2;
    const numBars = Math.floor(canvasWidth / (barWidth + barSpacing));

    // Array to store bar heights - each represents audio level at a point in time
    const barHeights: number[] = new Array(numBars).fill(5);

    let animationId: number;
    let currentAudioLevel = 0;

    const animate = () => {
      const baseHeight = 5; // Base animation when no audio
      const audioHeight = 5 + (currentAudioLevel / 255) * (canvasHeight - 20); // Scale audio to bar height

      const newBarHeight = Math.max(baseHeight, audioHeight);

      // Shift all bars to the left
      barHeights.shift();
      barHeights.push(newBarHeight);

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const centerY = canvasHeight / 2;

      // Draw solid bars
      for (let i = 0; i < numBars; i++) {
        const x = i * (barWidth + barSpacing);
        const height = barHeights[i];
        const y = centerY - height / 2;

        ctx.fillStyle = "#000000ff"; 
        ctx.fillRect(x, y, barWidth, height);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let stream: MediaStream | null = null;

    if (isActive) {
      const setupAudio = async () => {
        try {
          const AudioContext = (
            (window as unknown as { AudioContext?: typeof globalThis.AudioContext; webkitAudioContext?: typeof globalThis.AudioContext }).AudioContext ||
            (window as unknown as { webkitAudioContext?: typeof globalThis.AudioContext }).webkitAudioContext
          ) as typeof globalThis.AudioContext | undefined;
          if (!AudioContext) throw new Error("AudioContext not supported");
          audioContext = new AudioContext();

          if (audioContext.state === "suspended") {
            await audioContext.resume();
          }

          analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          analyser.smoothingTimeConstant = 0;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: false,
              noiseSuppression: false,
              autoGainControl: false,
            },
          });
          const source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);

          const updateAudio = () => {
            if (!analyser || !isActive) return;

            analyser.getByteFrequencyData(dataArray);

            // Calculate RMS
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i] * dataArray[i];
            }
            const rms = Math.sqrt(sum / bufferLength);

            currentAudioLevel = rms * 2;

            if (isActive) {
              requestAnimationFrame(updateAudio);
            }
          };

          updateAudio();
        } catch (error) {
          console.error("Audio setup failed:", error);
        }
      };

      setupAudio();
    } else {
      currentAudioLevel = 0;
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (audioContext && audioContext.state !== "closed") {
        audioContext.close();
      }
    };
  }, [isActive]);

  return (
    <div className="flex flex-row justify-between items-center w-full gap-[10px] m-[20px]">
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => {
            const next = !isActive;
            setIsActive(next);
            if (onActiveChange) onActiveChange(next);
          }}
          className="w-[40px] h-[40px]"
          variant={!isActive ? "secondary" : "default"}
        >
          {!isActive ? (
            <>
              <MicOff />
            </>
          ) : (
            <>
              <Mic />
            </>
          )}
        </Button>
      </div>
      <canvas
        ref={canvasRef}
        width={350}
        height={60}
        style={{
          flexGrow: 1,
          height: "60px",
        }}
      />
    </div>
  );
}
