import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Users from "../components/Users";
import UsersEdit from "../components/UsersEdit";
import UsersCommentsEdit from "../components/UsersCommentsEdit";
import ErrorPage from "../components/ErrorPage/ErrorPage";

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={(props: any) => <Users {...props} />}
                    />

                    <Route
                        exact
                        path="/edit/:id"
                        component={(props: any) => <UsersEdit {...props} />}
                    />

                    {/* <Route
                        exact
                        path="/comments/edit/:id"
                        component={(props: any) => (
                            <UsersCommentsEdit {...props} />
                        )}
                    /> */}

                    <Route>
                        <ErrorPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}
