"use client";

import React from "react";
import styles from "./Background.module.scss";
import classNames from "classnames";

export interface BackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  position?: string;
}

export const Background = React.forwardRef<HTMLDivElement, BackgroundProps>(
  ({ className, style }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(styles.backgroundContainer, className)}
        style={style}
      >
        {/* Static gradient background */}
        <div className={styles.gradientLayer} />

        {/* Noise texture */}
        <div className={styles.noiseTexture} />

        {/* Optional: Subtle floating particles */}
        <div className={styles.particles} />
      </div>
    );
  },
);

Background.displayName = "Background";
