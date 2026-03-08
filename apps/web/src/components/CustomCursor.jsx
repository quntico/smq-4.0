
import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const haloRef = useRef(null);
  const requestRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Mouse position state
  const mouse = useRef({ x: 0, y: 0 });
  // Halo position state (for trailing effect)
  const halo = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is desktop
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const handleMediaChange = (e) => {
      setIsDesktop(!e.matches);
      if (!e.matches) {
        document.body.classList.add('custom-cursor-active');
      } else {
        document.body.classList.remove('custom-cursor-active');
      }
    };

    // Initial check
    handleMediaChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Update dot immediately
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Animation loop for halo trailing effect
    const updateHalo = () => {
      // Lerp (Linear Interpolation) for smooth trailing
      halo.current.x += (mouse.current.x - halo.current.x) * 0.3;
      halo.current.y += (mouse.current.y - halo.current.y) * 0.3;

      if (haloRef.current) {
        haloRef.current.style.left = `${halo.current.x}px`;
        haloRef.current.style.top = `${halo.current.y}px`;
      }

      requestRef.current = requestAnimationFrame(updateHalo);
    };

    requestRef.current = requestAnimationFrame(updateHalo);

    // Interactive elements detection
    const interactiveSelectors = 'a, button, [role="button"], .btn, [data-interactive], input[type="submit"], input[type="button"], .card, [data-card], .hover-expand';

    const handleMouseOver = (e) => {
      if (e.target.closest(interactiveSelectors)) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest(interactiveSelectors)) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isDesktop, isVisible]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isHovering ? 'expanded' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={haloRef}
        className={`custom-cursor-halo ${isHovering ? 'expanded' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
};

export default CustomCursor;
