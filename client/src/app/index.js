import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NavBar } from '../components';
import { VideoList, VideoInsert, VideoUpdate } from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/videos/list" exact component={VideoList} />
                <Route path="/videos/create" exact component={VideoInsert} />
                <Route
                    path="/videos/update/:id"
                    exact
                    component={VideoUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App;
