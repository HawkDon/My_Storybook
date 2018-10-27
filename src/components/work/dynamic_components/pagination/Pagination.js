import React, { Component } from 'react';
import styled from 'styled-components';
import './position.css';


class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            data: [],
            pageOfData: [],
            pages: [],
            size: 20,
            type: {}
        }

    }

    async componentDidMount() {
        const data = await fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json());
        const { size } = this.state;
        const amountOfPages = Math.ceil(data.length / size);
        const arrayOfPages = ([...Array(amountOfPages).keys()].map(x => x + 1));
        const pageOne = data.slice(0, size);
        this.setState({
            data: data,
            pages: arrayOfPages,
            pageOfData: pageOne
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.data !== this.state.data) {
            const { data, size } = this.state;
            const amountOfPages = Math.ceil(data.length / size);
            const arrayOfPages = ([...Array(amountOfPages).keys()].map(x => x + 1));
            this.setState({
                pages: arrayOfPages
            })
        }
    }

    changeInput = (e) => {
        this.setState({
            inputValue: e.target.value
        }, async () => {
            const { inputValue, size } = this.state;
            const data = await fetch('https://jsonplaceholder.typicode.com/todos')
                .then(response => response.json())
            const filteredData = data.filter(res => res.title.includes(inputValue));
            const pageOne = filteredData.slice(0, size);
            if (pageOne.length === 0) {
                this.setState({
                    data: filteredData,
                    pageOfData: pageOne,
                    pages: []
                })
            } else {
                this.setState({
                    data: filteredData,
                    pageOfData: pageOne
                })
            }
        })
    }

    displayLines = (e) => {
        e.preventDefault();
        const number = e.target.getAttribute("value");
        const { data, size } = this.state;
        const chosenData = data.slice((number - 1) * size, number * size);
        this.setState({
            pageOfData: chosenData
        })
    }

    addType = () => {
        const { type } = this.state;
        console.log("Lad os gemme!");
        console.log(type);
        // Do something...
    }

    handleSelect = (res) => (e) => {
        this.setState({
            type: res
        })
    }

    render() {
        return (
            <div className="wrapper">
                <br />
                <input type="text" value={this.state.inputValue} onChange={this.changeInput} />
                <br /><br />
                {this.state.pages.length ?
                    (<div className="pagination">
                        {this.state.pages.map(ele => <a href="" onClick={this.displayLines} value={ele}>{ele}</a>)}
                        <br />

                        <input type="submit" value="Gem" onClick={this.addType} />
                    </div>) : null}
                <div className="content">
                    {this.state.pageOfData.map(res => <span onClick={this.handleSelect(res)}>{res.title}<br /></span>)}
                </div>
            </div>
        );
    }
}

export default Pagination;