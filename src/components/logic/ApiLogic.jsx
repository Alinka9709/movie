
export const getMovies = async (url, query, page, func1, func2, func3, func4) => {
    const data = await fetch(`${url}&query=${query}&page=${page}`);
    const result = await data.json();
    try{
      func1(false);
      func2(result.results);
      func3(result.total_pages);
    } catch (e) {
      func1(false)
      func4(e)
      
    }
   
  };

  export const genre = async (param0)  => {
    const data = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=ddb44769a9fa28d200546e7d28aa707c');
    const res = await data.json();
    try{
        param0(res.genres)
      }catch (e){
       console.log(e);
       
      }
       
}

export const seachId = async () => {

  try{
    const data = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=ddb44769a9fa28d200546e7d28aa707c')
    const result = await data.json();
    
        localStorage.setItem('token', result.guest_session_id)
      }catch (e){
        console.log(e);
      }
      
}
// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });
// async function getUser(movieId, value) {
//   try {
//     const response = await axios.post(`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=ddb44769a9fa28d200546e7d28aa707c&guest_session_id=${params}`);
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
export const rateMovie = async (movieId, value) =>{
    const params = localStorage.getItem('token')
   await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=ddb44769a9fa28d200546e7d28aa707c&guest_session_id=${params}`, {
        method: 'POST',
        headers: {
           
            'Content-Type': 'application/json',
          }, 
        body:  JSON.stringify({
            value
          }),
        })
        
  }
  export const ratingFilms = async ( param ) => {
    const params = localStorage.getItem('token')
    const data = await  fetch(`https://api.themoviedb.org/3/guest_session/${params}/rated/movies?api_key=ddb44769a9fa28d200546e7d28aa707c&language=en-US&sort_by=created_at.asc`)
    const res = await data.json();
    try{
        param(res.results)
      }catch (e){
        console.log(e);
      }
  
       
  }
