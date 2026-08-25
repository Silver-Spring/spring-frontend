'use client';

import DOMPurify from 'dompurify';

interface RichTextProps {
  content: string;
  className?: string;
}

export const RichText = ({ content, className }: RichTextProps) => {
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['b', 'br', 'em', 'i', 'strong'],
    ALLOWED_ATTR: [],
  });

  return <span className={className} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};