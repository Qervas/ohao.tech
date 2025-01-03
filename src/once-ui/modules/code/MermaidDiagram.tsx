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

  const renderDiagram = async (
    targetDiv: HTMLDivElement,
    isEnlarged = false,
  ) => {
    try {
      const id = `mermaid-${Math.random().toString(36).slice(2)}`;
      const { svg } = await mermaid.render(id, chart);

      // Add glow effects to the SVG
      const enhancedSvg = svg.replace(
        "<svg ",
        '<svg style="filter: drop-shadow(0 0 2px #00ffff);" ',
      );

      targetDiv.innerHTML = enhancedSvg;

      if (isEnlarged) {
        setEnlargedContent(enhancedSvg);
      }

      const svgElement = targetDiv.querySelector("svg");
      if (svgElement) {
        svgElement.style.maxWidth = "100%";
        svgElement.style.height = "auto";
        // Add subtle animation on hover
        svgElement.style.transition = "filter 0.3s ease";
        svgElement.addEventListener("mouseenter", () => {
          svgElement.style.filter = "drop-shadow(0 0 4px #00ffff)";
        });
        svgElement.addEventListener("mouseleave", () => {
          svgElement.style.filter = "drop-shadow(0 0 2px #00ffff)";
        });
      }
    } catch (error) {
      console.error("Mermaid rendering failed:", error);
      targetDiv.innerHTML = `
        <div style="
          color: #ff0000;
          padding: 20px;
          text-align: center;
          border: 1px solid #ff0000;
          border-radius: 4px;
        ">
          Failed to render diagram
        </div>
      `;
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      renderDiagram(containerRef.current);
    }
  }, [chart]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <IconButton
          icon="maximize"
          variant="secondary"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 1,
            background: "rgba(0, 0, 0, 0.7)",
            border: "1px solid #00ffff",
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)",
          }}
          onClick={() => setShowFullScreen(true)}
          tooltip="Enlarge diagram"
        />

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

      <Dialog open={showFullScreen} onClose={() => setShowFullScreen(false)}>
        <Flex
          direction="column"
          style={{
            width: "90vw",
            maxWidth: "1400px",
            height: "90vh",
            padding: "var(--static-space-24)",
            background: "#0a0a0a",
            border: "1px solid #00ffff",
            boxShadow: "0 0 30px rgba(0, 255, 255, 0.2)",
            borderRadius: "var(--radius-l)",
          }}
        >
          <Flex justifyContent="flex-end" marginBottom="16">
            <IconButton
              icon="close"
              variant="secondary"
              onClick={() => setShowFullScreen(false)}
              style={{
                border: "1px solid #00ffff",
                boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)",
              }}
            />
          </Flex>

          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: "var(--static-space-32)",
              background: "#000d1a",
              borderRadius: "var(--radius-m)",
              border: "1px solid #00ffff",
              boxShadow: "inset 0 0 20px rgba(0, 255, 255, 0.1)",
            }}
          >
            <div
              style={{
                transform: "scale(1.5)",
                transformOrigin: "top left",
                padding: "var(--static-space-24)",
              }}
              dangerouslySetInnerHTML={{ __html: enlargedContent }}
            />
          </div>
        </Flex>
      </Dialog>
    </>
  );
};
