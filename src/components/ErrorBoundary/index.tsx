import React, { ErrorInfo } from 'react';
import Empty from 'common/components/Empty';
import Image404 from 'src/assets/404.svg';
export interface ErrorBoundaryProps {
    /**
     * 存在时强制刷新ui
     */
    pageError?: string;

    children?: React.ReactNode;
    /**
     * 自定义错误信息展示
     */
    renderExternalEmpty?(pageError: string): JSX.Element;
    style?: React.CSSProperties;
    /**
     * 错误回调
     */
    onError?: (error: Error | string, errorInfo?: ErrorInfo) => void;
}

const initState = (props: ErrorBoundaryProps) => ({
    pageError: props.pageError,
    prevProps: props,
});

type State = ReturnType<typeof initState>;

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
    state = initState(this.props);
    static getDerivedStateFromProps(nextProps: ErrorBoundaryProps, prevState: State) {
        // 如果error信息相同 则不处理 防止重复修改state的pageError
        const { prevProps } = prevState;
        const state = { ...prevState, prevProps: nextProps };
        if (nextProps.pageError !== prevProps.pageError) {
            state.pageError = nextProps.pageError;
        }
        return state;
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState(
            {
                pageError: `${error.message ? error.message : '未知错误'}`,
            },
            () => {
                this.handleErrorAlert(error);
                this.props.onError && this.props.onError(error, errorInfo);
            },
        );
    }
    handleErrorAlert(error: Error | string) {
        // 错误监测 错误上报
        const err = {
            message: typeof error === 'string' ? error : error.message,
            stack: typeof error !== 'string' && error.stack,
        };
        console.log('错误监测err : ', err);
    }

    renderEmptyInfo() {
        const { pageError = '' } = this.state;
        if (this.props.renderExternalEmpty) {
            return this.props.renderExternalEmpty(pageError);
        }
        return (
            <Empty
                icon={Image404}
                title={'页面运行错误'}
                description={`页面运行时发生了错误：${this.state.pageError}，请重试`}
                extraBtnText={'重试'}
                onExtraClick={() => window.location.reload()}
                fullHeight
            />
        );
    }

    render() {
        const { children, style } = this.props;
        return this.state.pageError ? (
            <div className="error-container" style={style}>
                {this.renderEmptyInfo()}
            </div>
        ) : (
            children
        );
    }
}
