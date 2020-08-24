import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import RankingList from '../../containers/RankingList/RankingList';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { Route } from 'react-router';
import RankingDetail from '../../containers/RankingDetail/RankingDetail';

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
                <Route path={'/rankings'} exact component={RankingList} />
                <Route path={'/rankings/:uuid'} exact component={RankingDetail} />
            </Aux>
        );
    }
}

export default Layout;