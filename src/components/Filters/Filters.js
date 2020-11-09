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
                <div className={cls.DateFilter}>
                    <p>Filter by date</p>
                    <select onChange={this.handleChange}>
                        <option value="1">Last day</option>
                        <option value="3">Last 3 days</option>
                        <option value="7">Last week</option>
                        <option value="30">Last month</option>
                        <option value="90">Last three months</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default withRouter(Filters);