import { useEffect, useState, useRef } from 'react';
import type { ElementType } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  showCursor?: boolean;
  onComplete?: () => void;
  triggerOnScroll?: boolean;
}

export function TypingText({
  text,
  speed = 50,
  className = '',
  as = 'span',
  showCursor = true,
  onComplete,
  triggerOnScroll = true,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(!triggerOnScroll);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const Component = as as ElementType;

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    if (!triggerOnScroll || hasAnimated) return;

    const element = elementRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% visible
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [triggerOnScroll, hasAnimated]);

  // Typing animation effect
  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, isVisible, onComplete]);

  return (
    <Component ref={elementRef} className={className}>
      {displayedText}
      {showCursor && displayedText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </Component>
  );
}
