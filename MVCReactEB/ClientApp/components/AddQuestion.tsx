import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface CounterState {
    currentCount: number;
    NumbersOfQuestion: number;
    JsonStringer: Array<string>
    CorrectOption: number;
    Option1: string;
    Option2: string;
    Option3: string;
    Option4: string;
    Question: string;

}

export class AddQuestion extends React.Component<RouteComponentProps<{}>, CounterState> {
    constructor() {
        super();

        fetch('api/Quizs/GetQuestions')
            .then(response => response.json())
            .then(data => {
                this.setState({ JsonStringer: data });
            });

        this.state = { currentCount: 0, NumbersOfQuestion: 0, JsonStringer: [], Question: "", Option1: "", Option2: "", Option3: "", Option4: "", CorrectOption: 0 };
    }

    public render() {
        if (this.state.currentCount == 0 && (this.state.CorrectOption == 1 || this.state.CorrectOption == 2 || this.state.CorrectOption == 3 || this.state.CorrectOption == 4 || this.state.CorrectOption == 0)) {
            return <div>
                <h1>Add Question</h1>
                <table>
                    <tr>
                        <th className="HighScoreCell">
                            Question
                            </th>
                        <td className="HighScoreCell">
                            <input value={this.state.Question} onChange={(event) => this.handleQuestion(event)} />
                        </td>
                    </tr>
                    <tr>
                        <th className="HighScoreCell">
                            Options
                        </th>
                        <td className="HighScoreCell">
                            <input value={this.state.Option1} onChange={(event) => this.handleOption1(event)} />
                        </td>
                        <td className="HighScoreCell">
                            <input value={this.state.Option2} onChange={(event) => this.handleOption2(event)} />
                        </td>
                        <td className="HighScoreCell">
                            <input value={this.state.Option3} onChange={(event) => this.handleOption3(event)} />
                        </td>
                        <td className="HighScoreCell">
                            <input value={this.state.Option4} onChange={(event) => this.handleOption4(event)} />
                        </td>
                    </tr>
                    <tr>
                        <th className="HighScoreCell">
                            Correct Option
                        </th>
                        <td className="HighScoreCell">
                            <input value={this.state.CorrectOption} onChange={(event) => this.handleCorrectOption(event)} />
                        </td>
                    </tr>
                </table>

                <div id="AddQuestionWraper">
                    <button id="AddQuestionButton" onClick={() => { this.incrementCounter() }} className="btn btn-primary">Add Question</button>
                </div>
            </div>;
        }
        if (this.state.currentCount == 0) {
            return <div>
                <h1>Add Question</h1>
                <table>
                    <tr>
                        <th className="HighScoreCell">
                            Question
                            </th>
                        <td className="HighScoreCell">
                            <input value={this.state.Question} onChange={(event) => this.handleQuestion(event)} />
                        </td>
                    </tr>
                    <tr>
                        <th className="HighScoreCell">
                            Options
                        </th>
                        <td className="HighScoreCell">
                            <input value={this.state.Option1} onChange={(event) => this.handleOption1(event)} />
                        </td>
                        <td className="HighScoreCell">
                            <input value={this.state.Option2} onChange={(event) => this.handleOption2(event)} />
                        </td>
                        <td className="HighScoreCell">
                            <input value={this.state.Option3} onChange={(event) => this.handleOption3(event)} />
                        </td>
                        <td className="HighScoreCell">
                            <input value={this.state.Option4} onChange={(event) => this.handleOption4(event)} />
                        </td>
                    </tr>
                    <tr>
                        <th className="HighScoreCell">
                            Correct Option
                        </th>
                        <td className="HighScoreCell">
                            <input value={this.state.CorrectOption} onChange={(event) => this.handleCorrectOption(event)} />
                        </td>
                    </tr>
                </table>
                <br></br>
                <p className="text-danger">'Correct Option' must be a number between 1 and 4</p>
            </div>;
        }
        else {
            return <div>Added '{this.state.Question}' to the questions</div>
        }
    }

    incrementCounter() {
        this.setState({
            currentCount: 1
        });
        var x = this.state.JsonStringer.length;
        x++;
        fetch('api/Quizs/PostNewQuestion?Id=' + x + '&&Question=' + this.state.Question + '&&CorrectOption=' + this.state.CorrectOption + '&&Option1=' + this.state.Option1 + '&&Option2=' + this.state.Option2 + '&&Option3=' + this.state.Option3 + '&&OPtion4=' + this.state.Option4)
        //(string Question, int CorrectOption, string Option1, string Option2, string Option3, string Option4
    }

    lockQuestion(Question: string, Option1: string, Option2: string, Option3: string, Option4: string, CorrectOption: number) {
        var x = this.state.JsonStringer.length;
        x++;
        fetch('api/Quizs/PostNewQuestion?Id=' + x + '&&Question=' + this.state.Question + '&&CorrectOption=' + this.state.CorrectOption + '&&Option1=' + this.state.Option1 + '&&Option2=' + this.state.Option2 + '&&Option3=' + this.state.Option3 + '&&OPtion4=' + this.state.Option4)

    }

    handleOption1(event: any) {
        this.setState({
            Option1: event.target.value
        });
    }
    handleOption2(event: any) {
        this.setState({
            Option2: event.target.value
        });
    }
    handleOption3(event: any) {
        this.setState({
            Option3: event.target.value
        });
    }
    handleOption4(event: any) {
        this.setState({
            Option4: event.target.value
        });
    }
    handleQuestion(event: any) {
        this.setState({
            Question: event.target.value
        });
    }
    handleCorrectOption(event: any) {
        this.setState({
            CorrectOption: event.target.value
        });
    }


}
