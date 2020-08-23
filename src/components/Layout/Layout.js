import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import RankingList from '../../containers/RankingList/RankingList';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerToggle = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !this.state.showSideDrawer }
        });
    }

    sideDrawerClosed = () => {
        this.setState({showSideDrawer: false});
    }

    render () {
        return (
            <Aux>
                <Toolbar 
                    toggleClicked={this.sideDrawerToggle} />
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosed} />
                <RankingList />
            </Aux>
        );
    }
}

export default Layout;