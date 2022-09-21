export function filmRating(voice) {
     let baseFilmRatingParam = "film__rating rating__"
     let map = new Map();
     map.set(3,baseFilmRatingParam + 'red')
    map.set(5,baseFilmRatingParam + 'orange')
    map.set(7,baseFilmRatingParam + 'yellow')
    map.set(8,baseFilmRatingParam +  'green')
    if (voice <= 3) return map.get(3)
    else if (voice <= 5) return map.get(5)
    else if (voice <= 7) return map.get(7)
    else if (voice > 7) return map.get(8)
}