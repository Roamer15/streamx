import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISSED_KEY = "installPromptDismissedAt";
const DISMISS_DAYS = 7;

const InstallPrompt = () => {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      const dismissedAt = localStorage.getItem(DISMISSED_KEY);
      if (dismissedAt) {
        const daysSinceDismiss =
          (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);
        if (daysSinceDismiss < DISMISS_DAYS) return;
      }

      setInstallEvent(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  if (!installEvent) return null;

  const handleInstall = async () => {
    await installEvent.prompt();
    setInstallEvent(null);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setInstallEvent(null);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 text-sm px-4 py-2 rounded-full shadow-lg"
      style={{
        background: "#1a1919",
        border: "1px solid rgba(72,72,71,0.25)",
        color: "#adaaaa",
      }}
    >
      <Download size={14} className="shrink-0" style={{ color: "#ff8d8f" }} />
      <span>Install ChwiiX for a faster, offline-ready experience.</span>
      <button
        onClick={handleInstall}
        className="shrink-0 font-medium px-3 py-1 rounded-full cursor-pointer transition-opacity hover:opacity-90"
        style={{
          background: "rgba(255,141,143,0.15)",
          color: "#ff8d8f",
          border: "1px solid rgba(255,141,143,0.35)",
        }}
      >
        Install App
      </button>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss install prompt"
        className="shrink-0 cursor-pointer"
        style={{ color: "#adaaaa" }}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default InstallPrompt;
