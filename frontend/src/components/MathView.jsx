import React from 'react';
import katex from 'katex';

export default function MathView({ math, display = false, text = '', className = '' }) {
  if (math) {
    try {
      const html = katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
      });
      return (
        <span
          className={`inline-block ${className}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch (e) {
      return <span className="text-red-400 font-mono">{math}</span>;
    }
  }

  // Si du texte mixte contenant $...$ ou $$...$$ est fourni
  if (text) {
    // Découpage par blocs $$...$$ et inline $...$
    const parts = [];
    const regex = /(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index),
        });
      }

      const raw = match[0];
      if (raw.startsWith('$$') && raw.endsWith('$$')) {
        parts.push({
          type: 'math-display',
          content: raw.slice(2, -2).trim(),
        });
      } else {
        parts.push({
          type: 'math-inline',
          content: raw.slice(1, -1).trim(),
        });
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex),
      });
    }

    return (
      <span className={className}>
        {parts.map((p, i) => {
          if (p.type === 'text') {
            return <span key={i}>{p.content}</span>;
          }
          try {
            const html = katex.renderToString(p.content, {
              displayMode: p.type === 'math-display',
              throwOnError: false,
            });
            return (
              <span
                key={i}
                className={p.type === 'math-display' ? 'block my-2 text-center' : 'inline-block mx-0.5'}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch (e) {
            return <span key={i} className="text-red-400">{p.content}</span>;
          }
        })}
      </span>
    );
  }

  return null;
}
