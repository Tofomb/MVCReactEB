import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ChangeEvent } from 'react';

interface CounterState {
    currentCount: string;
    JsonStringer: Array<string>;
    Counter: number;
    Option1Radio: string;
    Option2Radio: string;
    Option3Radio: string;
    Option4Radio: string;
    CorrectOption: string;
    SelectedOption: string;
    UserName: string;
    UserScoreJson: Array<string>
    StateOfThings: number;
    CorrectCounter: number;
}

export class Quiz extends React.Component<RouteComponentProps<{}>, CounterState> {
    constructor() {
        super();


        this.handleOptionChange = this.handleOptionChange.bind(this);

        this.state = { currentCount: "string", Counter: 0, CorrectCounter: 0, JsonStringer: [], UserScoreJson: [], Option1Radio: "", Option2Radio: "", Option3Radio: "", Option4Radio: "", SelectedOption: "1", UserName: "", StateOfThings: 0, CorrectOption: "0" };

        fetch('api/Quizs/GetQuestions')
            .then(response => response.json())
            .then(data => {
                this.setState({ JsonStringer: data });
            });
    }

    public render() {
        if (this.state.StateOfThings == 0) {
            if (this.state.UserName == "") {
                return <div>
                    <div id="HighScoreFrame">
                        <br></br>
                        <input value={this.state.UserName} onChange={(event) => this.handleUserName(event)} />
                        <span> Enter User Name</span>
                    </div>
                </div>
            }
            else {
                return <div>
                    <div id="HighScoreFrame">
                        <br></br>
                        <input value={this.state.UserName} onChange={(event) => this.handleUserName(event)} />
                        <button onClick={() => { this.lockUserName(this.state.UserName) }}>Enter User Name</button>
                    </div>
                </div>
            }
        }
        else if (this.state.StateOfThings == 1) {
            return <div>
                <div id="HighScoreFrame">

                    <h1>Quiz</h1>
                    <div id="QuizFrame">
                        <div>
                            <p>Question: <strong>{this.state.currentCount}</strong></p>
                            <div>Player: {this.state.UserName} Question Number: {this.state.Counter + 1}</div>

                            <form>
                                <div className="radio">
                                    <label>
                                        <input type="radio" value="1" checked={this.state.SelectedOption === '1'} onChange={() => this.handleOptionChange("1")} />
                                        {this.state.Option1Radio}
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input type="radio" value="2" checked={this.state.SelectedOption === '2'} onChange={() => this.handleOptionChange("2")} />
                                        {this.state.Option2Radio}
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input type="radio" value="3" checked={this.state.SelectedOption === '3'} onChange={() => this.handleOptionChange("3")} />
                                        {this.state.Option3Radio}
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input type="radio" value="4" checked={this.state.SelectedOption === '4'} onChange={() => this.handleOptionChange("4")} />
                                        {this.state.Option4Radio}
                                    </label>
                                </div>
                            </form>

                            <div></div>
                            <button onClick={() => { this.checkAnswer() }}>Answer</button>
                        </div>
                    </div>
                </div>
            </div>;

        }
        else if (this.state.StateOfThings == 2) {

            if (this.state.CorrectOption == this.state.SelectedOption) {
                return <div>
                    <div id="HighScoreFrame">
                        <div id="QuizFrame">
                            <div>
                                Correct! {this.state.Counter} / {this.state.JsonStringer.length}  <button onClick={() => { this.incrementCounter() }}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>

            }
            else if (this.state.CorrectOption != this.state.SelectedOption && this.state.Counter != 0) {
                return <div>
                    <div id="HighScoreFrame">
                        <div id="QuizFrame">
                            <div>
                                Wrong! {this.state.Counter} / {this.state.JsonStringer.length}  <button onClick={() => { this.incrementCounter() }}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            return <div>
                <div id="HighScoreFrame">
                    <h1>Quiz</h1>
                    <div id="QuizFrame">
                        <div>

                            <p>Welcome To the Quiz {this.state.UserName}. You can take a break whenever you want, and pick it up later.</p>

                            <form>
                                <div className="radio">
                                    <label>
                                        {this.state.Option1Radio}
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        {this.state.Option2Radio}
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        {this.state.Option3Radio}
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        {this.state.Option4Radio}
                                    </label>
                                </div>
                            </form>

                            <div></div>
                            <button onClick={() => { this.incrementCounter() }}>Next</button>
                        </div>
                    </div>
                </div>
            </div>;
        }

        else if (this.state.StateOfThings == 3) {
            return <div>
                <div id="HighScoreFrame">
                    <br></br>
                    Points: {this.state.CorrectCounter} / {this.state.Counter}
                </div>
            </div>
        }

        return <div></div>
    }

    incrementCounter() {

        if (this.state.Counter < this.state.JsonStringer.length) {

            var x = JSON.parse(this.state.JsonStringer[this.state.Counter]);
            this.setState({

                currentCount: x.Question,
                JsonStringer: this.state.JsonStringer,
                Option1Radio: x.Option1,
                Option2Radio: x.Option2,
                Option3Radio: x.Option3,
                Option4Radio: x.Option4,
                CorrectOption: x.CorrectOption,
                StateOfThings: 1
            });
        }
        else { this.setState({ StateOfThings: 3 }); }
    }
    handleUserName(event: any) {
        this.setState({
            UserName: event.target.value
        });
    }

    handleOptionChange(eventString: string) {
        this.setState({
            SelectedOption: eventString
        });
    }
    lockUserName(UserTagName: string) {
        fetch('api/Quizs/GetUserScore?userId=' + this.state.UserName)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    UserScoreJson: data
                });
            });

        var x = JSON.parse(this.state.UserScoreJson[0]);
        this.setState({
            Counter: x.AnswerdQuestion,
            CorrectCounter: x.CorrectAnswers,
            StateOfThings: 2
        });
    }
    // Make This One Async? Change in tsconfig.json
    checkAnswer() {
        var x = this.state.Counter;
        var y = this.state.CorrectCounter;
        if (this.state.SelectedOption == this.state.CorrectOption) {
            y++;
            this.setState({ CorrectCounter: y });

        }
        if (this.state.CorrectOption !== "0") {
            x++;
            this.setState({
                Counter: x,

            });

            fetch('api/Quizs/PostScores?userId=' + this.state.UserName + '&&correctAnswers=' + y + '&&answerdQuestions=' + x)
        }

        this.setState({
            StateOfThings: 2
        });
    }

    saveScore() {
        fetch('api/Quizs/PostScores?userId=' + this.state.UserName + '&&correctAnswers=' + this.state.CorrectCounter + '&&answerdQuestions=' + this.state.Counter)
    }
}
