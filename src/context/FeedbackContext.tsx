import { useState, useCallback, useEffect, type ReactNode } from 'react';
import { FeedbackContext } from './SideBarContextLine';


export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [hasShownAutoModal, setHasShownAutoModal] = useState(false);

  const openFeedbackModal = useCallback(() => {
    setIsFeedbackModalOpen(true);
  }, []);

  const closeFeedbackModal = useCallback(() => {
    setIsFeedbackModalOpen(false);
  }, []);

  useEffect(() => {
    if (hasShownAutoModal) return;

    const timer = setTimeout(() => {
      setIsFeedbackModalOpen(true);
      setHasShownAutoModal(true);
    }, 2 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [hasShownAutoModal]);

  return (
    <FeedbackContext.Provider value={{ isFeedbackModalOpen, openFeedbackModal, closeFeedbackModal }}>
      {children}
    </FeedbackContext.Provider>
  );
}
