let originsWhitelist = [
    'http://localhost:3001',
];
let corsOptions = {
    origin: function (origin, callback) {
        let isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
};

module.exports = corsOptions;
