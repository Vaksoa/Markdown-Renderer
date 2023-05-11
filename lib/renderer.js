const renderChildElements = (markdownNode) => {
    return markdownNode.children.reduce((acc, child) => acc + renderMarkdown(child), '');
};

const renderFunctions = {
    document: renderChildElements,
    div: (node) => `<div>${renderChildElements(node)}</div>`,
    'line-break': () => '<br>',
    heading: (node) => `<h${node.level}>${renderChildElements(node)}</h${node.level}>`,
    emphasis: (node) => `<em>${renderChildElements(node)}</em>`,
    strong: (node) => `<strong>${renderChildElements(node)}</strong>`,
    strikethrough: (node) => `<del>${renderChildElements(node)}</del>`,
    quote: (node) => `<blockquote><p>${renderChildElements(node)}</p></blockquote>`,
    link: (node) => `<a href="${node.url}">${renderChildElements(node)}</a>`,
    list: (node) => `<ul>${renderChildElements(node)}</ul>`,
    'list-item': (node) => `<li>${renderChildElements(node)}</li>`,
    'ordered-list': (node) => `<ol>${renderChildElements(node)}</ol>`,
    paragraph: (node) => `<p>${renderChildElements(node)}</p>`,
    text: (node) => `${node.value}`,
};

const renderMarkdown = (markdownNode) => {
    const renderFunction = renderFunctions[markdownNode.type];
    return renderFunction ? renderFunction(markdownNode) : '';
};

module.exports = {renderMarkdown};