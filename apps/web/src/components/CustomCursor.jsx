
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

  const inactivityTimerRef = useRef(null);

  useEffect(() => {
    if (!isDesktop) return;

    const resetInactivityTimer = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      inactivityTimerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 1200); // Ocultar tras 1.2 segundos de inactividad
    };

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
      resetInactivityTimer();
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };

    const onMouseEnter = () => {
      setIsVisible(true);
      resetInactivityTimer();
    };

    const onMouseDown = () => {
      setIsVisible(true);
      resetInactivityTimer();
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('scroll', onMouseMove, { passive: true });

    // Animation loop for dot and halo trailing effect using transform (GPU accelerated)
    const updateCursor = () => {
      // 1. Update dot position instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      // 2. Lerp (Linear Interpolation) with a responsive factor (0.45) for precise trailing
      halo.current.x += (mouse.current.x - halo.current.x) * 0.45;
      halo.current.y += (mouse.current.y - halo.current.y) * 0.45;

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${halo.current.x}px, ${halo.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    requestRef.current = requestAnimationFrame(updateCursor);

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
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('scroll', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(requestRef.current);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [isDesktop]);

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
