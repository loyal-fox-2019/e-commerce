module.exports = (err, req, res, next) => {
    if (err.name === 'Validataion Login') {
        res.status(400).json({ message: err.message })
    } else if (err.name === 'Not Found') {
        res.status(404).json({ message: err.message })
    }
    else {
        console.log(err)
    }
}