"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Dialog, Flex, IconButton } from "@/once-ui/components";

interface MermaidProps {
  chart: string;
}

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    pie1: "#00fff2", // First slice color
    pie2: "#1a1a1a", // Second slice color
    primaryColor: "#1a1a1a", // Darker background for highlighted nodes
    primaryTextColor: "#00fff2", // Cyan text
    primaryBorderColor: "#00fff2", // Cyan border

    // Secondary colors (for regular nodes)
    secondaryColor: "#141414", // Dark background
    secondaryTextColor: "#ffffff", // White text
    secondaryBorderColor: "#404040", // Subtle border

    // Tertiary colors (for special nodes)
    tertiaryColor: "#1a1a1a",
    tertiaryTextColor: "#ff00ff",
    tertiaryBorderColor: "#ff00ff",

    // Background
    background: "#141414",
    mainBkg: "#1a1a1a",
    nodeBkg: "#1a1a1a", // Darker node background

    // Text
    textColor: "#ffffff",
    lineColor: "#404040", // Softer lines
    fontSize: "16px",

    // Node colors
    nodeBorder: "#404040",
    clusterBkg: "#1a1a1a",
    clusterBorder: "#404040",
    titleColor: "#00fff2",

    // Special states
    activationBorderColor: "#ff00ff",
    activationBkgColor: "#1a1a1a",

    // Contrast for notes
    noteBkgColor: "#1a1a1a",
    noteTextColor: "#ffffff",
    noteBorderColor: "#404040",

    // Edge labels
    edgeLabelBackground: "#141414",

    // Flow diagram
    flowchartTitleColor: "#00fff2",
    defaultLinkColor: "#404040",
  },
  flowchart: {
    curve: "basis",
    padding: 20,
    useMaxWidth: true,
    htmlLabels: true,
  },
  sequence: {
    mirrorActors: false,
    bottomMarginAdj: 10,
    messageAlign: "center",
    width: 150,
    height: 40,
  },
  securityLevel: "loose",
});

export const MermaidDiagram: React.FC<MermaidProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [enlargedContent, setEnlargedContent] = useState<string>("");
  const [isZoomed, setIsZoomed] = useState(false);

  // Add zoom state
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const renderDiagram = async (targetDiv: HTMLDivElement) => {
    try {
      const id = `mermaid-${Math.random().toString(36).slice(2)}`;
      const { svg } = await mermaid.render(id, chart);

      // Add glow effects to the SVG
      const enhancedSvg = svg.replace(
        "<svg ",
        '<svg style="filter: drop-shadow(0 0 2px #00ffff);" ',
      );

      targetDiv.innerHTML = enhancedSvg;

      // Store the content for the enlarged view
      if (showFullScreen) {
        setEnlargedContent(enhancedSvg);
      }

      const svgElement = targetDiv.querySelector("svg");
      if (svgElement) {
        svgElement.style.maxWidth = "100%";
        svgElement.style.height = "auto";
      }
    } catch (error) {
      console.error("Mermaid rendering failed:", error);
      targetDiv.innerHTML = `
        <div style="color: #ff0000; padding: 20px; text-align: center; border: 1px solid #ff0000; border-radius: 4px;">
          Failed to render diagram
        </div>
      `;
    }
  };

  // Handle mouse wheel for zooming
  const handleWheel = (e: WheelEvent) => {
    if (!showFullScreen) return;
    e.preventDefault();
    const delta = e.deltaY * -0.001; // Made zoom more subtle
    setScale((prev) => Math.min(Math.max(0.5, prev + delta), 2));
  };

  // Handle mouse drag for panning
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

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Initial render
  useEffect(() => {
    if (containerRef.current) {
      renderDiagram(containerRef.current);
    }
  }, [chart]);

  // Reset zoom and position when closing dialog
  useEffect(() => {
    if (!showFullScreen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else if (containerRef.current) {
      renderDiagram(containerRef.current);
    }
  }, [showFullScreen]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "4px 8px",
            background: "rgba(0, 0, 0, 0.7)",
            borderRadius: "var(--radius-m)",
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.2)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onClick={() => {
            setShowFullScreen(true);
            setIsZoomed(true);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.8)";
            e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 255, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)";
            e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 255, 255, 0.2)";
          }}
        >
          <span
            style={{
              color: "#00ffff",
              fontSize: "var(--font-size-body-s)",
              userSelect: "none",
            }}
          >
            Zoom
          </span>
          <IconButton
            icon={isZoomed ? "zoomOut" : "zoomIn"}
            variant="secondary"
            style={{
              background: "rgba(0, 255, 255, 0.1)",
              border: "1px solid #00ffff",
              color: "#00ffff",
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent double triggering
              setShowFullScreen(true);
              setIsZoomed(true);
            }}
            tooltip={isZoomed ? "Exit fullscreen" : "View larger"}
          />
        </div>

        <div
          ref={containerRef}
          style={{
            background: "var(--surface-background)",
            padding: "var(--static-space-24)",
            borderRadius: "var(--radius-m)",
            border: "1px solid #00ffff",
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.1)",
            width: "100%",
            overflow: "hidden",
          }}
        />
      </div>

      <Dialog
        isOpen={showFullScreen}
        onClose={() => {
          setShowFullScreen(false);
          setIsZoomed(false);
        }}
        title="Enlarged Diagram"
        description={
          <span
            style={{
              color: "var(--neutral-on-background-weak)",
              fontSize: "var(--font-size-body-s)",
            }}
          >
            🔍 Scroll to zoom • ✋ Click and drag to pan • ESC to close
          </span>
        }
        style={{
          // Make dialog fill most of the screen
          maxWidth: "95vw", // increased from 80vw
          width: "95vw",
          height: "90vh", // increased from 80vh
          margin: "auto",
        }}
      >
        <Flex
          direction="column"
          style={{
            width: "100%",
            height: "calc(90vh - 80px)", // Adjust for dialog header
            background: "var(--surface-background)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              padding: "var(--static-space-24)", // reduced padding to give more space to content
              cursor: isDragging.current ? "grabbing" : "grab",
              background: "#000d1a", // darker background for contrast
              borderRadius: "var(--radius-m)",
              border: "1px solid var(--neutral-border-medium)",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel as any}
          >
            <div
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "center center",
                transition: isDragging.current ? "none" : "transform 0.1s ease",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dangerouslySetInnerHTML={{ __html: enlargedContent }}
            />
          </div>
        </Flex>
      </Dialog>
    </>
  );
};
