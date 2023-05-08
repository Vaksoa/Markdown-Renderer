const renderChildElements = (markdownNode) => {
    return markdownNode.children.map(child => renderMarkdown(child)).join('')
}

const renderMarkdown = (markdownNode) => {
    switch (markdownNode.type) {
        case 'document':
            return renderChildElements(markdownNode);
        case 'div':
            return `<div>${renderChildElements(markdownNode)}</div>`;
        case 'line-break':
            return '<br>';
        case 'heading':
            return `<h${markdownNode.level}>${renderChildElements(markdownNode)}</h${markdownNode.level}>`;
        case 'emphasis':
            return `<em>${renderChildElements(markdownNode)}</em>`;
        case 'strong':
            return `<strong>${renderChildElements(markdownNode)}</strong>`;
        case 'quote':
            return `<blockquote>${renderChildElements(markdownNode)}</blockquote>`;
        case 'link':
            return `<a href="${markdownNode.url}">${renderChildElements(markdownNode)}</a>`;
        case 'list':
            return `<ul>${renderChildElements(markdownNode)}</ul>`;
        case 'list-item':
            return `<li>${renderChildElements(markdownNode)}</li>`;
        case 'paragraph':
            return `<p>${renderChildElements(markdownNode)}</p>`;
        case 'text':
            return `${markdownNode.value}`;
        default:
            return '';
    }
}

module.exports = {renderMarkdown};