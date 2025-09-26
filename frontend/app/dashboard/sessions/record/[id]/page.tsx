"use client";

import { useEffect, useRef, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Mic, MicOff, Save } from "lucide-react";
import MicWaveform from "@/components/ui/mic-waveform";

type TranscriptLine = { timestamp: string; text: string };

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

export default function RecordSessionsPage() {
  const [notes, setNotes] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [interim, setInterim] = useState("");
  const [transcripts, setTranscripts] = useState<TranscriptLine[]>([]);
  const recognitionRef = useRef<any | null>(null);

  const formatTime = (d = new Date()) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    // Start/stop Web Speech API recognition when recording toggles
    const startRecognition = () => {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.warn("SpeechRecognition not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        // Aggregate latest result block
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const text = result[0].transcript.trim();
          if (result.isFinal) {
            setTranscripts((prev) => [
              ...prev,
              { timestamp: formatTime(), text },
            ]);
            setInterim("");
          } else {
            interimTranscript += text + " ";
          }
        }
        if (interimTranscript) setInterim(interimTranscript.trim());
      };

      recognition.onerror = (e: any) => {
        console.error("Speech recognition error:", e);
      };

      recognition.onend = () => {
        // Auto-restart if recording still active (some browsers end periodically)
        if (isRecording) {
          try {
            recognition.start();
          } catch {}
        }
      };

      try {
        recognition.start();
        recognitionRef.current = recognition;
      } catch (e) {
        console.error("Failed to start recognition", e);
      }
    };

    const stopRecognition = () => {
      const rec = recognitionRef.current;
      if (rec) {
        try {
          rec.onend = null;
          rec.stop();
        } catch {}
      }
      recognitionRef.current = null;
      setInterim("");
    };

    if (isRecording) startRecognition();
    else stopRecognition();

    return () => {
      // Cleanup on unmount
      const rec = recognitionRef.current;
      if (rec) {
        try {
          rec.onend = null;
          rec.stop();
        } catch {}
      }
      recognitionRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="h-[78vh] flex flex-col m-0 p-0 gap-0">
          <div className="flex items-center justify-between p-[20px]">
            <div>Live Recording</div>
          </div>
          <hr />
          <CardContent className="flex-1 min-h-0 p-0">
            <div className="h-full overflow-auto p-4 space-y-2">
              {transcripts.length === 0 && !interim && (
                <p className="text-sm text-muted-foreground">
                  Waiting for microphone input…
                </p>
              )}

              {transcripts.map((line, idx) => (
                <p key={idx} className="text-sm">
                  {line.timestamp} — {line.text}
                </p>
              ))}

              {interim && (
                <p className="text-sm text-muted-foreground italic">
                  {formatTime()} — {interim}
                </p>
              )}
            </div>
          </CardContent>
          <div className="flex items-center justify-between gap-2  border-t overflow-hidden">
            <MicWaveform onActiveChange={setIsRecording} />
          </div>
        </Card>

        <Card className="h-[78vh] flex flex-col m-0 p-0 gap-0">
          <div>
            <div className="flex items-center justify-between p-[20px]">
              <div>Personal Notes</div>
            </div>
          </div>
          <Separator />
          <CardContent className="flex-1 min-h-0 p-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Type your notes here…"
              className="h-full w-full resize-none outline-none text-sm"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
