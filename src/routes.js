import Home from "./controllers/Home.js"

export const init = (app) => {
    app.get("/", Home.render);
}
