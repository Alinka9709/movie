export const getMovies = async (
  url,
  query,
  page,
  func1,
  func2,
 
  func4
) => {
  try {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ddb44769a9fa28d200546e7d28aa707c&query=${query}&page=${page}`);
    const result = await data.json();
    func1(false);
    func2(result.results);
 
  } catch (e) {
    func1(false);
    func4(e);
  }
};

export const genre = async (param0) => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=ddb44769a9fa28d200546e7d28aa707c"
    );
    const res = await data.json();

    param0(res.genres);
  } catch (e) {
    console.log(e);
  }
};

export const seachId = async () => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=ddb44769a9fa28d200546e7d28aa707c"
    );
    const result = await data.json();

    localStorage.setItem("token", result.guest_session_id);
  } catch (e) {
    console.log(e);
  }
};

export const rateMovie = async (movieId, value) => {
  const params = localStorage.getItem("token");
  await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=ddb44769a9fa28d200546e7d28aa707c&guest_session_id=${params}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value,
      }),
    }
  );
};
export const ratingFilms = async (param) => {
  try {
    const params = localStorage.getItem("token");
    const data = await fetch(
      `https://api.themoviedb.org/3/guest_session/${params}/rated/movies?api_key=ddb44769a9fa28d200546e7d28aa707c&language=en-US&sort_by=created_at.asc`
    );
    const res = await data.json();

    param(res.results);
  } catch (e) {
    console.log(e);
  }
};
