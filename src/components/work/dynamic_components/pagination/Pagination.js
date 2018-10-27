import React, { Component } from 'react';
import styled from 'styled-components';
import './position.css';


export class Pagination extends Component {
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.data !== prevProps.data) {
            this.setState({
                data: this.props.data,
                pageOfData: this.props.pageOne,
                pages: this.props.pages,
                size: this.props.size,
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
            const amountOfPages = Math.ceil(filteredData.length / size);
            const arrayOfPages = ([...Array(amountOfPages).keys()].map(x => x + 1));
            this.setState({
                pages: arrayOfPages
            })
            if (pageOne.length === 0) {
                this.setState({
                    data: filteredData,
                    pageOfData: pageOne,
                    pages: [],
                    type: {}
                })
            } else {
                this.setState({
                    data: filteredData,
                    pageOfData: pageOne,
                    pages: arrayOfPages
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

    addType = (e) => {
        const { type } = this.state;
        console.log("Lad os gemme!");
        console.log(type);
        // Do something...
    }

    handleSelect = (res) => (e) => {
        e.preventDefault();
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
                        <br /><br />
                        {this.state.type ? (<label>{this.state.type.title}</label>) : null}
                        <br /><br />
                        <input type="submit" value="Gem" onClick={this.addType} />
                    </div>) : null}
                <div className="content">
                    {this.state.pageOfData.map(res => <a href="" onClick={this.handleSelect(res)}>{res.title}<br /></a>)}
                </div>
            </div>
        );
    }
}

class PaginationEntry extends Component {

    state = {
        data: [],
        size: 20,
        pages: [],
        pageOne: []
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
            pageOne: pageOne
        })
    }


    render() {
        const { data, size, pages, pageOne } = this.state;
        return (
            <Pagination 
            size={size}
            data={data}
            pages={pages}
            pageOne={pageOne}
            />
        );
    }
}
export default PaginationEntry;