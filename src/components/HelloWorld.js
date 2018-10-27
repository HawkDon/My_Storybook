import React, { Component } from 'react';
const baseURL = `${window.location.protocol}//${window.location.host}/lemon`;

class HelloWorld extends Component {

    async componentDidMount(){
        const test = await fetch(`http://localhost:3000/lemon/seam/resource/rest/v2/processDesigner/propertyTypeEdit/getPropertyTypesAvailable?stateId=3`,
        {
            method: "GET",
            credentials: "same-origin"
        })
        .then(res => res.json());
        console.log(test)
    }

    render() {
        return (
            <div>Hello World</div>
        );
    }
}

export default HelloWorld;