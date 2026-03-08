

function handleError(err,req,res,next) {
    res.status(err.status).json({
        message: err.message,
        stack: err.stack
    })
}
export default handleError;