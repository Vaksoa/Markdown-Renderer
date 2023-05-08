const parseMarkdown = (markdown) => {
    let abstractSyntaxTree = {type: 'document', children: []};
    let currentNode = abstractSyntaxTree;
    let currentIndentation = 0;
    let nodeStack = [currentNode];

    const lines = markdown.split("\n");

    const createNode = (type, properties) => {
        const node = {type};
        Object.assign(node, properties);
        Object.freeze(node);
        return node;
    };

    const updateNodeStackAndIndentation = (newNode, indentation) => {
        const nodeStackLength = nodeStack.length;
        const parentNode = nodeStack[nodeStackLength - 1];

        if (indentation > currentIndentation) {
            if (!parentNode.children) parentNode.children = [];
            parentNode.children.push(newNode);
            nodeStack.push(newNode);
            currentNode = newNode;
            currentIndentation = indentation;
        } else {
            while (indentation < currentIndentation) {
                nodeStack.pop();
                currentNode = nodeStack[nodeStack.length - 1];
                currentIndentation = currentNode.value ? currentNode.value.search(/\S|$/) : 0;
            }
        }
    };

    const regexPatterns = {
        heading: /^(#{1,6})\s(.*)/,
        emphasis: /^(\*{1,2})(.*)\1/,
        quote: /^(>)\s(.*)/,
        link: /^\[(.*)\]\((.*)\)/,
        listItem: /^(\s*-\s)(.*)/,
    };

    const regexPatternsToNodeTypes = {
        heading: ['heading', (matches) => ({level: matches[1].length})],
        emphasis: ['emphasis', (matches) => ({isStrong: matches[1].length === 2})],
        quote: ['quote', (matches) => ({})],
        link: ['link', (matches) => ({url: matches[2]})],
        listItem: ['list-item', (matches) => ({})],
    };

    const createNodeFromLine = (line, indentation) => {
        const keys = Object.keys(regexPatternsToNodeTypes);
        const len = keys.length;

        for (let i = 0; i < len; i++) {
            const key = keys[i];
            const matches = line.match(regexPatterns[key]);
            if (matches) {
                const [nodeType, getProperties] = regexPatternsToNodeTypes[key];
                const node = createNode(nodeType, {
                    ...getProperties(matches),
                    children: [createNode('text', {value: matches[2]})],
                });

                if (nodeType === 'list-item') {
                    updateNodeStackAndIndentation(node, indentation);
                } else {
                    currentNode.children.push(node);
                }

                return true;
            }
        }
        return false;
    };

    const handleLineBreak = (line, indentation) => {
        const trimmedLine = line.trim();
        if (trimmedLine === '') {
            const childrenLength = currentNode.children.length;
            const lastChild = childrenLength > 0 ? currentNode.children[childrenLength - 1] : null;
            if (lastChild && lastChild.type !== 'line-break') {
                currentNode.children.push(createNode('line-break', {}));
            }
            return true;
        }
        return false;
    };

    const createTextNode = (line, indentation, parentType) => {
        const textNode = createNode('text', {value: line});
        const shouldAddToParent = parentType === 'list-item' || parentType === 'heading';
        if (shouldAddToParent) {
            currentNode.children.push(textNode);
        } else {
            currentNode.children.push(createNode('paragraph', {children: [textNode]}));
        }
        return true;
    };

    const handlers = [
        handleLineBreak,
        createNodeFromLine,
        (line, indentation) => createTextNode(line, indentation, currentNode.type),
    ];

    const linesLength = lines.length;
    const handlersLength = handlers.length;

    for (let i = 0; i < linesLength; i++) {
        const line = lines[i];
        const indentation = line.search(/\S|$/);

        for (let j = 0; j < handlersLength; j++) {
            const handler = handlers[j];
            if (handler(line, indentation)) {
                break;
            }
        }

        currentIndentation = 0;
        nodeStack = [currentNode];
    }

    return abstractSyntaxTree;
}

module.exports = {parseMarkdown};