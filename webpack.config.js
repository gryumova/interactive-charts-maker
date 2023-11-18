module.exports = {
    resolve: {
        fallback: { 
            buffer: require.resolve("buffer/"),
            timers: false,
        }
    }
}