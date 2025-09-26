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

export default function RecordSessionsPage() {
  const [muted, setMuted] = useState(false);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const toggleMute = () => setMuted((m) => !m);

  const handleSaveNotes = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
  };

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="h-[78vh] flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>Live Transcription</CardTitle>
          </CardHeader>
          <Separator />
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
          <Separator />
          <CardFooter className="flex items-center justify-between gap-2">
            <div className="text-xs text-muted-foreground">
              Mic Status: {muted ? "Muted" : "Live"}
            </div>
            <Button
              onClick={toggleMute}
              variant={muted ? "secondary" : "default"}
            >
              {muted ? (
                <>
                  <MicOff className="mr-2 h-4 w-4" /> Unmute
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" /> Mute
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="h-[78vh] flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Notes</CardTitle>
              <Button onClick={handleSaveNotes} disabled={saving}>
                <Save className="mr-2 h-4 w-4" /> {saving ? "Saving…" : "Save"}
              </Button>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1 min-h-0 p-3">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Type your notes here…"
              className="h-full resize-none"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
