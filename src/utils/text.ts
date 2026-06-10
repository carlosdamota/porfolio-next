/**
 * Removes Markdown formatting from a string to return clean plain text.
 */
export function stripMarkdown(md: string): string {
  if (!md) return "";
  
  let str = md;
  
  // Remove code blocks
  str = str.replace(/```[a-z]*\n[\s\S]*?\n```/g, "");
  
  // Remove headers
  str = str.replace(/^#+\s+/gm, "");
  
  // Remove links: [text](url) -> text
  str = str.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  
  // Remove bold/italic: **text** or __text__ -> text, *text* or _text_ -> text
  str = str.replace(/(\*\*|__)(.*?)\1/g, "$2");
  str = str.replace(/(\*|_)(.*?)\1/g, "$2");
  
  // Remove inline code: `code` -> code
  str = str.replace(/`([^`]+)`/g, "$1");
  
  // Remove blockquotes: > text -> text
  str = str.replace(/^\s*>\s+/gm, "");
  
  // Remove list indicators: - item or * item or 1. item -> item
  str = str.replace(/^\s*[-*+]\s+/gm, "");
  str = str.replace(/^\s*\d+\.\s+/gm, "");
  
  return str.trim();
}
