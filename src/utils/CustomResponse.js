const customErrorResponse = (res, code, msg, e = null) => {
    res.status(code).send({
        status: 'error',
        error: msg,
        e: e?.toString()
    });
}

module.exports = {
    customErrorResponse
}