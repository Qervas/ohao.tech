'use client';

import React, { useEffect, useRef } from 'react';
import styles from './Background.module.scss';
import classNames from 'classnames';

export interface BackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  mask?: 'none' | 'cursor' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

export const Background = React.forwardRef<HTMLDivElement, BackgroundProps>(
  ({ className, style, mask = 'none' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        setMousePosition({ x, y });
        
        containerRef.current.style.setProperty('--mouse-x', `${x}%`);
        containerRef.current.style.setProperty('--mouse-y', `${y}%`);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const maskStyle = React.useMemo(() => {
      const maskSize = '1200px';
      switch (mask) {
        case 'cursor':
          return {
            maskImage: `radial-gradient(${maskSize} at ${mousePosition.x}% ${mousePosition.y}%, black 40%, transparent)`,
            WebkitMaskImage: `radial-gradient(${maskSize} at ${mousePosition.x}% ${mousePosition.y}%, black 40%, transparent)`,
          };
        case 'topLeft':
          return {
            maskImage: `radial-gradient(${maskSize} at 0 0, black 40%, transparent)`,
            WebkitMaskImage: `radial-gradient(${maskSize} at 0 0, black 40%, transparent)`,
          };
        default:
          return {};
      }
    }, [mask, mousePosition]);

    return (
      <div 
        ref={containerRef}
        className={classNames(styles.backgroundContainer, className)}
        style={{ ...style, ...maskStyle }}
      >
        <div className={styles.meshGradient} />
        <div className={styles.gradientLayer} />
        <div className={styles.grid} />
        <div className={styles.noiseTexture} />
        <div className={styles.sparkle} />
        <div className={styles.particles} />
      </div>
    );
  }
);

Background.displayName = 'Background';