import React, { useCallback, useEffect, useMemo } from 'react';
import './index.less';

enum Size {
    sm = 'sm',
    md = 'md',
    lg = 'lg',
}

interface IProps {
    size?: Size;
    tip?: string;
}

export default function Loading(props: IProps) {
    const { size = 'md', tip } = props;

    const { iconSize, textSize } = useMemo(() => {
        // icon 64 32 16
        // text 24 16 12
        if (size === 'md') {
            return { iconSize: 32, textSize: 16 };
        } else if (size === 'sm') {
            return { iconSize: 16, textSize: 12 };
        }
        return { iconSize: 64, textSize: 24 };
    }, [size]);

    useEffect(() => {}, []);

    return (
        <div className="loading-container">
            <div className="loader" style={{ width: iconSize, height: iconSize }}>
                <div className="inner one"></div>
                <div className="inner two"></div>
                <div className="inner three"></div>
            </div>
            {tip && (
                <div className="loading-text" style={{ fontSize: textSize }}>
                    {tip}
                </div>
            )}
        </div>
    );
}
