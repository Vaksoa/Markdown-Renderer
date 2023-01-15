const parse = (markdown) => {
    let ast = {type: 'document', children: []};
    let currentNode = ast;
    let currentIndentation = 0;
    let stack = [currentNode];

    const regex = {
        heading: /^(#{1,6})\s(.*)/,
        emphasis: /^(\*{1,2})(.*)\1/,
        quote: /^(>)\s(.*)/,
        link: /^\[(.*)\]\((.*)\)/,
        listItem: /^(\s*-\s)(.*)/,
    };

    const lines = markdown.split("\n");

    for (let i = 0; i < lines.length; i++) {
        let matches = null;
        let line = lines[i];
        let indentation = line.search(/\S|$/);

        if (matches = line.match(regex.heading)) {
            currentNode.children.push({
                type: 'heading',
                level: matches[1].length,
                children: [{type: 'text', value: matches[2]}]
            });
            currentIndentation = 0;
            stack = [currentNode];
        } else if (matches = line.match(regex.emphasis)) {
            currentNode.children.push({
                type: matches[1].length === 1 ? 'emphasis' : 'strong',
                children: [{type: 'text', value: matches[2]}]
            });
            currentIndentation = 0;
            stack = [currentNode];
        } else if (matches = line.match(regex.quote)) {
            currentNode.children.push({
                type: 'quote',
                children: [{type: 'text', value: matches[2]}]
            });
            currentIndentation = 0;
            stack = [currentNode];
        } else if (matches = line.match(regex.link)) {
            currentNode.children.push({
                type: 'link',
                url: matches[2],
                children: [{type: 'text', value: matches[2]}]
            });
            currentIndentation = 0;
            stack = [currentNode];
        } else if (matches = line.match(regex.listItem)) {
            if (indentation > currentIndentation) {
                let parent = stack[stack.length - 1];
                if (!parent.children) parent.children = [];
                let newNode = {type: 'list', children: []};
                parent.children.push(newNode);
                stack.push(newNode);
                currentNode = newNode;
                currentIndentation = indentation;
            } else {
                while (indentation < currentIndentation) {
                    stack.pop();
                    currentNode = stack[stack.length - 1];
                    currentIndentation = line.slice(0, currentNode.value.length).search(/\S|$/);
                }
            }
            currentNode.children.push({
                type: 'list-item',
                children: [{type: 'text', value: matches[2]}]
            });
        } else {
            currentNode.children.push({
                type: 'text',
                value: line
            });
            currentIndentation = 0;
            stack = [currentNode];
        }
    }
    return ast;
}

module.exports = {parse};