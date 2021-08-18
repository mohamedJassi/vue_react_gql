import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameDetails from "./pages/GameDetails";
import GameForm from "./pages/GameForm";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NavBar from "./components/layouts/NavBar";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import TheGames from "./pages/TheGames";
import TheCategories from "./pages/TheCategories";

import "./css/app.css";
import { AuthProvider } from "./context";
import MyGames from "./pages/MyGames";
import TheAccount from "./pages/TheAccount";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavBar />

          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/games/view/:id">
              <GameDetails />
            </Route>
            <Route exact path="/games/add">
              <GameForm />
            </Route>
            <Route exact path="/games/edit/:id">
              <GameForm />
            </Route>
            <Route exact path="/games/category/:type">
              <TheCategories />
            </Route>
            <Route exact path="/games">
              <TheGames />
            </Route>
            <Route exact path="/account/my-games">
              <MyGames />
            </Route>
            <Route exact path="/account">
              <TheAccount />
            </Route>
            <Route exact path="/:notFound(.*)">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
