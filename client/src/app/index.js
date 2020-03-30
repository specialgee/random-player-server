import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NavBar } from '../components';
import { VideosList, VideosInsert, VideosUpdate } from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/videos/list" exact component={VideosList} />
                <Route path="/videos/create" exact component={VideosInsert} />
                <Route
                    path="/videos/update/:id"
                    exact
                    component={VideosUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App;