import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 text-sm px-4 py-2 rounded-full shadow-lg"
      style={{
        background: "#1a1919",
        border: "1px solid rgba(72,72,71,0.25)",
        color: "#adaaaa",
      }}
    >
      <WifiOff size={14} className="shrink-0" style={{ color: "#ff8d8f" }} />
      <span>You are offline. Showing cached content.</span>
    </div>
  );
};

export default OfflineBanner;
