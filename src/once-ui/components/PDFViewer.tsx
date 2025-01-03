"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

interface PDFViewerProps {
  url: string;
  width?: string;
  height?: string;
}

export function PDFViewer({
  url,
  width = "100%",
  height = "500px",
}: PDFViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        variant="secondary"
        size="m"
        prefixIcon={isExpanded ? "eye-off" : "eye"}
        label={isExpanded ? "Hide PDF" : "Show PDF"}
        style={{ marginBottom: "0.5rem" }}
      />
      {isExpanded && (
        <iframe
          src={url}
          width={width}
          height={height}
          style={{
            border: "1px solid var(--neutral-border-medium)",
            borderRadius: "var(--radius-m)",
          }}
        />
      )}
    </div>
  );
}
