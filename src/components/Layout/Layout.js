import React, { Component } from 'react'

import Aux from '../../hoc/Auxiliary';
import RankingList from '../../containers/RankingList/RankingList';

class Layout extends Component {

    render () {
        return (
            <Aux>
                <RankingList />
            </Aux>
        );
    }
}

export default Layout;