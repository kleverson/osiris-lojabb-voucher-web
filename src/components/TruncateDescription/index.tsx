import { useState } from "react";
import DOMPurify from "dompurify";

type Props = {
  html: string;
  maxLength?: number;
};

const TruncateDescription = ({ html, maxLength = 150 }: Props) => {
  const [expanded, setExpanded] = useState(false);

  // 🔹 Sanitiza o HTML
  const cleanHTML = DOMPurify.sanitize(html || "");

  // 🔹 Remove tags p/ contar texto puro
  const textContent = cleanHTML.replace(/<[^>]+>/g, "");
  const isLong = textContent.length > maxLength;

  // 🔹 Decide o que exibir
  const displayHTML = expanded
    ? cleanHTML
    : DOMPurify.sanitize(textContent.substring(0, maxLength) + "...");

  return (
    <div>
      <p
        dangerouslySetInnerHTML={{
          __html: displayHTML,
        }}
      />
      {isLong && (
        <button
          className="text-blue-600 underline mt-2 text-blue font-bold text-base"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Ver menos" : "Ver mais"}
        </button>
      )}
    </div>
  );
};

export default TruncateDescription;
