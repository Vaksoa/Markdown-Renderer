# Markdown Renderer

This enhanced Markdown Renderer is a simple yet powerful tool for rendering Markdown files. While not a comprehensive Markdown parser, it supports a variety of features, including:

- Headings
- Emphasis (*italic*)
- Strong (**bold**)
- Blockquotes
- Links ([link](http://example.com))
- Unordered (& ordered) Lists
- Text

## Table of Contents

- [Installation](#installation)
- [Code Overview](#code-overview)
  - [Parser.js](#parserjs)
  - [Renderer.js](#rendererjs)
- [Limitations and Future Improvements](#limitations-and-future-improvements)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Installation

Get started with the following steps:

```bash
$ git clone https://github.com/Vaksoa/Markdown-Renderer.git
$ cd Markdown-Renderer
$ npm install
$ npm run dev
```

## Code Overview

### Parser.js

The `Parser.js` file defines the `parseMarkdown` function, which takes a Markdown string as input and returns an Abstract Syntax Tree (AST) representation of the content. The AST is constructed by iterating through the input lines and applying a series of handlers to match and parse different Markdown elements.

```js
const parseMarkdown = (markdown) => {
    // Initialize the AST, current node, and node stack
    // ...

    // Define helper functions for creating and updating nodes
    // ...

    // Define regex patterns and their corresponding node types
    // ...

    // Define handlers for processing input lines
    // ...

    // Iterate through the input lines and apply handlers
    // ...

    return abstractSyntaxTree;
}

module.exports = {parseMarkdown};
```

### Renderer.js

The `Renderer.js` file contains the `renderMarkdown` function, which takes an AST node as input and returns the corresponding HTML. The rendering is done using a set of render functions defined for each node type.

```js
const renderChildElements = (markdownNode) => {
    // ...
};

const renderFunctions = {
    document: renderChildElements,
    div: (node) => `<div>${renderChildElements(node)}</div>`,
    'line-break': () => '<br>',
    heading: (node) => `<h${node.level}>${renderChildElements(node)}</h${node.level}>`,
    emphasis: (node) => `<em>${renderChildElements(node)}</em>`,
    strong: (node) => `<strong>${renderChildElements(node)}</strong>`,
    quote: (node) => `<blockquote><p>${renderChildElements(node)}</p></blockquote>`,
    link: (node) => `<a href="${node.url}">${renderChildElements(node)}</a>`,
    list: (node) => `<ul>${renderChildElements(node)}</ul>`,
    'list-item': (node) => `<li>${renderChildElements(node)}</li>`,
    paragraph: (node) => `<p>${renderChildElements(node)}</p>`,
    text: (node) => `${node.value}`,
};

const renderMarkdown = (markdownNode) => {
    // ...
};

module.exports = {renderMarkdown};
```

## Limitations and Future Improvements

As mentioned earlier, this Markdown Renderer is not a comprehensive parser and does not support all Markdown features. Future improvements could include:

- Supporting ordered lists
- Adding support for tables
- Implementing fenced code blocks with language-specific syntax highlighting

## Roadmap

- [x] Parser.js: Implement `parseMarkdown` function for converting Markdown strings to AST representation.
- [x] Renderer.js: Implement `renderMarkdown` function for converting AST nodes to HTML.
- [x] Support ordered lists: Enhance the parser and renderer to support ordered lists in addition to unordered lists.
- [ ] Add support for tables: Implement table parsing and rendering in both the parser and renderer.
- [ ] Implement fenced code blocks with language-specific syntax highlighting: Add support for fenced code blocks and integrate a syntax highlighting library for displaying code snippets in different programming languages.

## Contributing

We welcome contributions from the community and are eager for your input. Please consider the following resources when contributing:

- **Documentation**: Check the project's handbook and roadmap for more information.
- **Bugs**: Report any issues or bugs using the GitHub issue tracker.
- **Communication**: Join our [discord server](https://discord.com), or message me for discussions and support.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.