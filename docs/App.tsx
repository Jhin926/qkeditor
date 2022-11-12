import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from './ColorPicker.tsx';
import QkEditor, {setAutoFocus, setBlockTag} from '../src/index';

const PYEditor: React.FC<Record<string, unknown>> = () => {
    const [bgColor, setBgColor] = useState('#222');
    const [displayBgColorPicker, setDisplayBgColorPicker] = useState(false);
    const [fontColor, setFontColor] = useState('#222');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [fontsizePicker, setFontsizePicker] = useState(false);
    const [fontSize, setFontSize] = useState('14px');

    const [editorInstance, setEditorInstance] = useState(null as unknown as QkEditor);

    const hideBgColor = useCallback(() => {
        setDisplayBgColorPicker(false);
    }, []);
    const hideFontColor = useCallback(() => {
        setDisplayColorPicker(false);
    }, []);

    const changeFontSize = useCallback((val) => {
        editorInstance.setTextStyle('span', { fontSize: val });
        setFontSize(val);
        setFontsizePicker(false);
    }, [editorInstance]);

    useEffect(() => {
        if (displayBgColorPicker) {
            window.addEventListener('click', hideBgColor);
        } else {
            window.removeEventListener('click', hideBgColor);
        }
    }, [displayBgColorPicker]);
    useEffect(() => {
        if (displayColorPicker) {
            window.addEventListener('click', hideFontColor);
        } else {
            window.removeEventListener('click', hideFontColor);
        }
    }, [displayColorPicker]);

    useEffect(() => {
        setAutoFocus(true);
        setBlockTag('p');
        const editor = new QkEditor('y-editor');
        editor.config.onChange = (innerHtml) => {
            console.log('当前编辑器的内容是', innerHtml);
        };
        setEditorInstance(editor);
    }, []);

    return (
        <div className='y-editor'>
            {/* <button onClick={() => {editorInstance.clear();}}>清空</button>
            <button style={{marginLeft: '50px'}} onClick={() => {editorInstance.setEditorContent('<div style="color:rgb(192, 135, 255);">我是默认内容</div>');}}>设置默认内容</button> */}
            <header className='y-ed-bar'>
                <button
                    type="button"
                    onClick={() => { editorInstance.setTextStyle('b'); }}
                >
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="#222" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinejoin="round">
                            <path d="M7.3 5h5.75a3.25 3.25 0 010 6.5H7.3h0V5zM7.3 11.5h6.25a3.75 3.75 0 010 7.5H7.3h0v-7.5z" />
                        </g>
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => { editorInstance.setTextStyle('span', { textDecoration: 'line-through' }); }}
                >
                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 11.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                            fill="#222"
                        />
                        <path
                            d="M16.756 7.305C16.756 6.288 15.78 4 12.122 4 8.463 4 7.244 6.288 7.244 7.814c0 1.525.976 2.796 5.122 3.813C16.512 12.644 17 13.915 17 15.441 17 16.966 15.537 19 12.122 19S7 17.22 7 15.44"
                            stroke="#222"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => { editorInstance.setTextStyle('u'); }}
                >
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd">
                            <rect fill="#222" x="6.8" y="18.2" width="10" height="1.5" rx="0.75" />
                            <path
                                d="M17.3 5v5.5a5.5 5.5 0 01-11 0V5"
                                stroke="#222"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => { editorInstance.setTextStyle('i'); }}
                >
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <g fill="#222" fillRule="evenodd">
                            <rect x="8.7" y="4.3" width="9" height="1.5" rx="0.75" />
                            <rect x="6.7" y="18.2" width="9" height="1.5" rx="0.75" />
                            <path d="M12.43 4.976l1.478.26-2.43 13.788-1.478-.26z" />
                        </g>
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => { setDisplayBgColorPicker(!displayBgColorPicker); }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="none" fillRule="evenodd">
                            <path d="M0 0H24V24H0z" />
                            <path fill={bgColor} d="M5 18L19 18 19 20 5 20z" />
                            <g transform="rotate(45 2.464 16.743)">
                                <rect width="10" height="6" x=".707" y=".293" stroke="#222222" strokeWidth="1.5" rx="1" />
                                <rect width="6" height="4" x="2.707" y="6.293" stroke="#222222" strokeWidth="1.5" rx="1" />
                                <path
                                    fill="#222222"
                                    d="M7.207 10.293v1.742c0 .265-.106.52-.293.707l-1.207 1.207c-.343.344-.9.344-1.243 0-.165-.164-.257-.388-.257-.62v-3.036h3z"
                                />
                            </g>
                        </g>
                    </svg>
                </button>
                {displayBgColorPicker && (
                    <ColorPicker
                        slectedKey="bgColor"
                        onChange={(color: string) => {
                            setDisplayBgColorPicker(!displayBgColorPicker);
                            setBgColor(color);
                            editorInstance.setTextStyle('span', { backgroundColor: color });
                        }}
                    />
                )}
                <button
                    type="button"
                    onClick={() => { setDisplayColorPicker(!displayColorPicker); }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="none" fillRule="evenodd">
                            <path
                                fill="#222222"
                                d="M7.5 11.5c0-.414.336-.75.75-.75h7.5c.414 0 .75.336.75.75s-.336.75-.75.75h-7.5c-.414 0-.75-.336-.75-.75z"
                            />
                            <path
                                stroke="#222222"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M6 16l5.276-10.553C11.413 5.173 11.694 5 12 5s.587.173.724.447L18 16h0"
                            />
                            <path fill={fontColor} d="M5 18L19 18 19 20 5 20z" />
                        </g>
                    </svg>
                </button>
                {displayColorPicker && (
                    <ColorPicker
                        slectedKey="fontColor"
                        onChange={(color: string) => {
                            setDisplayColorPicker(!displayColorPicker);
                            setFontColor(color);
                            editorInstance.setTextStyle('span', { color });
                        }}
                    />
                )}
                <button
                    type="button"
                    onClick={() => {
                        // editorInstance.setTextStyle('a', null, { href: 'http://www.baidu.com' });
                        editorInstance.setLink('www.baidu.com');
                    }}
                >
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="#222" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11.086 13.414a3.5 3.5 0 010-4.95l2.828-2.828a3.5 3.5 0 014.95 4.95l-1.06 1.06" />
                            <path d="M13.914 10.586a3.5 3.5 0 010 4.95l-2.828 2.828a3.5 3.5 0 01-4.95-4.95l1.06-1.06" />
                        </g>
                    </svg>
                </button>
                <div className='drop-button'>
                    <span onMouseDown={(e) => {
                        e.preventDefault();
                        setFontsizePicker(!fontsizePicker);
                    }}>{fontSize}</span>
                    {
                        fontsizePicker
                        && (<ul className='drop-list'>
                            <li onMouseDown={(e) => { e.preventDefault(); changeFontSize('14px'); }}>14px</li>
                            <li onMouseDown={(e) => { e.preventDefault(); changeFontSize('20px'); }}>20px</li>
                            <li onMouseDown={(e) => { e.preventDefault(); changeFontSize('26px'); }}>26px</li>
                            <li onMouseDown={(e) => { e.preventDefault(); changeFontSize('32px'); }}>32px</li>
                        </ul>)
                    }
                </div>
                <button
                    title='炫彩字体'
                    onClick={() => {
                    editorInstance.setTextStyle('span', { background: 'linear-gradient(-45deg, blue, red, blue)', color: '#fff' });
                }}>
                    <span style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        margin: '2px 2px',
                        borderRadius: '4px',
                        background: 'linear-gradient(-45deg, blue, red, blue)'
                    }}></span>
                </button>
                <button
                    title='炫彩字体'
                    onClick={() => {
                    editorInstance.setTextStyle('span', { background: 'linear-gradient(-45deg, red, blue, red)', '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' })
                }}>
                    <span style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        margin: '2px 2px',
                        borderRadius: '4px',
                        background: 'linear-gradient(-45deg, red, blue, red)'
                    }}></span>
                </button>
                <div style={{
                    backgroundColor: '#d6d6d6',
                    display: 'inline-block',
                    height: '16px',
                    margin: '0 10px',
                    width: '1px'
                }}></div>
                <button
                    type="button"
                    onClick={() => {
                        editorInstance.insertElement('img', { src: 'http://www.baidu.com/img/flexible/logo/pc/result@2.png' }, { border: '1px solid #ebebeb' });
                    }}
                >
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(3.7 5)" fill="none" fillRule="evenodd">
                            <rect stroke="#222" strokeWidth="1.5" strokeLinejoin="round" x=".3" width="16" height="14" rx="1" />
                            <circle fill="#222" cx="4.25" cy="4.25" r="1.25" />
                            <path
                                d="M1 12.5l7.921-5.469a3 3 0 013.977.51L16 11.14h0"
                                stroke="#222"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        editorInstance.insertElement('hr', {}, { margin: '10px 0' });
                    }}
                >
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(4.7 4)" fill="#222" fillRule="evenodd">
                            <rect y="0.5" width="15" height="1.5" rx="0.75" />
                            <rect y="7.3" width="3.5" height="1.5" rx="0.75" />
                            <rect x="6" y="7.3" width="3.5" height="1.5" rx="0.75" />
                            <rect x="11.5" y="7.3" width="3.5" height="1.5" rx="0.75" />
                            <rect y="14" width="15" height="1.5" rx="0.75" />
                        </g>
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        const insertTable = document.createElement('table');
                        for (let i = 0; i < 2; i++) {
                            const insertTr = document.createElement('tr');
                            for (let i = 0; i < 3; i++) {
                                const insertTd = document.createElement('td');
                                insertTd.style.cssText = 'padding: 12px;border-right: 1px solid #ebeef5;border-bottom: 1px solid #ebeef5;height:24px;';
                                insertTr.appendChild(insertTd);
                            }
                            insertTable.appendChild(insertTr);
                        }
                        editorInstance.insertElement(insertTable, { cellspacing: 0, cellpadding: '5px' }, {
                            margin: '10px 0', width: '100%', borderLeft: '1px solid #ebeef5', borderTop: '1px solid #ebeef5',
                        });
                    }}
                >
                    <svg width="25" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M4.002 6a1 1 0 011-1h14a1 1 0 011 1v12a1 1 0 01-1 1h-14a1 1 0 01-1-1V6z" stroke="#222" strokeWidth="1.5" strokeLinejoin="round"></path>
                        <path d="M12.002 4.941v14M4.002 12h16" stroke="#222" strokeWidth="1.5" strokeLinejoin="round"></path>
                    </svg>
                </button>
                <div style={{
                    backgroundColor: '#d6d6d6',
                    display: 'inline-block',
                    height: '16px',
                    margin: '0 10px',
                    width: '1px'
                }}></div>
                <button
                    type="button"
                    onClick={() => { editorInstance.setParagraphStyle('text-align', 'left'); }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <g fill="none" fillRule="evenodd">
                            <path d="M0 0h24v24H0z" />
                            <path
                                d="M5.75 5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm0 8h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm0-4h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5zm0 8h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5z"
                                fill="#222"
                            />
                        </g>
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => { editorInstance.setParagraphStyle('text-align', 'center'); }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <g fill="none" fillRule="evenodd">
                            <path d="M0 0h24v24H0z" />
                            <path
                                d="M8.75 5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm0 8h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm-3-4h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5zm0 8h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5z"
                                fill="#222"
                            />
                        </g>
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => { editorInstance.setParagraphStyle('text-align', 'right'); }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <g fill="none" fillRule="evenodd">
                            <path d="M0 0h24v24H0z" />
                            <path
                                d="M10.75 5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm0 8h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm-5-4h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5zm0 8h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5z"
                                fill="#222"
                            />
                        </g>
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => { editorInstance.setParagraphStyle('text-indent', '2em'); }}
                >
                    <svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#sylLineIndent)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.98642 5.25C3.98642 4.83579 4.32221 4.5 4.73642 4.5H19.2364C19.6506 4.5 19.9864 4.83579 19.9864 5.25C19.9864 5.66421 19.6506 6 19.2364 6H4.73642C4.32221 6 3.98642 5.66421 3.98642 5.25Z" fill="#222222" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.98642 14.25C3.98642 13.8358 4.32221 13.5 4.73642 13.5H12.2364C12.6506 13.5 12.9864 13.8358 12.9864 14.25C12.9864 14.6642 12.6506 15 12.2364 15H4.73642C4.32221 15 3.98642 14.6642 3.98642 14.25Z" fill="#222222" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.98642 9.75C3.98642 9.33579 4.32221 9 4.73642 9H12.2364C12.6506 9 12.9864 9.33579 12.9864 9.75C12.9864 10.1642 12.6506 10.5 12.2364 10.5H4.73642C4.32221 10.5 3.98642 10.1642 3.98642 9.75Z" fill="#222222" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.98642 18.75C3.98642 18.3358 4.32221 18 4.73642 18H19.2364C19.6506 18 19.9864 18.3358 19.9864 18.75C19.9864 19.1642 19.6506 19.5 19.2364 19.5H4.73642C4.32221 19.5 3.98642 19.1642 3.98642 18.75Z" fill="#222222" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.9864 14.2757C16.9864 14.543 17.3096 14.6768 17.4986 14.4879L19.7743 12.2121C19.8914 12.095 19.8914 11.905 19.7743 11.7879L17.4986 9.51211C17.3096 9.32312 16.9864 9.45697 16.9864 9.72425V11H14.4864C14.2103 11 13.9864 11.2239 13.9864 11.5V12.5C13.9864 12.7761 14.2103 13 14.4864 13H16.9864V14.2757Z" fill="#222222" />
                        </g>
                        <defs><clipPath id="sylLineIndent"><rect width="24" height="24" fill="white" transform="translate(0.98642)" /></clipPath></defs>
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        editorInstance.setParagraphStyle('text-indent', '0');
                    }}
                >
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#sylLineIndent1)">
                            <path id="svg_3" fill="#222222" d="m3.98642,5.25c0,-0.41421 0.33579,-0.75 0.75,-0.75l14.49998,0c0.4142,0 0.75,0.33579 0.75,0.75c0,0.41421 -0.3358,0.75 -0.75,0.75l-14.49998,0c-0.41421,0 -0.75,-0.33579 -0.75,-0.75z" clipRule="evenodd" fillRule="evenodd" />
                            <path id="svg_4" fill="#222222" d="m10.653061,14.25c0,-0.4142 0.33579,-0.75 0.75,-0.75l7.49998,0c0.4142,0 0.75,0.3358 0.75,0.75c0,0.4142 -0.3358,0.75 -0.75,0.75l-7.49998,0c-0.41421,0 -0.75,-0.3358 -0.75,-0.75z" clipRule="evenodd" fillRule="evenodd" />
                            <path id="svg_5" fill="#222222" d="m10.653061,9.75c0,-0.41421 0.33579,-0.75 0.75,-0.75l7.49998,0c0.4142,0 0.75,0.33579 0.75,0.75c0,0.4142 -0.3358,0.75 -0.75,0.75l-7.49998,0c-0.41421,0 -0.75,-0.3358 -0.75,-0.75z" clipRule="evenodd" fillRule="evenodd" />
                            <path id="svg_6" fill="#222222" d="m3.98642,18.75c0,-0.4142 0.33579,-0.75 0.75,-0.75l14.49998,0c0.4142,0 0.75,0.3358 0.75,0.75c0,0.4142 -0.3358,0.75 -0.75,0.75l-14.49998,0c-0.41421,0 -0.75,-0.3358 -0.75,-0.75z" clipRule="evenodd" fillRule="evenodd" />
                            <path transform="rotate(180 6.590969085693359,11.999979019165039) " id="svg_7" fill="#222222" d="m6.653107,14.2757c0,0.2673 0.3232,0.4011 0.5122,0.2122l2.2757,-2.2758c0.1171,-0.1171 0.1171,-0.3071 0,-0.4242l-2.2757,-2.27579c-0.189,-0.18899 -0.5122,-0.05514 -0.5122,0.21214l0,1.27575l-2.5,0c-0.2761,0 -0.5,0.2239 -0.5,0.5l0,1c0,0.2761 0.2239,0.5 0.5,0.5l2.5,0l0,1.2757z" clipRule="evenodd" fillRule="evenodd" />
                        </g>
                        <defs><clipPath id="sylLineIndent1"><rect width="24" height="24" fill="white" transform="translate(0.98642)" /></clipPath></defs>
                    </svg>
                </button>
            </header>
            <div
                className='y-ed-content'
                id="y-editor"
            >
            </div>
        </div>
    );
};

ReactDOM.render(
    <PYEditor />,
    document.getElementById('root'),
);

