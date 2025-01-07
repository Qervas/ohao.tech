declare module "prismjs" {
  const Prism: {
    highlightAll: () => void;
    highlight: (code: string, grammar: any, language: string) => string;
    highlightElement: (element: Element) => void;
    languages: {
      [language: string]: any;
    };
  };
  export default Prism;
}
