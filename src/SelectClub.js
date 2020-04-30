import React from 'react';
import './index.css';


class SelectClub extends React.Component{
    constructor(){
        super();
        this.state={
            cur_user:2,
            clubs:[{
                club_id:0,
                club_name:"",
                isChecked:false
            }]
        }
    }
    
    componentDidMount(){
        this.getClubs();
    }
    getClubs(){
        //get clublist

        fetch("http://localhost:8000/api/getclubs")
        .then(res=>res.json())
        .then(res=>{
            let clubs=[];
            res.data.map((club,index)=>{
                clubs.push({club_id:club.club_id,club_name:club.club_name,isChecked:false})
            })
            this.setState({clubs});
        })
        .catch(err=>err);
    }

    submitClub(){
        let req=[];
        this.state.clubs.map((club)=>{
            if(club.isChecked===true){
                req.push({cur_user:this.state.cur_user,club_id:club.club_id})
            }
        })
        
        fetch('http://localhost:8000/api/submitclub', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req)
            })
            .then((res) => res.json())
            //.then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
            
            
    }
  
    handleCheck(id){
        let clubs=this.state.clubs;
        clubs.map((club)=>{
            if(club.club_id===id){
                club.isChecked=!club.isChecked;
            }
        })
        this.setState({clubs});
    }

    render(){
        return(
            <div className="btnContainer">
                <form
                    id="club-select"
                    action={this.props.action}
                    method={this.props.method}
                    onSubmit={this.onSubmit}
                >
                    <p>Select your preferred Clubs: </p>
                    
                    {
                        //console.log(this.state.clubs)
                        this.state.clubs.map((club, index) => (
                            <div key={index}>
                                <input 
                                    type="checkbox"
                                    name={club.club_id}
                                    value={club.club_id}
                                    key={index}

                                    onChange={()=>{this.handleCheck(club.club_id)}}
                                ></input>
                                
                                <label> {club.club_name}</label>
                            </div>
                        ))
                        
                    }
                    <div>   
                        <button
                            className="btnA"
                            onClick={()=>{this.submitClub()}}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )


  }
}


export default SelectClub;