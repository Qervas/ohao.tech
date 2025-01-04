"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Dialog, Flex, IconButton } from "@/once-ui/components";
import { Portal } from "@/once-ui/components/Portal";

interface MermaidProps {
  chart: string;
}

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    primaryColor: "#00FFF2",
    primaryBorderColor: "#00FFF2",
    primaryTextColor: "#FFFFFF",
    secondaryColor: "#1A1E2E",
    secondaryBorderColor: "#2A2F45",
    secondaryTextColor: "#B4B8C4",
    tertiaryColor: "#131620",
    tertiaryBorderColor: "#1F2437",
    tertiaryTextColor: "#8B8E98",
    nodeBorder: "#00FFF2",
    clusterBkg: "#1A1E2E",
    clusterBorder: "#2A2F45",
    lineColor: "#00FFF2",
    textColor: "#FFFFFF",
    mainBkg: "#131620",
    labelTextColor: "#FFFFFF",
    edgeLabelBackground: "#131620",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    labelBackground: "#131620",
  },
  flowchart: {
    curve: "basis",
    padding: 40,
    useMaxWidth: true,
    htmlLabels: true,
    rankSpacing: 100,
    nodeSpacing: 70,
  },
  sequence: {
    mirrorActors: false,
    bottomMarginAdj: 10,
    messageAlign: "center",
    width: 200,
    height: 80,
  },
  securityLevel: "loose",
});

