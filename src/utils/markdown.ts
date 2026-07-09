/**
 * A lightweight, dependency-free Markdown to HTML parser for Academy lessons.
 * Supports paragraphs, line breaks, headings, bold/italics, lists, blockquotes, and inline code.
 */
export const parseMarkdown = (markdown: string): string => {
  if (!markdown) return '';

  let html = markdown;

  // 1. Blockquotes (lines starting with >)
  html = html.replace(/^\s*>\s*(.*)$/gim, '<blockquote class="border-l-4 border-primary pl-4 py-1 italic my-4 text-muted-foreground bg-muted rounded-r-lg">$1</blockquote>');

  // 2. Headings (H1, H2, H3)
  html = html.replace(/^\s*# (.*)$/gim, '<h1 class="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mb-6 pb-3 border-b border-border">$1</h1>');
  html = html.replace(/^\s*## (.*)$/gim, '<h2 class="text-lg md:text-xl font-bold text-foreground mt-8 mb-4">$1</h2>');
  html = html.replace(/^\s*### (.*)$/gim, '<h3 class="text-base md:text-lg font-semibold text-foreground mt-6 mb-3">$1</h3>');

  // 3. Unordered Lists (bullet points starting with *, -, or +)
  html = html.replace(/^\s*[\*\-\+]\s+(.*)$/gim, '<li class="ml-5 list-disc mb-1.5 text-muted-foreground text-sm md:text-base">$1</li>');
  
  // 4. Ordered Lists (numbered points starting with digits like 1.)
  html = html.replace(/^\s*(\d+)\.\s+(.*)$/gim, '<li class="ml-5 list-decimal mb-1.5 text-muted-foreground text-sm md:text-base">$2</li>');

  // 5. Bold & Italics
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong class="font-bold text-foreground">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic text-foreground">$1</em>');
  html = html.replace(/_(.*?)_/g, '<em class="italic text-foreground">$1</em>');

  // 6. Inline Code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-muted text-primary font-mono text-xs px-1.5 py-0.5 rounded font-semibold">$1</code>');

  // 7. Paragraph Handling
  // Split content by double newlines to treat each block as a paragraph
  const blocks = html.split(/\n\s*\n/);
  const parsedBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    // Skip wrapping if it is a heading, blockquote, or list item
    if (
      trimmed.startsWith('<h') || 
      trimmed.startsWith('<blockquote') || 
      trimmed.startsWith('<li')
    ) {
      return trimmed;
    }
    // Otherwise wrap as a standard text paragraph and preserve inline line breaks
    return `<p class="mb-4 leading-relaxed text-muted-foreground text-sm md:text-base">${trimmed.replace(/\n/g, '<br />')}</p>`;
  });

  return parsedBlocks.filter(b => b !== '').join('\n');
};
