import React from 'react'
import Head from 'next/head'

import {parseMarkdown} from '../lib/parser'
import {renderMarkdown} from '../lib/renderer'

const Preview = React.memo(({html}) => (
    <div className="preview-content" dangerouslySetInnerHTML={{__html: html}}></div>
))

const debounce = (func, wait) => {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), wait)
    }
}

const Home = (props) => {
    const [input, setInput] = React.useState("")
    const [renderHTML, setRenderHTML] = React.useState("")

    const debouncedSetRenderHTML = debounce((text) => {
        setRenderHTML(renderMarkdown(parseMarkdown(text)))
    }, 300)

    return (
        <>
            <div className="wrapper">
                <Head>
                    <title>Old Physical Wolverine</title>
                    <meta property="og:title" content="Old Physical Wolverine"/>
                </Head>
                <div className="stars"></div>
                <div className="title">
                    <span className="heading">Markdown Preview</span>
                    <a
                        href="https://github.com/Vaksoa"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="github button"
                    >
                        GitHub
                    </a>
                </div>
                <div className="content">
                    <div className="background"></div>
                    <div className="editor">
                        <div className="header">
                            <span className="editor-heading">Editor</span>
                        </div>
                        <textarea
                            placeholder="## Placeholder"
                            className="editor-input textarea"
                            onChange={(e) => debouncedSetRenderHTML(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="preview">
                        <div className="header-preview">
                            <span className="preview-heading">Preview</span>
                        </div>
                        <div style={{width: '100%'}}>
                            {renderHTML ? (
                                <Preview html={renderHTML} />
                            ) : (
                                <div className="preview-content">
                                    <span>Nothing to preview</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
