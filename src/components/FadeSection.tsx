import { useEffect, useRef, type ReactNode } from "react";

interface FadeSectionProps {
  children: ReactNode;
  delay?: number;
  threshold?: number;
}

export default function FadeSection({ children, delay = 0, threshold = 0.1 }: FadeSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.style.transitionDelay = `${delay}s`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className="fade-in">
      {children}
    </div>
  );
}
