import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';

import RankingContent from '../../components/RankingContent/RankingContent';
import RankingInteractions from '../../components/RankingInteractions/RankingInteractions';
import RankingMedia from '../../components/RankingMedia/RankingMedia';

class Ranking extends Component {
    state = {
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
        ]
    }



    render () {
        return(
            <Aux>
                <RankingContent
                    title={this.state.title}
                    ranking_positions={this.state.ranking_positions}/>
                <RankingInteractions>
                    Likes, comments, shares
                </RankingInteractions>
                <RankingMedia>
                    Images, author, additional information
                </RankingMedia>
                <h1>Ranking Title</h1>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
                <h2>zdjecie</h2>
            </Aux>
        );
    }
}

export default Ranking;