import React, { useCallback, useEffect, useState } from 'react';

const colorList = [
    '#222222',
    '#505050',
    '#666666',
    '#999999',
    '#cacaca',
    '#d8d8d8',
    '#e8e8e8',
    '#f2f2f2',
    '#f8f8f8',
    '#ffffff',
    '#f04142',
    '#eb28bd',
    '#8f2bff',
    '#1a74ff',
    '#00abab',
    '#00aa54',
    '#70b500',
    '#ffba12',
    '#ff7528',
    '#996d39',
    '#ffd1d1',
    '#ffbaef',
    '#e0c4ff',
    '#c1e1f7',
    '#c7f2f2',
    '#c2edd8',
    '#def7b5',
    '#ffebba',
    '#ffd8c2',
    '#f5d8b6',
    '#ff8585',
    '#ff87e3',
    '#c087ff',
    '#599aff',
    '#5ed1d1',
    '#69cf9c',
    '#acde5b',
    '#ffd05e',
    '#ffa775',
    '#c79254',
    '#ff5e5e',
    '#f54ccd',
    '#ae66ff',
    '#3d89ff',
    '#39c4c4',
    '#3bbf7d',
    '#8ecc29',
    '#ffc740',
    '#ff8e4f',
    '#c0833b',
    '#b83232',
    '#b31e90',
    '#641eb3',
    '#1356bd',
    '#008585',
    '#008542',
    '#508200',
    '#cc950e',
    '#b3521c',
    '#815a2c',
    '#7a2122',
    '#75145e',
    '#4b1785',
    '#0e408c',
    '#005c5c',
    '#005e2f',
    '#314f00',
    '#856109',
    '#662f10',
    '#634119',
];
const ColorPicker: React.FC<Record<string, unknown>> = ({ onChange, slectedKey }: any) => {
    const selectedColorKey:string = slectedKey;
    const [activeColor, setActiveColor] = useState('');
    const [selectedColor, setSelectedColor] = useState(JSON.parse(localStorage.getItem(selectedColorKey) || '[]') as string[]);
    const setInputColor = useCallback((event) => {
        const lowerVal = event.target.value;
        const hexReg = /^#[0-9a-f]{0,8}$/;
        if (hexReg.test(lowerVal)) {
            setActiveColor(event.target.value);
        }
    }, []);
    const pushSelectedColor = useCallback((color: string) => {
        const hexReg = /^#(([0-9a-f]{2}){1,4})$/i;
        if (hexReg.test(color)) {
            const sameColorIdx = selectedColor.indexOf(color);
            if (sameColorIdx > -1) {
                selectedColor.splice(sameColorIdx, 1);
            }
            selectedColor.unshift(color);
            if (selectedColor.length > 10) {
                selectedColor.pop();
            }

            setSelectedColor([...selectedColor]);
            localStorage.setItem(selectedColorKey, JSON.stringify(selectedColor));
            onChange(color);
        }
    }, []);

    useEffect(() => {
        setActiveColor(JSON.parse(localStorage.getItem(selectedColorKey) || '[]')[0] || '');
    }, []);
    return (
        <div className='color-picker'>
            <div className='picker-inner'>
                {selectedColor.length > 0 && (
                    <>
                        <h3 className='picker-title'>近期使用</h3>
                        <ul className='picker-list'>
                            {selectedColor.map((color) => (
                                <li
                                    key={color}
                                    className='picker-item'
                                    onClick={() => {
                                        setActiveColor(color);
                                        pushSelectedColor(color);
                                    }}
                                >
                                    <span
                                        className='picker-span'
                                        style={{
                                            backgroundColor: color,
                                            border:
                        color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#f8f8f8' ? '1px solid #e8e8e8' : 'none',
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                <h3 className='picker-title'>全部颜色</h3>
                <ul className='picker-list'>
                    {colorList.map((color) => (
                        <li
                            key={color}
                            className={`picker-item ${color === activeColor ? 'selected' : ''}`}
                            onClick={() => {
                                setActiveColor(color);
                                pushSelectedColor(color);
                            }}
                        >
                            <span
                                className='picker-span'
                                style={{
                                    backgroundColor: color,
                                    border: color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#f8f8f8' ? '1px solid #e8e8e8' : 'none',
                                }}
                            />
                        </li>
                    ))}
                </ul>
                <p className='picker-line' />
                <div className='picker-footer'>
                    <p className='active-color' style={{ backgroundColor: activeColor }}>
                        <span className='picker-span' />
                    </p>
                    <div className='picker-input'>
                        <input
                            value={activeColor}
                            onChange={setInputColor}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <div
                        className='picker-btn'
                        onMouseDown={(e) => {
                            e.preventDefault();
                            pushSelectedColor(activeColor);
                        }}
                    >
            确定
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
