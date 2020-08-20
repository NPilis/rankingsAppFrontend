import React, { Component } from 'react'
import Ranking from '../../components/Ranking/Ranking';

import cls from './RankingList.module.css';

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
        rankingList: [
            {
                title: "Top 100 cars to buy in 2020 under 5000$",
                ranking_positions: [
                    {
                        title: "first",
                        description: "first position",
                        position: 1,
                        image: null
                    },
                    {
                        title: "second",
                        description: "second position",
                        position: 2,
                        image: null
                    },
                    {
                        title: "third",
                        description: "third position",
                        position: 3,
                        image: null
                    }
                ],
                content: "ranking",
                status: "private",
                image: null,
                uuid: "2ed458e3-083a-493c-b97c-fd004bb4af47",
                created_at: "2020-08-08T21:07:37.779538Z",
                edited_at: "2020-08-10T15:02:00.100522Z",
                total_difference: 2,
                author: 1,
                likes: [
                    2,
                    3,
                    4
                ],
                dislikes: [
                    6,
                    9
                ],
                shares: 5,
                comments: 3
            },
            {
                title: "Top 10sd0 cars to buy in 2020 under 5000$",
                ranking_positions: [
                    {
                        title: "first",
                        description: "first position",
                        position: 1,
                        image: null
                    },
                    {
                        title: "second",
                        description: "second position",
                        position: 2,
                        image: null
                    },
                    {
                        title: "third",
                        description: "third position",
                        position: 3,
                        image: null
                    }
                ],
                content: "ranking",
                status: "private",
                image: null,
                uuid: "2ed458e3-083a-493c-b97c-fd004bb4af47",
                created_at: "2020-08-08T21:07:37.779538Z",
                edited_at: "2020-08-10T15:02:00.100522Z",
                total_difference: 2,
                author: 1,
                likes: [
                    2,
                    3,
                    4
                ],
                dislikes: [
                    6,
                    9
                ],
                shares: 5,
                comments: 3
            }
            
        ]
    }

    render () {
        let list = <ul>
            {this.state.rankingList.map(item => (
                <Ranking key={item.uuid} rank={item} />
            ))}
        </ul>
        
        return(
            <div className={cls.RankingList}>
                {list}
            </div>
        );
    }
}

export default RankingList;