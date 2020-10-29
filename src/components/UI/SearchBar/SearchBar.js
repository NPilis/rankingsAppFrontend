import React, { Component } from 'react';
import cls from './SearchBar.module.css';
import { withRouter } from 'react-router';

class SearchBar extends Component {

    state = {
        searchQuery: ''
    }

    inputHandler = (e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }

    searchHandler = (e) => {
        e.preventDefault();
        this.props.history.push(`/search/${this.state.searchQuery}`);
    }

    render() {

        return (
            <div className={cls.SearchBar}>
                <div className={cls.Wrapper}>
                    <div className={cls.SearchInput}>
                        <input 
                        type="text" 
                        placeholder="Search..."
                        onChange={this.inputHandler}
                        value={this.state.searchQuery} />
                    </div>
                    <div className={cls.Glass} onClick={this.searchHandler}>
                        <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                        </svg>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchBar);