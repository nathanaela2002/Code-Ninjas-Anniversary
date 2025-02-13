import { useEffect, useState, useCallback } from "react";

/**
 * A generic version of useInView that works with any HTML element type.
 * It also applies a smooth fade transition when the element enters or leaves the viewport.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
): [(node: T | null) => void, boolean] {
  const [node, setNode] = useState<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const ref = useCallback((node: T | null) => {
    setNode(node);
  }, []);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, ...options },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [node, options]);

  useEffect(() => {
    if (node) {
      node.style.opacity = isVisible ? "1" : "0";
      // Apply a smooth transition for opacity changes
      node.style.transition = "opacity 0.6s ease-in-out";
    }
  }, [node, isVisible]);

  return [ref, isVisible];
}
