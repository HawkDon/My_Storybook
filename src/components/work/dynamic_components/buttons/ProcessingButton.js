import React, { Component } from 'react';

class ProcessingButton extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    processing = async () => {
        // Get this node to not create a new one every time it renders.
        const node = this.myRef.current;
        // Disable the button while it processes.
        node.setAttribute("disabled", "disabled")
        // Create some style. Will make another solution for inline css later.
        node.setAttribute("style", "background-image: linear-gradient( 90deg, #C0C0C0 25%,transparent 25%,transparent 50%, #C0C0C0 50%, #C0C0C0 75%, transparent 75%, transparent); animation: barberpole 2s linear infinite")
        //Perform the operation passed in as a prop.
        await this.props.onClick();
        // Remove the attributes when we are done with out processing.
        node.removeAttribute("disabled");
        node.removeAttribute("style");
    }

    render() {
        return <input type={this.props.type} ref={this.myRef} value={this.props.value} onClick={this.processing}/>
    }
}

export default ProcessingButton;