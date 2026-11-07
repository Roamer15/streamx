import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { CastMember } from "../types/media.types";
import Cast from "./Cast";

interface CastCarouselProps {
  cast: CastMember[];
  loading: boolean;
}

export default function CastCarousel({ cast, loading }: CastCarouselProps) {
  const listId = useId();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 1
    );
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollState();
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [cast.length, loading, updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -container.clientWidth * 0.8 : container.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-6 md:px-14 py-10">
      <div className="flex items-center justify-between mb-7">
        <h2
          className="text-2xl font-extrabold text-white"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Cast
        </h2>
        {canScrollLeft || canScrollRight ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll cast left"
              aria-controls={listId}
              className="p-2 rounded-full text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "rgba(38,38,38,0.75)",
                border: "1px solid rgba(72,72,71,0.25)",
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll cast right"
              aria-controls={listId}
              className="p-2 rounded-full text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "rgba(38,38,38,0.75)",
                border: "1px solid rgba(72,72,71,0.25)",
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2"
            style={{ borderColor: "#ff8d8f" }}
          />
        </div>
      ) : cast.length > 0 ? (
        <div
          id={listId}
          ref={scrollContainerRef}
          role="list"
          aria-label="Cast members"
          tabIndex={0}
          onScroll={updateScrollState}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-3 scrollbar-custom snap-x snap-proximity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8d8f]"
          style={{ scrollBehavior: "smooth", touchAction: "pan-x" }}
        >
          {cast.map((actor) => (
            <div key={actor.id} role="listitem" className="w-[88px] shrink-0 snap-start">
              <Cast actor={actor} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm" style={{ color: "#adaaaa" }}>
          No cast information available.
        </p>
      )}
    </section>
  );
}
