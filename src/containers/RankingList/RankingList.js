import React, { Component } from 'react'
import Ranking from '../../components/Ranking/Ranking';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import cls from './RankingList.module.css';
import Aux from '../../hoc/Auxiliary';
// import RankingDetail from '../RankingDetail/RankingDetail';

class RankingList extends Component {

    // ```Fetching List of Rankings:
    //     id: INT
    //     top_three_rp: Array of top three positions
    //     title: String
    //     content: String
    //     status: String
    //     image: Image
    //     UUID: UUID
    //     created_at: DateTime
    //     edited_at: DateTime
    //     total_difference: INT abs(likes-dislikes)
    //     author: PK
    //     likes: Array of user IDs
    //     dislikes: Array of user IDs
    // ```
    state = {
        rankings: []
    }

    componentDidMount() {
        axios.get('/api/rankings/public/')
            .then(response => {
                this.setState({ rankings: response.data.results });
                console.log(response.data.results)
            });
    }

    rankingSelectedHandler = (uuid) => {
        console.log(uuid)
    }

    render() {
        const list = <ul>
            {this.state.rankings.map(ranking => (
                <Link
                    to={'/rankings/' + ranking.uuid}
                    key={ranking.uuid}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Ranking
                        rank={ranking} />
                </Link>
            ))}
        </ul>

        return (
            <Aux>
                <div className={cls.RankingList}>
                    {list}
                </div>
            </Aux>
        );
    }
}

export default RankingList;