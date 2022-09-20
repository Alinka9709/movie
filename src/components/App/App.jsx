import React, { useEffect, useState } from 'react'
import { Pagination, Input, Tabs } from 'antd'

import { debounce } from 'lodash'
import MovieList from '../MovieList/MovieList'
import { GenresProvider } from '../Context/Context'
import {  getMovies, genre, seachId, ratingFilms } from '../logic/ApiLogic'
import './App.css'

const BASE_URL =
    'https://api.themoviedb.org/3/search/movie?api_key=ddb44769a9fa28d200546e7d28aa707c'

function App() {
    const [err, setError] = useState(false)
    const [isLoaded, setIsLoaded] = useState(true)
    const [results, setItems] = useState([])
    // const [query, setQuery] = useState('return')
    const [page, setPage] = useState(1)
    const [pageQty, setPageQty] = useState(0)
    const [genres, setGenres] = useState([])
    const [rate, setRate] = useState([])
    const [input,setInput] = useState('')


    // const getMovies = (query='return') => {
    //     fetch(`${BASE_URL}&query=${query}&page=${page}`)
    //     .then((res) => {
    //         if (res.ok) {
    //           res.json().then((result) => {
    //             setIsLoaded(false)
    //             setItems(result.results)
    //             setPageQty(result.total_pages)
    //           });
    //         } else {
    //             setIsLoaded(false)
    //             setError(true)
    //         }
    //       });
    // }
   
  useEffect(() => {
    seachId()
    genre(setGenres)
    // getMovies()
    getMovies( BASE_URL,'return', page, setIsLoaded, setItems, setPageQty, setError )

}, [page])

    const onChange = (e) => {
        if (e !== "") {
            getMovies(e)
           
        }
    
       
    }
   
    const timeOut = debounce(onChange, 1000)

    return (
        <GenresProvider value={genres}>
            <section className="moviesapp">
                <section className="filmswrapper">
                    <Tabs defaultActiveKey="1" onChange={e => {
                        if(e === '2') ratingFilms( setRate)
                    }}>
                        <Tabs.TabPane tab="Search" key="1">
                        <Input
                        value = {input}
                        className='film__input'
                        placeholder="Type to search..."
                        label="query"
                        
                        onChange={(e) => {
                            
                            setInput(e.target.value);
                            timeOut(e.target.value);
                          }}
                    />
                    <MovieList
                        err={err}
                        isLoaded={isLoaded}
                        results={results}
                   
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
                        results={rate}
                        
                    />

                 
                        </Tabs.TabPane>
                    </Tabs>
                    
                </section>
            </section>
        </GenresProvider>
    )
}

export default App
