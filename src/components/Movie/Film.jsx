/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import React from 'react'
import PropTypes from 'prop-types'
import { Rate } from 'antd'
import { GenresConsumer } from '../Context/Context'
import image from './znak.jpeg'
import './Film.css'

function Film({ img, title, date, text, voice, id, ids, rating, rateMovie }) {
    const reduction = (str) => {
        const array = str.split(' ')
        array.splice(15)
        return `${array.join(' ')}...`
    }

    const posterImg = (
        <img className="film__image" src={img ? `https://image.tmdb.org/t/p/original${img}` : image} alt="img" />
      )

    let filmRating

    if (voice <= 3) filmRating = 'film__rating rating__red'
    if (voice <= 5) filmRating = 'film__rating rating__orange'
    if (voice <= 7) filmRating = 'film__rating rating__yellow'
    if (voice > 7) filmRating = 'film__rating rating__green'

    return (
        <GenresConsumer>
            {(genres) => (
                <li className="film">
                  {posterImg}
                    <div className="film__wrapper">
                        <div className="film-title__wrapper">
                            <span className="film-title">{title}</span>
                            <div className={filmRating}>
                                {Math.round(voice)}
                            </div>
                        </div>
                        <span className="film-date">{date}</span>
                        <div className="film-wrapper__genre">
                            {genres.map((genre) => {
                                if (id.includes(genre.id)) {
                                    return (
                                        <span
                                            className="film-genre"
                                            key={genre.id}
                                        >
                                            {genre.name}
                                        </span>
                                    )
                                }
                            })}
                        </div>
                        <p className="film-text"> {reduction(text)}</p>
                        <Rate
                            defaultValue={rating}
                            onChange={(e) => rateMovie(ids, e)}
                            count="10"
                        />
                    </div>
                </li>
            )}
        </GenresConsumer>
    )
}

export default Film

Film.propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    voice: PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    id: PropTypes.array.isRequired,
    rating: PropTypes.number.isRequired,
    rateMovie: PropTypes.func.isRequired,
    ids: PropTypes.number.isRequired,
}
