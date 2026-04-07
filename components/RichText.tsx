import ReactMarkdown from 'react-markdown';

type RichTextProps = {
  source: string;
  className?: string;
};

export function RichText({ source, className = '' }: RichTextProps) {
  return (
    <div className={`prose-content ${className}`.trim()}>
      <ReactMarkdown>{source}</ReactMarkdown>
    </div>
  );
}
