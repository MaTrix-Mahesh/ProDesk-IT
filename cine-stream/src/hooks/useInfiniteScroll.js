import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (callback, isLoading) => {
  const observerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) callback();
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [callback, isLoading]);
  return observerRef;
};