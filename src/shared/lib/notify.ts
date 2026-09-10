import { notification } from 'antd';

type Notify = {
    message: string,
    description?: string,
    type?: 'success' | 'error' | 'info' | 'warning',
}

export const notify = ({ message, description, type = 'success' }: Notify) => {
    return notification[type]({
        message,
        description,
        showProgress: true,
        pauseOnHover: false,
        placement: 'topRight',
    });
};