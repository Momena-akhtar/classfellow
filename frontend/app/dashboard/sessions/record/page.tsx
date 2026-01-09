"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import MicWaveform from "@/components/ui/mic-waveform";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SessionState = {
  status: 0 | 1 | 2;
  time: number; // seconds
  transcriptions: { text: string; time: Date }[]; // finalized lines with timestamp
  notes: string[]; // each line as a string
};

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}

function RecordSessionContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");
  const router = useRouter();

  const [session, setSession] = useState<SessionState>({
    status: 1,
    time: 0,
    transcriptions: [],
    notes: [],
  });
  const [isRecording, setIsRecording] = useState(false);
  const [interim, setInterim] = useState("");
  const recognitionRef = useRef<{
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
  } | null>(null);

  const formatClock = (seconds: number) => {
    const mm = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const ss = (seconds % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const formatTimestamp = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    // Start/stop Web Speech API recognition when recording toggles
    const startRecognition = () => {
      const SpeechRecognition = (
        (window as unknown as Record<string, unknown>).SpeechRecognition ||
        (window as unknown as Record<string, unknown>).webkitSpeechRecognition
      ) as unknown as new () => {
        continuous: boolean;
        interimResults: boolean;
        lang: string;
        onresult: (event: SpeechRecognitionEvent) => void;
        onerror: (event: SpeechRecognitionErrorEvent) => void;
        onend: (() => void) | null;
        start: () => void;
        stop: () => void;
      };
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
            setSession((prev) => ({
              ...prev,
              transcriptions: [
                ...prev.transcriptions,
                { text, time: new Date() },
              ],
            }));
            setInterim("");
          } else {
            interimTranscript += text + " ";
          }
        }
        if (interimTranscript) setInterim(interimTranscript.trim());
      };

      recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
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
  }, [isRecording]);

  // Timer: increments when status is 1 (in-progress)
  useEffect(() => {
    if (session.status !== 1) return;
    const id = setInterval(() => {
      setSession((prev) => ({ ...prev, time: prev.time + 1 }));
    }, 1000);
    return () => clearInterval(id);
  }, [session.status]);

  if (!sessionId) {
    return (
      <div className="text-center py-8">
        No session ID provided. Please start a session first.
      </div>
    );
  }

  return (
    <div className="grid gap-4 [@media(min-width:1150px)]:grid-cols-2">
      <Card className="h-[78vh] flex flex-col m-0 p-0 gap-0">
        <div className="flex items-center justify-between p-[20px]">
          <div className="flex items-center justify-between gap-2 w-[100%]">
            <div>Live Recording</div>
            <div className="text-xs rounded bg-muted text-muted-foreground px-2 py-0.5">
              {formatClock(session.time)}
            </div>
          </div>
        </div>
        <hr />
        <CardContent className="flex-1 min-h-0 p-0">
          <Tabs defaultValue="transcription" className="h-full w-full">
            <div className="pt-[5px]">
              <TabsList
                style={{
                  width: "calc(100% - 20px)",
                  margin: "10px",
                }}
              >
                <TabsTrigger value="transcription">Transcription</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="transcription" className="min-h-0">
              <div className="h-full overflow-auto p-4 space-y-2">
                {session.transcriptions.length === 0 && !interim && (
                  <p className="text-sm text-muted-foreground">
                    Waiting for microphone input…
                  </p>
                )}

                {session.transcriptions.map((entry, idx) => (
                  <p key={idx} className="text-sm">
                    {formatTimestamp(entry.time)} — {entry.text}
                  </p>
                ))}

                {interim && (
                  <p className="text-sm text-muted-foreground italic">
                    {interim}
                  </p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="summary" className="min-h-0">
              <div className="p-4 text-sm text-muted-foreground">
                Summary Coming Soon!
              </div>
            </TabsContent>
          </Tabs>
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
            value={session.notes.join("\n")}
            onChange={(e) =>
              setSession((prev) => ({
                ...prev,
                notes: e.target.value.split(/\r?\n/),
              }))
            }
            placeholder="Type your notes here…"
            className="h-full w-full resize-none outline-none text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default function RecordSessionsPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <RecordSessionContent />
      </Suspense>
    </DashboardLayout>
  );
}
