import React, { Component } from 'react'

import Aux from '../../hoc/Auxiliary';
import RankingList from '../../containers/RankingList/RankingList';
import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout extends Component {

    render () {
        return (
            <Aux>
                <Toolbar />
                <RankingList />
            </Aux>
        );
    }
}

export default Layout;