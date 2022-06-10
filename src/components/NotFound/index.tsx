import React from 'react';
import Empty from 'common/components/Empty';
import LoadingFailed from 'src/assets/loading_failed.svg';

export default function NotFound() {
    return (
        <Empty
            icon={LoadingFailed}
            title={'页面不存在'}
            description={`查询页面不存在，请跳转首页`}
            extraBtnText={'跳转首页'}
            onExtraClick={() => (window.location.href = '/')}
            fullHeight
        />
    );
}
