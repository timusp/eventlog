import React from 'react';
import './index.css';



class AddEvent extends React.Component{

    constructor(){
        super();
        this.state={
            name:null,
            date:null,
            time:null,
            venue:null,
            desc:null,
            poster:null,
            reglink:null,
            regfee:null,
            deadline:null,
        }
    }

    setTime = time => this.setState({time:time})
    setDate = date => this.setState({date:date})

    SubmitEvent(){
        this.setState({req:{name:this.state.name,date:this.state.date,time:this.state.time,venue:this.state.venue,
            desc:this.state.desc,poster:this.state.poster,reglink:this.state.reglink,regfee:this.state.regfee,
            deadline:this.state.deadline}})
        
        fetch('http://localhost:8000/api/submitevent', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.req)
            })
            .then((res) => res.json())
            //.then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
        
    }

    render(){
        return(
            <div className="btnContainer">
                <form
                    id="club-select"
                    action={this.props.action}
                    method={this.props.method}
                    onSubmit={this.onSubmit}
                ></form>
                <label>Name</label> <input type="text"
                    onChange={event=>this.setState({name:event.target.value})}></input><br/ >
                <label>Date</label> <input type="text"
                    onChange={event=>this.setState({date:event.target.value})}></input><br/ >
                
                {/*<DatePicker
                    onChange={(date)=>this.setDate(date)}
                    value={this.state.date}
                    clearIcon={null}
                    calendarIcon={null}
                    />*/
                }
                
                <label>Time</label> <input type="text"
                    onChange={event=>this.setState({time:event.target.value})}></input><br/ >
                
                {/*<TimePicker
                    onChange={(time)=>this.setTime(time)}
                    value={this.state.time}
                    clearIcon={null}
                    clockIcon={null}
                    disableClock={true}
                    />*/
                }   
                <label>Venue</label> <input type="text" 
                    onChange={event=>this.setState({venue:event.target.value})}></input><br/ >
                <label>Type</label> <input type="text"
                    onChange={event=>this.setState({type:event.target.value})}></input><br/ >
                <label>Description</label> <input type="text"
                    onChange={event=>this.setState({desc:event.target.value})}></input><br/ >
                <label>Poster Link</label> <input type="text"
                    onChange={event=>this.setState({poster:event.target.value})}></input><br/ >
                <label>Registraion Link</label> <input type="text"
                    onChange={event=>this.setState({reglink:event.target.value})}></input><br/ >
                <label>Registraion Fee</label> <input type="text"
                    onChange={event=>this.setState({regfee:event.target.value})}></input><br/ >
                <label>Registraion Deadline</label> <input type="text"
                    onChange={event=>this.setState({deadline:event.target.value})}></input><br/ >
                <button
                            className="btnA"
                            onClick={()=>{this.SubmitEvent()}}
                        >
                            Submit
                        </button>
            </div>
        )

    }
}

export default AddEvent;