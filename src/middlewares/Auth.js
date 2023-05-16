const { customErrorResponse } = require("../utils/CustomResponse");

const isAuthenticated = (req, res, next) => {
    if (req.session.user) next();
    else customErrorResponse(res, 403, "Authentication required");
};



module.exports = {
    isAuthenticated
}