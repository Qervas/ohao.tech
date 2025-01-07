"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import "@/once-ui/modules/code/CodeHighlight.css";
import styles from "@/once-ui/modules/code/CodeBlock.module.scss";
import {
  Flex,
  Button,
  IconButton,
  DropdownWrapper,
} from "@/once-ui/components";
import { MermaidDiagram } from "./MermaidDiagram";
import Prism from "prismjs";

// Import Prism languages
import "prismjs/plugins/line-highlight/prism-line-highlight";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-sql";

const LANGUAGE_NAMES: { [key: string]: string } = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  jsx: "JSX",
  tsx: "TSX",
  css: "CSS",
  scss: "SCSS",
  json: "JSON",
  markdown: "Markdown",
  python: "Python",
  java: "Java",
  c: "C",
  cpp: "C++",
  rust: "Rust",
  go: "Go",
  bash: "Bash",
  yaml: "YAML",
  sql: "SQL",
  mermaid: "Mermaid",
};

type CodeInstance = {
  code: string;
  language: string;
  label?: string;
};

interface CodeBlockProps {
  highlight?: string;
  codeInstances?: CodeInstance[];
  code?: string;
  language?: string;
  filename?: string;
  codePreview?: ReactNode;
  copyButton?: boolean;
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  highlight,
  codeInstances = [],
  code: singleCode,
  language: singleLanguage,
  filename,
  codePreview,
  copyButton = true,
  compact = false,
  className,
  style,
}) => {
  const codeRef = useRef<HTMLElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const [selectedInstance, setSelectedInstance] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  // Handle both single code and code instances
  const instances =
    codeInstances.length > 0
      ? codeInstances
      : singleCode && singleLanguage
        ? [{ code: singleCode, language: singleLanguage, label: filename }]
        : [];

  const { code, language, label } = instances[selectedInstance] || {
    code: "",
    language: "",
    label: "Select Code",
  };

  const [isCodeVisible, setIsCodeVisible] = useState(language !== "mermaid");

  useEffect(() => {
    if (codeRef.current && instances.length > 0) {
      // Prism.highlightElement(codeRef.current);
      if (language && code) {
        const grammar = Prism.languages[language];
        if (grammar) {
          const highlightedCode = Prism.highlight(code, grammar, language);
          codeRef.current.innerHTML = highlightedCode;
        }
      }
    }
    setIsCodeVisible(language !== "mermaid");
  }, [code, instances.length, language]);

  const handleCopy = async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleContent = (selectedLabel: string) => {
    const index = instances.findIndex(
      (instance) => instance.label === selectedLabel,
    );
    if (index !== -1) {
      setSelectedInstance(index);
    }
  };

  const renderCodeContent = () => {
    if (language === "mermaid") {
      return <MermaidDiagram chart={code} />;
    }

    return (
      <div className={styles.codeContainer}>
        <div className={styles.header}>
          <span className={styles.language}>
            {label || LANGUAGE_NAMES[language] || language}
          </span>
          {copyButton && (
            <IconButton
              icon={isCopied ? "check" : "clipboard"}
              variant="secondary"
              size="s"
              onClick={handleCopy}
              className={`${styles.copyButton} ${isCopied ? styles.copySuccess : ""}`}
              tooltip={isCopied ? "Copied!" : "Copy code"}
            />
          )}
        </div>
        <pre ref={preRef} className={styles.pre} data-line={highlight}>
          <code ref={codeRef} className={`${styles.code} language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    );
  };

  const renderMermaidCode = () => (
    <div className={styles.mermaidContainer}>
      <MermaidDiagram chart={code} />
      {isCodeVisible && (
        <pre className={`${styles.pre} language-mermaid`}>
          <code className={`${styles.code}`}>{code}</code>
        </pre>
      )}
      <Flex justifyContent="flex-end" padding="8">
        <Button
          size="s"
          variant="tertiary"
          onClick={() => setIsCodeVisible(!isCodeVisible)}
          label={isCodeVisible ? "Hide Code" : "Show Code"}
        />
      </Flex>
    </div>
  );

  if (!instances.length) return null;

  return (
    <Flex direction="column" className={className} style={style}>
      {instances.length > 1 && (
        <DropdownWrapper
          dropdownOptions={instances.map((instance, index) => ({
            label:
              instance.label ||
              LANGUAGE_NAMES[instance.language] ||
              instance.language,
            value: `${instance.label}-${index}`,
          }))}
          dropdownProps={{
            onOptionSelect: (option) => {
              const selectedLabel = option.value.split("-")[0];
              handleContent(selectedLabel);
            },
          }}
        >
          <Button
            size="s"
            label={label || LANGUAGE_NAMES[language] || language}
            suffixIcon="chevronDown"
            variant="tertiary"
          />
        </DropdownWrapper>
      )}

      {codePreview && (
        <Flex padding="l" justifyContent="center" alignItems="center">
          {codePreview}
        </Flex>
      )}

      {language === "mermaid" ? renderMermaidCode() : renderCodeContent()}
    </Flex>
  );
};
