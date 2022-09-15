import React, { useEffect, useState } from 'react'
import { Pagination, Input, Tabs } from 'antd'

import { debounce } from 'lodash'
import MovieList from '../MovieList/MovieList'
import { GenresProvider } from '../Context/Context'
import './App.css'

const BASE_URL =
    'https://api.themoviedb.org/3/search/movie?api_key=ddb44769a9fa28d200546e7d28aa707c'

function App() {
    const [err, setError] = useState(false)
    const [isLoaded, setIsLoaded] = useState(true)
    const [results, setItems] = useState([])
    const [query, setQuery] = useState('return')
    const [page, setPage] = useState(1)
    const [pageQty, setPageQty] = useState(0)
    const [genres, setGenres] = useState([])
    const [rate, setRate] = useState([])
    
    const getMovies = () => {
        fetch(`${BASE_URL}&query=${query}&page=${page}`)
            .then((res) => res.json())
            .then(
                (result) => {
                
                    setIsLoaded(false)
                    setItems(result.results)
                    setPageQty(result.total_pages)
                },

                (error) => {
                    setIsLoaded(false)
                    setError(error)
                }
            )
    }

    const genre = () => {
        fetch(
            'https://api.themoviedb.org/3/genre/movie/list?api_key=ddb44769a9fa28d200546e7d28aa707c'
        )
            .then((res) => res.json())
            .then((res) => {
                setGenres(res.genres)
            })
    }
    const seachId = () => {
        fetch(
            'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=ddb44769a9fa28d200546e7d28aa707c'
        )
            .then((res) => res.json())
            .then((result) => {
              
                localStorage.setItem('token', result.guest_session_id)
            })
    }
   

    
   const rateMovie = (movieId, value) =>{
    const params = localStorage.getItem('token')
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=ddb44769a9fa28d200546e7d28aa707c&guest_session_id=${params}`, {
        method: 'POST',
        headers: {
           
            'Content-Type': 'application/json',
          }, 
        body:  JSON.stringify({
            value
          }),
        })
        
  }
  const ratingFilms = () => {
    const params = localStorage.getItem('token')
    fetch(`https://api.themoviedb.org/3/guest_session/${params}/rated/movies?api_key=ddb44769a9fa28d200546e7d28aa707c&language=en-US&sort_by=created_at.asc`)
    .then((res) => res.json())
        .then((res) => {
            setRate(res.results)
        });
  }
  useEffect(() => {
    seachId()
    genre()
    getMovies()
  
}, [page,query])

    const onChange = (e) => {
        setQuery(e.target.value === '' ? 'return' : e.target.value)
    }
   
    const timeOut = debounce(onChange, 1000)

    return (
        <GenresProvider value={genres}>
            <section className="moviesapp">
                <section className="filmswrapper">
                    <Tabs defaultActiveKey="1" onChange={e => {
                        if(e === '2') ratingFilms()
                    }}>
                        <Tabs.TabPane tab="Search" key="1">
                        <Input
                        className='film__input'
                        placeholder="Type to search..."
                        label="query"
                        onChange={timeOut}
                    />
                    <MovieList
                        err={err}
                        isLoaded={isLoaded}
                        results={results}
                        rateMovie ={ rateMovie }
                    />

                    {!!pageQty && (
                        <Pagination
                            count={pageQty}
                            onChange={(num) => setPage(num)}
                            size="small"
                            total={50}
                        />
                    )}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Rated" key="2" >
                        <MovieList
                        err={err}
                        isLoaded={isLoaded}
                        results={rate}
                        rateMovie ={ rateMovie }
                    />

                    {!!pageQty && (
                        <Pagination
                            count={pageQty}
                            onChange={(num) => setPage(num)}
                            size="small"
                            total={50}
                        />
                    )}
                        </Tabs.TabPane>
                    </Tabs>
                    
                </section>
            </section>
        </GenresProvider>
    )
}

export default App