export const MermaidDiagram: React.FC<MermaidProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullViewRef = useRef<HTMLDivElement>(null);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [enlargedContent, setEnlargedContent] = useState<string>("");
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [diagramWidth, setDiagramWidth] = useState(0);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const calculateOptimalTextSize = (
    svgElement: SVGElement,
    isThumbnail: boolean,
  ) => {
    const viewBox = svgElement.getAttribute("viewBox")?.split(" ").map(Number);
    if (!viewBox) return 16;

    const [, , width, height] = viewBox;
    const nodeCount = svgElement.querySelectorAll("g.node").length;
    const edgeCount = svgElement.querySelectorAll("g.edge").length;
    const totalElements = nodeCount + edgeCount;

    const dpi = window.devicePixelRatio;
    const screenWidth = window.innerWidth;

    if (isThumbnail) {
      const containerWidth = 300;
      const baseSize = Math.min(containerWidth / 15, 16);
      const sizeAdjustment = Math.max(0.7, 1 - totalElements * 0.02);
      return Math.max(baseSize * sizeAdjustment * dpi, 12);
    } else {
      const complexityFactor = Math.max(0.6, 1 - totalElements * 0.015);
      const widthFactor = Math.min(screenWidth / 1920, 1);
      let baseSize = Math.min(screenWidth / 40, 28);

      if (width > screenWidth * 0.8) {
        baseSize *= 0.8;
      }

      return Math.max(baseSize * complexityFactor * widthFactor * dpi, 14);
    }
  };

  const calculateThumbnailSize = (svgElement: SVGElement) => {
    const viewBox = svgElement.getAttribute("viewBox")?.split(" ").map(Number);
    if (!viewBox) return null;

    const [, , width, height] = viewBox;
    const aspectRatio = width / height;

    // Fixed thumbnail width
    const thumbnailWidth = 300;
    const thumbnailHeight = thumbnailWidth / aspectRatio;

    return {
      width: Math.max(thumbnailWidth, 300),
      height: Math.max(thumbnailHeight, 200),
    };
  };

  const renderDiagram = async (
    targetDiv: HTMLDivElement,
    isThumbnail: boolean = true,
  ) => {
    if (!isThumbnail) setIsLoading(true);
    try {
      const id = `mermaid-${Math.random().toString(36).slice(2)}`;
      const { svg } = await mermaid.render(id, chart);

      if (!targetDiv) return;

      const enhancedSvg = svg
        .replace(
          "<svg ",
          `<svg style="max-width: 100%; height: auto; filter: drop-shadow(0 0 8px rgba(0, 255, 242, 0.15));"`,
        )
        .replace(
          /<text/g,
          `<text font-family="SF Pro Display, Arial, sans-serif" fill="#FFFFFF" style="paint-order: stroke; stroke: rgba(0,0,0,0.6); stroke-width: 2px; font-weight: 500;"`,
        );

      targetDiv.innerHTML = enhancedSvg;
      const svgElement = targetDiv.querySelector("svg");

      if (svgElement) {
        if (isThumbnail) {
          const thumbnailSize = calculateThumbnailSize(
            svgElement as SVGElement,
          );
          if (thumbnailSize) {
            setDiagramWidth(thumbnailSize.width);
            svgElement.style.width = `${thumbnailSize.width}px`;
            svgElement.style.height = `${thumbnailSize.height}px`;
          }
        } else {
          // For full-screen view
          svgElement.style.width = "100%";
          svgElement.style.height = "100%";
          svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
        }
      }

      // Store the rendered content
      if (!isThumbnail) {
        setEnlargedContent(targetDiv.innerHTML);
      }
    } catch (error) {
      console.error("Mermaid rendering failed:", error);
      targetDiv.innerHTML = `
         <div style="color: #FF4B4B; padding: 24px; text-align: center;">
           Failed to render diagram
         </div>
       `;
    } finally {
      if (!isThumbnail) setIsLoading(false);
    }
  };

  const startScrollAnimation = () => {
    if (diagramWidth > 300) {
      setIsScrolling(true);
      let position = 0;
      const maxScroll = -(diagramWidth - 300);

      scrollInterval.current = setInterval(() => {
        position = position <= maxScroll ? 0 : position - 1;
        if (containerRef.current?.querySelector("svg")) {
          (
            containerRef.current.querySelector("svg") as SVGElement
          ).style.transform = `translateX(${position}px)`;
        }
      }, 30);
    }
  };

  const stopScrollAnimation = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    if (showFullScreen) {
      // Create a temporary div and render the diagram
      const tempDiv = document.createElement("div");
      renderDiagram(tempDiv, false);
    }
  }, [showFullScreen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!showFullScreen) return;
    isDragging.current = true;
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPosition.current.x;
    const dy = e.clientY - lastPosition.current.y;
    setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleWheel = (e: WheelEvent) => {
    if (!showFullScreen) return;
    e.preventDefault();
    const delta = e.deltaY * -0.002;
    setScale((prev) => Math.min(Math.max(0.5, prev + delta), 10));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    if (containerRef.current) {
      renderDiagram(containerRef.current, true);
    }
  }, [chart]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showFullScreen) {
        setShowFullScreen(false);
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    if (showFullScreen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showFullScreen]);

  useEffect(() => {
    return () => stopScrollAnimation();
  }, []);

  useEffect(() => {
    if (showFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFullScreen]);

  useEffect(() => {
    if (showFullScreen) {
      stopScrollAnimation();
    } else {
      startScrollAnimation();
    }
  }, [showFullScreen]);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowFullScreen(false);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          cursor: "pointer",
          display: "inline-block",
          background: "linear-gradient(145deg, #0C0E16 0%, #131620 100%)",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid rgba(0, 255, 242, 0.15)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          overflow: "hidden",
        }}
        onClick={() => setShowFullScreen(true)}
        onMouseEnter={stopScrollAnimation}
        onMouseLeave={startScrollAnimation}
      >
        <div ref={containerRef} />
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(0, 13, 26, 0.8)",
            padding: "8px 12px",
            borderRadius: "8px",
            color: "#00FFF2",
            fontSize: "13px",
            fontWeight: 500,
            backdropFilter: "blur(8px)",
          }}
        >
          <span style={{ fontSize: "16px" }}>🔍</span> Click to enlarge
        </div>
      </div>

      {showFullScreen && (
        <Portal>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(12px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleClickOutside}
          >
            <div
              style={{
                position: "relative",
                width: "95vw",
                height: "95vh",
                background:
                  "linear-gradient(145deg, rgba(12, 14, 22, 0.95) 0%, rgba(19, 22, 32, 0.95) 100%)",
                borderRadius: "24px",
                border: "1px solid rgba(0, 255, 242, 0.15)",
                overflow: "hidden",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  zIndex: 10,
                }}
              >
                <IconButton
                  icon="close"
                  onClick={() => {
                    setShowFullScreen(false);
                    setScale(1);
                    setPosition({ x: 0, y: 0 });
                  }}
                  style={{
                    background: "rgba(0, 13, 26, 0.6)",
                    backdropFilter: "blur(8px)",
                  }}
                />
              </div>

              <div
                style={{
                  padding: "24px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "center",
                  }}
                >
                  <span>🔍 Scroll to zoom</span>
                  <span>✋ Click and drag to pan</span>
                  <span>ESC to close</span>
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "24px",
                    cursor: isDragging.current ? "grabbing" : "grab",
                    overflow: "hidden",
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onWheel={handleWheel as any}
                >
                  {isLoading ? (
                    <div style={{ color: "#00FFF2" }}>Loading diagram...</div>
                  ) : (
                    <div
                      style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: "center center",
                        transition: isDragging.current
                          ? "none"
                          : "transform 0.3s ease",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      dangerouslySetInnerHTML={{ __html: enlargedContent }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
