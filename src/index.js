import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import 'antd/dist/antd.css';
import './index.css';
import {  getRandomMines } from './services/mines'


class Game extends React.Component {

    /*
    Beginner: 10 mines, 8x8 board
    Avantage : 40 mines , 16x16 board 
    */
    state = {
        height: 9,
        width: 9,
        mines: 10,
        dataMines : [],
        time: 0,
        countClick : 0,
    };



    handleGameStart =  async () => {
        let difficulty = document.querySelector("#level_select");
        let params = {};
        if (difficulty.value === "beginner") {
            params.size =9
            params.mines = 10
            const { data } = await getRandomMines(params)
            this.setState({
                height: 9,
                width: 9,
                mines: 10,
                dataMines : data,
                countClick  : this.state.countClick +1,
            });
        }
        if (difficulty.value === "advantage") {
            params.size =16
            params.mines = 40
            const { data} = await getRandomMines(params)
            this.setState({
                height: 16,
                width: 16,
                mines: 40,
                dataMines : data,
                countClick  : this.state.countClick +1,
            });
        }
    }

    componentDidMount = async () =>{
        const params={
            size: 9,
            mines: 10
        }
        const { data} = await getRandomMines(params)
        this.setState({
        dataMines : data
       })

    
    }


  render() {
  const { height, width, mines,dataMines,countClick } = this.state;

 return (
            <div className="game">
                <div className="game-info">
                    <span className="info">Level:
                        <select id="level_select">
                            <option value="beginner"> Beginner </option>
                            <option value="advantage"> Advantage </option>
                        </select>
                    </span>
                    <button onClick={this.handleGameStart}> {" "} Start</button>
                </div>

                <Board handleGameStart={this.handleGameStart} height={height} width={width} mines={mines} dataMines={dataMines} countClick={countClick}  />
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));
