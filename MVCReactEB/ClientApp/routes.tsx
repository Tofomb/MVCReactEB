import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Quiz } from './components/Quiz';
import { HighScore } from './components/HighScore';
import { AddQuestion } from './components/AddQuestion';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/quiz' component={Quiz} />
    <Route path='/highscore' component={HighScore} />
    <Route path='/AddQuestion' component={AddQuestion} />

</Layout>;
