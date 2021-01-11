const notFound = async (data, callback) => {
    callback(404, null, 'json');
}

export default notFound;