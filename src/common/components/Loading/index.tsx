import React from 'react';
import './index.less';

export default function Loading() {
    return (
        <div className="loading-container">
            <div className="preloader">
                <div className="refresh-preloader">
                    <div className="preloader">
                        <i>.</i>
                        <i>.</i>
                        <i>.</i>
                    </div>
                </div>
            </div>
        </div>
    );
}
