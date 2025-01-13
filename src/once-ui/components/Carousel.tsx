"use client";

import { Flex, RevealFx, Scroller, SmartImage } from "@/once-ui/components";
import { useEffect, useState } from "react";

interface Image {
  src: string;
  alt: string;
  width?: number; // Optional width for natural aspect ratio
  height?: number; // Optional height for natural aspect ratio
}

interface CarouselProps {
  images: Image[];
  indicator?: "line" | "thumbnail";
  aspectRatio?: string | "auto";
  sizes?: string;
  revealedByDefault?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images = [],
  indicator = "line",
  aspectRatio = "16 / 9",
  sizes,
  revealedByDefault = false,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(revealedByDefault);
  const [naturalRatios, setNaturalRatios] = useState<Record<number, string>>(
    {},
  );

  useEffect(() => {
    // Preload images and calculate their natural aspect ratios
    images.forEach((image, index) => {
      const img = new Image();
      img.src = image.src;
      img.onload = () => {
        setNaturalRatios((prev) => ({
          ...prev,
          [index]:
            image.width && image.height
              ? `${image.width} / ${image.height}`
              : `${img.width} / ${img.height}`,
        }));
      };
    });
  }, [images]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (images.length > 1) {
      const nextIndex = (activeIndex + 1) % images.length;
      const nextImage = new Image();
      nextImage.src = images[nextIndex].src;
    }
  }, [activeIndex, images]);

  const handleImageClick = () => {
    if (images.length > 1) {
      setIsTransitioning(false);
      const nextIndex = (activeIndex + 1) % images.length;
      handleControlClick(nextIndex);
    }
  };

  const handleControlClick = (index: number) => {
    if (index !== activeIndex) {
      setIsTransitioning(false);
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(true);
      }, 500);
    }
  };

  if (images.length === 0) {
    return null;
  }

  const getImageAspectRatio = (index: number) => {
    if (aspectRatio === "auto") {
      return naturalRatios[index] || "16 / 9"; // fallback ratio while loading
    }
    return aspectRatio;
  };

  return (
    <Flex fillWidth gap="12" direction="column">
      <Flex onClick={handleImageClick}>
        <RevealFx style={{ width: "100%" }} translateY="16" speed="fast">
          <SmartImage
            sizes={sizes}
            priority
            tabIndex={0}
            radius="l"
            alt={images[activeIndex]?.alt}
            aspectRatio={aspectRatio}
            src={images[activeIndex]?.src}
            style={{
              border: "1px solid var(--neutral-alpha-weak)",
              width: "100%",
              maxHeight: "80vh", // Add a max height to prevent too tall images
              ...(images.length > 1 && {
                cursor: "pointer",
              }),
            }}
            objectFit="contain" // Change to 'contain' to preserve aspect ratio
          />
        </RevealFx>
      </Flex>
      {images.length > 1 && (
        <>
          {indicator === "line" ? (
            <Flex gap="4" paddingX="s" fillWidth justifyContent="center">
              {images.map((_, index) => (
                <Flex
                  key={index}
                  onClick={() => handleControlClick(index)}
                  style={{
                    background:
                      activeIndex === index
                        ? "var(--neutral-on-background-strong)"
                        : "var(--neutral-alpha-medium)",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                  }}
                  fillWidth
                  height="2"
                ></Flex>
              ))}
            </Flex>
          ) : (
            <Scroller fillWidth gap="4">
              {images.map((image, index) => (
                <Flex
                  key={index}
                  style={{
                    border:
                      activeIndex === index
                        ? "2px solid var(--brand-solid-strong)"
                        : "none",
                    cursor: "pointer",
                    borderRadius: "var(--radius-m-nest-4)",
                    transition: "border 0.3s ease",
                  }}
                  padding="4"
                  width="80"
                  height="80"
                >
                  <SmartImage
                    alt={image.alt}
                    aspectRatio="1 / 1" // Keep thumbnails square
                    sizes="120px"
                    src={image.src}
                    objectFit="cover"
                    onClick={() => handleControlClick(index)}
                    style={{
                      cursor: "pointer",
                      borderRadius: "var(--radius-m)",
                      transition: "background 0.3s ease",
                    }}
                  />
                </Flex>
              ))}
            </Scroller>
          )}
        </>
      )}
    </Flex>
  );
};

Carousel.displayName = "Carousel";
export { Carousel };
