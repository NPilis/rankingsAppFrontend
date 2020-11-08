import React, { Component } from 'react';
import cls from './Filters.module.css';
import { withRouter } from 'react-router';

class Filters extends Component {
    
    state = {
        days: "1",
        display: "last day"
    }

    handleChange = (event) => {
        const index = event.nativeEvent.target.selectedIndex;
        this.setState({
            days: event.target.value,
            display: event.nativeEvent.target[index].text.toLowerCase()
        }, () => {
            console.log("hottest" === this.props.rankingType, this.state.days)
            switch(this.props.rankingType){
                case 'hottest':
                    this.props.history.push(`/rankings/hottest/days=${this.state.days}`)
                    break;
                case 'newest':
                    this.props.history.push(`/rankings/newest/days=${this.state.days}`)
                    break;
                default:
                    this.props.history.push('/rankings/hottest/days=7')
            }
        })
    }


    render() {

        return (
            <div className={cls.Filters}>
                <div className={cls.Header}>
                    <p>{this.props.match.params.type.charAt(0).toUpperCase() + this.props.match.params.type.slice(1)} rankings of {this.state.display}</p>
                </div>
                <div className={cls.DateFilter}>
                    <p>Filter by date</p>
                    <select onChange={this.handleChange}>
                        <option value="1">Last day</option>
                        <option value="3">Last 3 days</option>
                        <option value="7">Last week</option>
                        <option value="30">Last month</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default withRouter(Filters);