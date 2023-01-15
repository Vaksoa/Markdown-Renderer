const renderer = (ast) => {
    let html = '';
    if (ast.type === 'document') {
        ast.children.forEach(child => {
            html += renderer(child);
        });
    } else if (ast.type === 'heading') {
        html += `<h${ast.level}>`;
        ast.children.forEach(child => {
            html += renderer(child);
        });
        html += `</h${ast.level}>`;
    } else if (ast.type === 'emphasis') {
        html += `<em>`;
        ast.children.forEach(child => {
            html += renderer(child);
        });
        html += `</em>`;
    } else if (ast.type === 'strong') {
        html += `<strong>`;
        ast.children.forEach(child => {
            html += renderer(child);
        });
        html += `</strong>`;
    } else if (ast.type === 'quote') {
        html += `<blockquote>`;
        ast.children.forEach(child => {
            html += renderer(child);
        });
        html += `</blockquote>`;
    } else if (ast.type === 'link') {
        html += `<a href="${ast.url}">`;
        ast.children.forEach(child => {
            html += renderer(child);
        });
        html += `</a>`;
    } else if (ast.type === 'list') {
        html += `<ul>`;
        ast.children.forEach(child => {
            html += renderer(child);
        });
        html += `</ul>`;
    } else if (ast.type === 'list-item') {
        html += `<li>`;
        ast.children.forEach(child => {
            html += renderer(child);
        });
        html += `</li>`;
    } else if (ast.type === 'text') {
        html += ast.value;
    }
    return html;
}

module.exports = {renderer};