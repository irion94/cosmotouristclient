import React from 'react'

class Popup extends React.Component{
    render(){
        const {close, children} = this.props;
        return(
            <div className="my-modal">
                <div className="modal-content animate">
                    <button className="close" onClick={() => {close()}}>x</button>
                    {
                        children
                    }
                </div>
            </div>
        )
    }
}

export default Popup