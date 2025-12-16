import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { createModule } from "@/lib/apiService";
import { useAuth } from "@/context/AuthContext";

export default function OrganizationSendTest() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("MEDIUM");
  const [role, setRole] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [firstMessage, setFirstMessage] = useState("");
  const [userEmails, setUserEmails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<any>(null);

  if (user?.type !== "ORGANIZATION") {
    return (
      <div className="p-8">
        <h2 className="text-xl font-medium">Not authorized</h2>
        <p className="text-muted-foreground">This page is only for organization accounts.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !topic || !role || !systemPrompt || !firstMessage) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emails = userEmails
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // Basic client-side email validation
    const invalid = emails.find((e) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
    if (invalid) {
      toast.error(`Invalid email address: ${invalid}`);
      return;
    }

    const payload = {
      title,
      topic,
      difficulty,
      role,
      systemPrompt,
      firstMessage,
      userEmails: emails,
    };

    setServerError(null);
    try {
      setSubmitting(true);
      console.debug("Assign test payload:", payload);
      await createModule(payload);
      toast.success("Test assigned successfully");
      navigate("/manage-tests");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverMsg = (err.response && (err.response as any).data && (err.response as any).data.message) || err.message;
        console.error("API error creating module:", err.response || err.message);
        setServerError(err.response ? (err.response as any).data : { message: err.message });
        toast.error(serverMsg as string);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to assign test");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Assign a New Test</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="E.g. Customer Support Simulation" />
        </div>

        <div>
          <Label>Topic</Label>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic" />
        </div>

        <div>
          <Label>Role</Label>
          <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role the test will simulate (e.g., Support Agent)" />
        </div>

        <div>
          <Label>Difficulty</Label>
          <select className="w-full rounded-md border px-3 py-2" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>
        </div>

        <div>
          <Label>System Prompt</Label>
          <textarea className="w-full rounded-md border px-3 py-2" rows={4} value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} />
        </div>

        <div>
          <Label>First Message</Label>
          <textarea className="w-full rounded-md border px-3 py-2" rows={3} value={firstMessage} onChange={(e) => setFirstMessage(e.target.value)} />
        </div>

        <div>
          <Label>User Emails (comma separated)</Label>
          <Input value={userEmails} onChange={(e) => setUserEmails(e.target.value)} placeholder="user1@example.com, user2@example.com" />
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={submitting}>{submitting ? 'Assigning...' : 'Assign Test'}</Button>
        </div>
        {serverError && (
          <div className="mt-4 bg-red-50 border border-red-200 p-3 rounded">
            <p className="text-sm font-medium text-red-700">Server error (debug):</p>
            <pre className="text-xs text-red-800 mt-2 overflow-auto max-h-40">{JSON.stringify(serverError, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
}
