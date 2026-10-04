'use client';

import { useEffect, useState } from 'react';
import BookButton from '@/components/shared/book-button';

export default function FloatingBook() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <BookButton variant="light" tabIndex={on ? 0 : -1} className={`lp-fab ${on ? 'lp-fab-on' : ''}`}>
      Book now
    </BookButton>
  );
}