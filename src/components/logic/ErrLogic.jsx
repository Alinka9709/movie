import React from 'react';
import { Alert } from 'antd'

function ErrLogic  ({err})  {
    if (!navigator.onLine) {
        return (
            <Alert
                message="Нет подключения к Интернету!
                Проверьте сетевые кабели, модем и маршрутизатор.
                Подключитесь к сети Wi-Fi ещё раз."
                type="warning"
                className="alert"
            />
        )
    }
    if (err) {
        <Alert
            className="alert"
            type="error"
            message="Что-то пошло не так,но мы уже работаем над этим"
            banner
        />
    }
    return (
        <div>
            
        </div>
    );
};

export default ErrLogic;