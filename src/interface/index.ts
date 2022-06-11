import { ReactNode } from 'react';
export interface UserInfo {
    username: string;
    authname: string;
    staff_id: string;
    avatar?: string;
}

export interface IMenuItem {
    id?: string | number;
    parent_id?: string | number;
    label: React.ReactNode;
    key?: React.Key;
    path?: string;
    children?: IMenuItem[];
    icon: ReactNode;
    onClick?: () => void;
}

export interface IResponseType<T> {
    status: string | number;
    code?: number;
    msg?: string;
    message?: string;
    data: T;
}
