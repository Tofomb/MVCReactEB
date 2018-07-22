import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface CounterState {
    JsonStringer: Array<string>;

}

export class HighScore extends React.Component<RouteComponentProps<{}>, CounterState> {
    constructor() {
        super();

        fetch('api/Quizs/GetItAll')
            .then(response => response.json())
            .then(data => {
                this.setState({ JsonStringer: data });
            });

        this.state = { JsonStringer: [] };
    }

    public render() {

        var x = 0;
        if (this.state.JsonStringer.length != 0) {

            return <div id="HighScoreFrame">
                <h1>Highscore</h1>
                <div>
                    <table id="HighScoreTable" className="table">
                        <thead>
                            <tr>
                                <th className="HighScoreHeadCell">Name</th>
                                <th className="HighScoreHeadCell">Score</th>
                                <th className="HighScoreHeadCell">Date</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.JsonStringer.map((nin, ii) =>
                                <tr>
                                    <td className="HighScoreCell"> {JSON.parse(this.state.JsonStringer[ii]).Id} </td>
                                    <td className="HighScoreCell"> {JSON.parse(this.state.JsonStringer[ii]).CorrectAnswers} </td>
                                    <td className="HighScoreCell"> {JSON.parse(this.state.JsonStringer[ii]).Date.replace('T', '/').split(/:..\./i).shift()} </td>
                                </tr>)}

                        </tbody>
                    </table>

                </div>
            </div>;
        }
        else {
            return <div>Lolding...</div>
        }
    }

}
