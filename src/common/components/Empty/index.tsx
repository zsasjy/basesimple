import React, { ReactNode, CSSProperties, useCallback } from 'react';
import EmptyList from 'src/assets/empty_list.svg';
import { Button } from 'antd';
import { Right } from '@icon-park/react';
import './index.less';

export interface EmptyProps {
    icon?: string; // 图片地址
    isIcon?: boolean; // 是否展示icon
    title?: ReactNode;
    description?: ReactNode; // 图片描述
    // 额外信息
    extraNode?: ReactNode;
    /**
     * 按钮文案，传入自定义节点时优先展示
     * 若无，展示默认按钮，文案为extraBtnText
     * 均无，不展示
     */
    extraBtnText?: string;
    /**
     * 按钮点击事件
     */
    onExtraClick?: () => void;
    solutionText?: string;
    solutionLink?: string;
    className?: string;
    style?: CSSProperties;
    iconStyle?: CSSProperties;
    titleStyle?: CSSProperties;
    descriptionStyle?: CSSProperties;
    extraStyle?: CSSProperties;
    solutionTextStyle?: CSSProperties;
    fullHeight?: boolean; // 是否为整屏错误信息，true时默认离顶部44px
}

export default function Empty(props: EmptyProps) {
    const {
        title,
        titleStyle,
        description,
        descriptionStyle,
        icon = EmptyList,
        isIcon = true,
        iconStyle = {},
        solutionLink,
        fullHeight,
        style,
        extraStyle,
        extraNode,
        extraBtnText,
        onExtraClick,
        solutionText,
        solutionTextStyle,
    } = props;
    const handleLink = useCallback(() => {
        const { solutionLink } = props;
        if (solutionLink) {
            window.location.href = solutionLink;
        }
    }, [solutionLink]);
    return (
        <div
            className="empty-container"
            style={{
                ...(fullHeight ? { paddingTop: '44px', paddingBottom: '18vh' } : null),
                ...style,
            }}
        >
            {isIcon && <img className="empty-icon" style={iconStyle} src={icon} alt="" />}
            <h6 className="empty-title" style={titleStyle}>
                {title}
            </h6>
            <div className="empty-description" style={descriptionStyle}>
                {description}
            </div>
            {(extraNode || extraBtnText) && (
                <div className="empty-extra" style={extraStyle}>
                    {extraNode ? (
                        extraNode
                    ) : (
                        <Button
                            size={'large'}
                            style={{
                                border: '.5px solid #D0D2D8',
                                width: '231px',
                                fontWeight: '500',
                                fontSize: '15px',
                                lineHeight: '21px',
                            }}
                            type="primary"
                            onClick={onExtraClick}
                        >
                            {extraBtnText}
                        </Button>
                    )}
                </div>
            )}
            {solutionText && (
                <div className="empty-solution" onClick={handleLink} style={solutionTextStyle}>
                    {solutionText}
                    <Right theme="outline" size="24" fill="#333" />
                </div>
            )}
        </div>
    );
}
