"use client";

import React, { CSSProperties, useState, useRef, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import classNames from "classnames";
import { Flex, Skeleton } from "@/once-ui/components";

export type SmartImageProps = ImageProps & {
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: string;
  height?: number;
  radius?: string;
  alt?: string;
  isLoading?: boolean;
  objectFit?: CSSProperties["objectFit"];
  enlarge?: boolean;
  src: string;
  unoptimized?: boolean;
};

const SmartImage: React.FC<SmartImageProps> = ({
  className,
  style,
  aspectRatio,
  height,
  radius,
  alt = "",
  isLoading = false,
  objectFit = "cover",
  enlarge = false,
  src,
  unoptimized = false,
  priority = false,
  quality = 75,
  ...props
}) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [naturalAspectRatio, setNaturalAspectRatio] = useState<string | null>(
    null,
  );
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aspectRatio === "auto" && typeof window !== "undefined") {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setNaturalAspectRatio(`${img.width} / ${img.height}`);
      };
    }
  }, [src, aspectRatio]);

  const handleClick = () => {
    if (enlarge) {
      setIsEnlarged(!isEnlarged);
    }
  };

  return (
    <Flex
      ref={imageRef}
      fillWidth
      position="relative"
      style={{
        outline: "none",
        overflow: "hidden",
        height:
          aspectRatio === "auto" ? "auto" : height ? `${height}rem` : "100%",
        aspectRatio:
          aspectRatio === "auto"
            ? naturalAspectRatio || undefined
            : aspectRatio,
        cursor: enlarge ? "pointer" : "default",
        borderRadius: isEnlarged
          ? "0"
          : radius
            ? `var(--radius-${radius})`
            : undefined,
        ...style,
      }}
      className={classNames(className)}
      onClick={handleClick}
    >
      {isLoading ? (
        <Skeleton shape="block" />
      ) : (
        <Image
          {...props}
          src={src}
          alt={alt}
          fill
          loading={priority ? "eager" : "lazy"}
          sizes={
            props.sizes ||
            "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          style={{
            objectFit: objectFit,
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </Flex>
  );
};

SmartImage.displayName = "SmartImage";

export { SmartImage };
