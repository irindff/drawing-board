import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css'
import DrawingBoard from "./components/DrawingBoard/DrawingBoard";
class App extends React.Component {


    boardsList(num) {
        const boards = [];

        for (let i = 0; i < num; i++) {
            boards.push(<DrawingBoard key={i}/>);
        }

        return boards;
    }

    render() {
        return (
            <div className="App">
                <div className=' container-fluid'>
                    <h1 className="text-capitalize text-center"> drawing board</h1>
                    <div className='row align-items-center'>
                        {this.boardsList(6)}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
