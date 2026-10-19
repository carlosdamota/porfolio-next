'use client';

import React, { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, className, ...props }) => {
  const [copied, setCopied] = useState(false);

  // Extract raw text from children
  const codeText = React.Children.toArray(children)
    .map((child) => (typeof child === 'string' ? child : ''))
    .join('');

  // Extract language from className (e.g., "language-bash")
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  const handleCopy = async () => {
    if (!codeText) return;
    try {
      await navigator.clipboard.writeText(codeText.replace(/\n$/, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  // If inline code (not a pre block)
  if (!className && typeof children === 'string' && !children.includes('\n')) {
    return (
      <code className="px-1.5 py-0.5 rounded bg-muted/80 text-primary font-mono text-xs border border-border/60" {...props}>
        {children}
      </code>
    );
  }

  return (
    <div className="relative group my-5 rounded-xl overflow-hidden border border-border/80 bg-card/90 shadow-md">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/60 bg-muted/40 text-xs text-muted-foreground font-mono">
        <span>{language || 'text'}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-card hover:text-foreground text-[11px] transition-colors border border-transparent hover:border-border/60"
          aria-label="Copiar código"
        >
          {copied ? (
            <>
              <FiCheck className="text-primary" size={13} />
              <span className="text-primary font-medium">Copiado</span>
            </>
          ) : (
            <>
              <FiCopy size={13} />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-foreground/90">
        <code className={className} {...props}>
          {children}
        </code>
      </div>
    </div>
  );
};
