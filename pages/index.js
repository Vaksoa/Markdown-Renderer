import React from 'react'
import Head from 'next/head'

import {parse} from '../lib/parser'
import {renderMarkdown} from '../lib/renderer'

const Home = (props) => {
    const [input, setInput] = React.useState("")
    const [renderHTML, setRenderHTML] = React.useState("")

    React.useEffect(() => {
        setRenderHTML(renderMarkdown(parse(input)))
    }, [input])

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
                            onChange={(e) => setInput(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="preview">
                        <div className="header-preview">
                            <span className="preview-heading">Preview</span>
                        </div>
                        <div style={{width: '100%'}}>
                            {renderHTML ? (
                                <div className="preview-content"
                                    dangerouslySetInnerHTML={{__html: renderHTML}}
                                ></div>
                            ) : (
                                <div>
                                    <span>Nothing to preview</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                  .wrapper {
                    width: 100%;
                    display: flex;
                    overflow: auto;
                    min-height: 100vh;
                    align-items: center;
                    flex-direction: column;
                    background-color: rgb(13, 6, 15);
                  }

                  .stars {
                    top: 0px;
                    left: 0px;
                    right: 0px;
                    width: 100%;
                    height: 100%;
                    margin: auto;
                    display: flex;
                    opacity: 0.3;
                    position: absolute;
                    align-items: center;
                    flex-direction: column;
                    background-size: auto;
                    background-image: url('https://www.nicepng.com/png/full/192-1925972_starfield-snow.png');
                    background-repeat: repeat;
                    background-position: center;
                  }

                  .title {
                    width: 100%;
                    display: flex;
                    padding: var(--dl-space-space-oneandhalfunits);
                    z-index: 100;
                    align-items: center;
                    border-color: rgba(255, 0, 0, 0);
                    border-image: linear-gradient(90deg,
                    rgba(34, 34, 34, 0.08) 0%,
                    rgba(255, 255, 255, 0.08) 50%,
                    rgba(34, 34, 34, 0.08) 100%);
                    flex-direction: row;
                    backdrop-filter: blur(8px);
                    justify-content: space-between;
                    background-color: rgba(17, 16, 19, 0);
                    border-image-slice: 1;
                    border-bottom-width: 1px;
                  }

                  .heading {
                    color: rgba(255, 255, 255, 0);
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 700;
                    background-clip: text;
                    background-image: linear-gradient(0deg,
                    rgb(152, 144, 162) 0%,
                    rgb(255, 255, 255) 100%);
                  }

                  .github {
                    color: rgb(255, 255, 255);
                    cursor: pointer;
                    background: linear-gradient(180deg,
                    hsl(252, 100%, 69%) 0%,
                    var(--token-274fb780-9951-4059-956e-43216c6f8956,
                    rgb(120, 85, 255)) 100%);
                    box-shadow: rgba(255, 255, 255, 0.25) 0px 1px 1px 0px inset,
                    rgba(0, 0, 0, 0.25) 0px 4px 8px 0px;
                    font-style: normal;
                    transition: 0.3s;
                    font-weight: 700;
                    border-width: 0px;
                    border-radius: 10px;
                    text-decoration: none;
                  }

                  .github:hover {
                    opacity: 0.5;
                  }

                  .content {
                    gap: var(--dl-space-space-twounits);
                    flex: 1;
                    width: 100%;
                    display: flex;
                    padding: var(--dl-space-space-oneandhalfunits);
                    z-index: 100;
                    position: relative;
                    align-items: stretch;
                    padding-top: var(--dl-space-space-twounits);
                    padding-left: var(--dl-space-space-twounits);
                    padding-right: var(--dl-space-space-twounits);
                    flex-direction: row;
                    padding-bottom: var(--dl-space-space-twounits);
                    justify-content: center;
                  }

                  .background {
                    top: 0px;
                    flex: 1;
                    left: 0px;
                    right: 0px;
                    bottom: 0px;
                    margin: auto;
                    display: flex;
                    position: absolute;
                    align-items: stretch;
                    flex-direction: row;
                    justify-content: center;
                    background-image: radial-gradient(50% 50%,
                    rgb(57, 38, 90) 0%,
                    rgba(13, 6, 15, 0) 100%);
                  }

                  .editor {
                    flex: 1;
                    display: flex;
                    z-index: 100;
                    box-shadow: rgba(0, 0, 0, 0.21) 0px 7px 32px 0px;
                    align-items: center;
                    border-color: rgba(255, 255, 255, 0.06);
                    border-radius: 24px;
                    flex-direction: column;
                    background-color: rgb(40, 35, 56);
                    border-top-width: 2px;
                    border-left-width: 1px;
                    border-right-width: 1px;
                    border-bottom-width: 0.5px;
                  }

                  .header {
                    width: 100%;
                    display: flex;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 8px 0px;
                    align-items: center;
                    padding-top: var(--dl-space-space-halfunit);
                    padding-left: var(--dl-space-space-oneandhalfunits);
                    padding-right: var(--dl-space-space-oneandhalfunits);
                    flex-direction: column;
                    padding-bottom: var(--dl-space-space-halfunit);
                    background-color: rgba(255, 255, 255, 0.08);
                    border-top-left-radius: 24px;
                    border-top-right-radius: 24px;
                  }

                  .editor-heading {
                    color: rgba(255, 255, 255, 0.16);
                  }

                  .editor-input {
                    flex: 1;
                    color: rgb(144, 144, 144);
                    width: 100%;
                    resize: none;
                    outline: none;
                    padding: var(--dl-space-space-unit);
                    overflow-y: scroll;
                    border-width: 0px;
                    border-radius: 24px;
                    letter-spacing: -0.3px;
                    background-color: transparent;
                  }

                  .preview {
                    flex: 1;
                    display: flex;
                    z-index: 100;
                    box-shadow: rgba(0, 0, 0, 0.21) 0px 7px 32px 0px;
                    align-items: center;
                    border-color: rgba(255, 255, 255, 0.06);
                    border-radius: 24px;
                    flex-direction: column;
                    background-color: #fff;
                    border-top-width: 2px;
                    border-left-width: 1px;
                    border-right-width: 1px;
                    border-bottom-width: 0.5px;
                  }

                  .header-preview {
                    width: 100%;
                    display: flex;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 8px 0px;
                    align-items: center;
                    padding-top: var(--dl-space-space-halfunit);
                    padding-left: var(--dl-space-space-oneandhalfunits);
                    padding-right: var(--dl-space-space-oneandhalfunits);
                    flex-direction: column;
                    padding-bottom: var(--dl-space-space-halfunit);
                    background-color: rgba(255, 255, 255, 0.08);
                    border-top-left-radius: 24px;
                    border-top-right-radius: 24px;
                  }

                  .preview-heading {
                    color: rgba(0, 0, 0, 0.16);
                  }

                  .preview-content {
                    flex: 1;
                    width: 100%;
                    display: flex;
                    padding: var(--dl-space-space-unit);
                    align-items: flex-start;
                    flex-direction: column;
                  }
                `}
            </style>
        </>
    )
}

export default Home
