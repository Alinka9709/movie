 export function filmRating(voice) {
    // switch (voice) {
    //     case voice  3:
    //       return " circle__red"
    //     case voice <= 5:
    //       return " movie-item__circle circle__orange"
    //     case vote <= 7:
    //       return " movie-item__circle circle__yellow"
    //     case vote > 7:
    //       return " movie-item__circle circle__green"
    //   }
    
    if (voice <= 3) return'film__rating rating__red'
    if (voice <= 5) return'film__rating rating__orange'
    if (voice <= 7) return 'film__rating rating__yellow'
    if (voice > 7) return 'film__rating rating__green'
}