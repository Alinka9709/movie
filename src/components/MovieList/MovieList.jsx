import { Spin, Alert } from 'antd'

import React from 'react'
import PropTypes from 'prop-types'
import './MovieList.css'

import Film from '../Movie/Film'

function MovieList({ err, isLoaded, results, rateMovie }) {
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
        ;<Alert
            className="alert"
            type="error"
            message="Что-то пошло не так,но мы уже работаем над этим"
            banner
        />
    } else if (isLoaded) {
        return (
            <div className="example">
                <Spin />
            </div>
        )
    } else {
        const elements = results.map((item) => (
            <Film
                key={item.id}
                id={item.genre_ids}
                ids={item.id}
                img={item.poster_path}
                title={item.title}
                voice={item.vote_average}
                date={item.release_date}
                text={item.overview}
                rateMovie={rateMovie}
                rating={item.rating ? item.rating : 0}
            />
        ))
        return <ul className="movie-list"> {elements} </ul>
    }
}

export default MovieList

MovieList.propTypes = {
    err: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    results: PropTypes.array.isRequired,
    rateMovie: PropTypes.func.isRequired,
}
