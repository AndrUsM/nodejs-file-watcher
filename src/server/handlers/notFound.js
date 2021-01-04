const notFound = async (data, callback) => {
    callback(404, null, 'json');
}

module.exports = notFound;