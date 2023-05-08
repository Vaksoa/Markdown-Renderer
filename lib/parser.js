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

    const createNode = (type, properties) => {
        return {type, ...properties};
    };

    const updateStackAndIndentation = (newNode, indentation) => {
        if (indentation > currentIndentation) {
            let parent = stack[stack.length - 1];
            if (!parent.children) parent.children = [];
            parent.children.push(newNode);
            stack.push(newNode);
            currentNode = newNode;
            currentIndentation = indentation;
        } else {
            while (indentation < currentIndentation) {
                stack.pop();
                currentNode = stack[stack.length - 1];
                currentIndentation = currentNode.value ? currentNode.value.search(/\S|$/) : 0;
            }
        }
    };

    const regexToNodeType = {
        heading: ['heading', (matches) => ({level: matches[1].length})],
        emphasis: ['emphasis', (matches) => ({isStrong: matches[1].length === 2})],
        quote: ['quote', (matches) => ({})],
        link: ['link', (matches) => ({url: matches[2]})],
        listItem: ['list-item', (matches) => ({})],
    };

    const handleNodeCreation = (line, indentation) => {
        for (const key in regexToNodeType) {
            const matches = line.match(regex[key]);
            if (matches) {
                const [nodeType, getProperties] = regexToNodeType[key];
                const node = createNode(nodeType, {
                    ...getProperties(matches),
                    children: [createNode('text', {value: matches[2]})]
                });

                if (nodeType === 'list-item') {
                    updateStackAndIndentation(node, indentation);
                } else {
                    currentNode.children.push(node);
                }

                return true;
            }
        }
        return false;
    };

    const handleLineBreak = (line, indentation) => {
        if (line.trim() === '') {
            const lastChild = currentNode.children[currentNode.children.length - 1];
            if (lastChild && lastChild.type !== 'line-break') {
                currentNode.children.push(createNode('line-break', {}));
            }
            return true;
        }
        return false;
    };

    const handleText = (line, indentation, parentType) => {
        const textNode = createNode('text', {value: line});
        if (parentType === 'list-item' || parentType === 'heading') {
            currentNode.children.push(textNode);
        } else {
            currentNode.children.push(createNode('paragraph', {children: [textNode]}));
        }
        return true;
    };

    const handlers = [
        handleLineBreak,
        handleNodeCreation,
        (line, indentation) => handleText(line, indentation, currentNode.type),
    ];

    for (const line of lines) {
        const indentation = line.search(/\S|$/);

        for (const handler of handlers) {
            if (handler(line, indentation)) {
                break;
            }
        }

        currentIndentation = 0;
        stack = [currentNode];
    }
    return ast;
}

module.exports = {parse};