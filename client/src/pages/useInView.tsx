import { useEffect, useRef, useState, RefObject } from "react";

/**
 * A generic version of useInView that works with any HTML element type.
 * It also applies a smooth fade transition when the element enters or leaves the viewport.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
): [RefObject<T>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  // Apply smooth fade transition on visibility change
  useEffect(() => {
    if (ref.current) {
      // Ensure the element has a default opacity if not yet visible
      ref.current.style.opacity = isVisible ? "1" : "0";
      // Apply a smooth transition for opacity changes
      ref.current.style.transition = "opacity 0.6s ease-in-out";
    }
  }, [isVisible]);

  return [ref as RefObject<T>, isVisible];
}
