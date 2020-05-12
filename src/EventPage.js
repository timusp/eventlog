import React from 'react';

class Event extends React.Component{
    constructor(props){
        super(props);

    }



    render(){
        return(
            //add here
            <div>
                {this.props.event.event_name}

            </div>
        )
    }
}

export default Event;