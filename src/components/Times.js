import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
 Modal   
} from 'antd'

class Times extends Component {
   state = {
    time: 0,
   } 

   tick = () => {
    let time = this.state.time + 1;
    this.setState({ time });
   };
  
   stopTimer =() => {
    clearInterval(this.intervalID)
   }

   resetTimer() {
    this.setState({time: 0})
   }

   startTimer() {
    this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
   } 
   
   componentDidMount = () =>{
    this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
   }

    componentDidUpdate = (prevProps, prevState ) =>{
      const { countClick, endGame ,resetStateEndGame } = this.props
        if(prevProps.countClick !== countClick ){ 
        this.setState({time: 0})
        this.startTimer()
        }
        if((prevProps.endGame !== endGame) && endGame ) {
            this.stopTimer()
            resetStateEndGame()
        }  
    }
   
    handleGameReStart= () =>{
      const { handleGameStart ,handleCancel} = this.props
      handleGameStart()
      handleCancel()
    }


    render() {
        const { time } = this.state;
        const { statusGame ,endGame ,handleCancel} = this.props
        let hours = Math.floor(time / 3600); 
        let minutes = Math.floor(time / 60);
        let formattedSeconds = time - minutes * 60 || 0;
        formattedSeconds =formattedSeconds < 10 ? `0${formattedSeconds}` : formattedSeconds;
        let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        let formattedHours = hours < 10 ? `0${hours}` : hours;
        let times = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;   
        return (
            <div>
                 <p>  {times} </p>           
                 <Modal
                 visible={statusGame}
                 onCancel={()=>handleCancel()}
                 footer={null}       
                 >
                   <div>
                  {
                    endGame ==='win' ? <p> You Win</p> : <p> You Lose</p>         
                  }
                  <p>{times}</p>
                  <button onClick={this.handleGameReStart}  > Restart </button>
                  </div>
                 </Modal>
            </div>
        )
    }
}

Times.propTypes = {
    prop: PropTypes
}

export default Times 
