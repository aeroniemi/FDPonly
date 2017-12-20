module.exports = function (icao) {
    var notamFetched
    if (icao.charAt(0) == 'K' || icao.charAt(0) == 'P') {

        require('notams')(icao,   { 
            format:   'FAA' 
        }).then(results  =>  {
            notamFetched = results
            //console.log(notamFetched)
        })
    } else {
        require('notams')(icao,   { 
            format:   'ICAO' 
        }).then(results  =>  {
            notamFetched = results
            //console.log(notamFetched)
        })
    }
    return notamFetched
}
