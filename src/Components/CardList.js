import React from 'react';
import Card from './Card';
import Loader from './Loader';
import BottomScrollListener from 'react-bottom-scroll-listener';

const CardList = ({ repos, isLoading, handleScroll }) => {
    return (
        <div className="content">
            <BottomScrollListener onBottom={ handleScroll }>
                {
                    repos.map( ( repo, i ) => {
                        let {
                            owner,
                            name,
                            description,
                            html_url,
                            stargazers_count,
                            open_issues,
                            pushed_at
                        } = repo;
                        let days = ( 
                            new Date(new Date() - new Date( pushed_at )) /
                            1000 / 3600 / 24 
                        ).toFixed();

                        return (
                            <Card
                                key         = { i }
                                avatar      = { owner.avatar_url }
                                owner       = { owner.login }
                                description = { description }
                                repo_url    = { html_url }
                                repo_name   = { name }
                                stars       = { stargazers_count }
                                issues      = { open_issues }
                                days        = { days } />
                        )
                    })
                }
                {
                    isLoading ? <Loader /> : <span></span>
                }
            </BottomScrollListener>
        </div>
    );
}

export default CardList;