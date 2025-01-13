"use client";

import React, { forwardRef } from "react";
import { SpacingToken } from "../types";
import styles from "./RevealFx.module.scss";
import { Flex } from ".";

interface RevealFxProps extends React.ComponentProps<typeof Flex> {
  children: React.ReactNode;
  speed?: "fast" | "medium" | "slow";
  translateY?: number | SpacingToken;
  className?: string;
  style?: React.CSSProperties;
}

const RevealFx = forwardRef<HTMLDivElement, RevealFxProps>(
  (
    { children, speed = "medium", translateY, style, className, ...rest },
    ref,
  ) => {
    const translateValue =
      typeof translateY === "number"
        ? `${translateY}rem`
        : translateY
          ? `var(--static-space-${translateY})`
          : undefined;

    const combinedClassName = `${styles.revealFx} ${styles[speed]} ${className || ""}`;

    return (
      <Flex
        fillWidth
        justifyContent="center"
        ref={ref}
        style={{
          transform: translateValue
            ? `translateY(${translateValue})`
            : undefined,
          ...style,
        }}
        className={combinedClassName}
        {...rest}
      >
        {children}
      </Flex>
    );
  },
);

RevealFx.displayName = "RevealFx";
export { RevealFx };
