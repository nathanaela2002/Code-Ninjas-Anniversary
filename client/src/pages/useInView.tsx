import { useEffect, useState, useCallback } from "react";

interface InViewOptions extends IntersectionObserverInit {
  /** when true (default) the hook stops observing after first enter */
  once?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: InViewOptions = {},
): [(node: T | null) => void, boolean] {
  const { once = true, threshold = 0.2, root, rootMargin } = options;

  const [node, setNode] = useState<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const ref = useCallback((el: T | null) => setNode(el), []);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect(); // stop listening
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, once, root, rootMargin, threshold]);

  /* one-time inline style for fade in/out */
  useEffect(() => {
    if (!node) return;
    node.style.transition = "opacity 0.6s ease-in-out";
    node.style.opacity = isVisible ? "1" : "0";
  }, [node, isVisible]);

  return [ref, isVisible];
}
