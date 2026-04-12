import { useEffect, useRef } from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
}

// Wraps every page with a fade-in + slight upward slide on mount.
// Pure CSS animation via Tailwind — no animation library needed.
const PageWrapper = ({ children }: PageWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Trigger animation by removing the initial invisible state
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';

    const frame = requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
};

export default PageWrapper;