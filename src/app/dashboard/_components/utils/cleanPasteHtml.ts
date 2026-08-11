/**
 * Sanitizes and cleans HTML pasted from Microsoft Word, Google Docs, or other rich text sources
 * before Tiptap processes it into document nodes.
 */
export function cleanPasteHtml(html: string): string {
  if (!html) return '';

  // 1. Remove Word/MSO comment blocks, XML blocks, and <style> blocks
  let cleaned = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<xml[\s\S]*?<\/xml>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<o:p>\s*<\/o:p>/gi, '')
    .replace(/<o:p>([\s\S]*?)<\/o:p>/gi, '$1');

  if (typeof window === 'undefined') return cleaned;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(cleaned, 'text/html');

    // Helper to process nodes recursively
    const processNode = (node: Node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const el = node as HTMLElement;
      const tagName = el.tagName.toLowerCase();

      // 2. Map Word Heading classes or H1/H2/H3 tags to lower heading levels (H1 -> H2, H2 -> H3, H3 -> H4)
      let targetTag = tagName;
      const className = el.className || '';

      if (tagName === 'h1' || /msoheading1|heading\s*1/i.test(className)) {
        targetTag = 'h2';
      } else if (tagName === 'h2' || /msoheading2|heading\s*2/i.test(className)) {
        targetTag = 'h3';
      } else if (tagName === 'h3' || /msoheading3|heading\s*3/i.test(className)) {
        targetTag = 'h4';
      }

      // Convert tag if needed
      let newEl = el;
      if (targetTag !== tagName) {
        const replacement = doc.createElement(targetTag);
        while (el.firstChild) {
          replacement.appendChild(el.firstChild);
        }
        // Copy attributes
        Array.from(el.attributes).forEach((attr) => {
          replacement.setAttribute(attr.name, attr.value);
        });
        if (el.parentNode) {
          el.parentNode.replaceChild(replacement, el);
        }
        newEl = replacement;
      }

      // 3. Convert Google Docs font-weight/font-style spans to standard semantic tags
      if (newEl.tagName.toLowerCase() === 'span') {
        const fontWeight = newEl.style.fontWeight;
        const fontStyle = newEl.style.fontStyle;
        const textDecoration = newEl.style.textDecoration;

        if (fontWeight === '700' || fontWeight === 'bold') {
          const b = doc.createElement('strong');
          if (newEl.parentNode) {
            newEl.parentNode.insertBefore(b, newEl);
            b.appendChild(newEl);
          }
          newEl.style.fontWeight = '';
        }
        if (fontStyle === 'italic') {
          const i = doc.createElement('em');
          if (newEl.parentNode) {
            newEl.parentNode.insertBefore(i, newEl);
            i.appendChild(newEl);
          }
          newEl.style.fontStyle = '';
        }
        if (textDecoration.includes('underline')) {
          const u = doc.createElement('u');
          if (newEl.parentNode) {
            newEl.parentNode.insertBefore(u, newEl);
            u.appendChild(newEl);
          }
          newEl.style.textDecoration = '';
        }
      }

      // 4. Clean style attributes (strip font-family, mso-*, margins, line-height overrides)
      if (newEl.hasAttribute('style')) {
        const style = newEl.style;
        const allowedStyles: string[] = [];

        if (style.textAlign) {
          allowedStyles.push(`text-align: ${style.textAlign}`);
        }
        if (style.color) {
          allowedStyles.push(`color: ${style.color}`);
        }
        if (style.backgroundColor && style.backgroundColor !== 'transparent') {
          allowedStyles.push(`background-color: ${style.backgroundColor}`);
        }
        if (style.fontSize) {
          allowedStyles.push(`font-size: ${style.fontSize}`);
        }

        if (allowedStyles.length > 0) {
          newEl.setAttribute('style', allowedStyles.join('; '));
        } else {
          newEl.removeAttribute('style');
        }
      }

      // Remove Word specific classes
      if (newEl.hasAttribute('class')) {
        const cleanClass = newEl.className
          .replace(/Mso\w+/g, '')
          .replace(/docs-\w+/g, '')
          .trim();
        if (cleanClass) {
          newEl.className = cleanClass;
        } else {
          newEl.removeAttribute('class');
        }
      }

      // Recursively process child nodes
      Array.from(newEl.childNodes).forEach(processNode);
    };

    Array.from(doc.body.childNodes).forEach(processNode);
    return doc.body.innerHTML;
  } catch (err) {
    console.error('Error cleaning paste HTML:', err);
    return cleaned;
  }
}
