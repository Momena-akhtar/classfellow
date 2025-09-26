"use client";

import { useState } from "react";
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

export default function RecordSessionsPage() {
  const [muted, setMuted] = useState(false);
  const [notes, setNotes] = useState("");

  const toggleMute = () => setMuted((m) => !m);

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="h-[78vh] flex flex-col m-0 p-0 gap-0">
          <div className="flex items-center justify-between p-[20px]">
            <div>Live Recording</div>
          </div>
          <hr />
          <CardContent className="flex-1 min-h-0 p-0">
            <div className="h-full overflow-auto p-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                Waiting for microphone input…
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  10:01 — Today we&apos;re covering integration by parts and its
                  applications in solving complex integrals.
                </p>
                <p className="text-sm">
                  10:03 — Remember the formula: ∫u dv = u v − ∫v du.
                </p>
                <p className="text-sm">
                  10:05 — Choose u to simplify after differentiation; choose dv
                  to simplify after integration.
                </p>
              </div>
            </div>
          </CardContent>
          <div className="flex items-center justify-between gap-2  border-t overflow-hidden">
            <MicWaveform />
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
