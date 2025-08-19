import { FC } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language?: string;
  code: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ language = "java", code }) => {
  return (
    <div className="mb-2 mt-2 w-full md:w-3/4 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <SyntaxHighlighter
        language={language}
        style={materialLight}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "transparent",
          fontSize: "0.9rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
