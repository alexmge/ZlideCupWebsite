const getNewsData = () => 
    [
        {
            heading: 'Zlide cup postponed',
            body: "Due to the non availability of most of the racers this Saturday, ths week's cup is postponed to Sunday. See you there !"
        },
        {
            heading: 'About this week\'s edition',
            body: "This week's edition is a bit sepcial! Someone asked if he could make all the maps for this week, and we accepted.\
            Hence, all of this week's maps are from the same mapper! See you on Saturday 9PM as usual!"
        }
    ]


const newsMiddleware = (req, res, next) => {
    if (!res.locals.partials) res.locals.partials = {}
    res.locals.partials.newsContext = getNewsData()
    next()
}

module.exports = { newsMiddleware: newsMiddleware }