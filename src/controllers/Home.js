class HomeController {
    static render(req, res, next) {
        res.render("home.eta");
        next();
    }
}

export default HomeController;
