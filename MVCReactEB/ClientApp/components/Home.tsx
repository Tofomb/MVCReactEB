import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Welcome To The Quiz</h1>
            <p>Here you can play the quiz, compair your score against other players.</p>
            <p>But DON'T press the 'Add Question' button unless you are an Admin</p>
        </div>;
    }
}
