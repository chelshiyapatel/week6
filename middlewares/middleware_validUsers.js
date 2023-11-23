export const isvalid = (req, res, next) => {
    if (req. session.isValidated) {
        next();
    } 
    else {
        req.session.console.error= "you have to login first";
        res.redirect("/login")
    }
}