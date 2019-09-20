import React, { Component } from 'react';
import './App.css';
import CardList from './Components/CardList';

class App extends Component {
	constructor() {
		super();
		let that = this;

		this.state = {
			page: 2,
			link: `https://api.github.com/search/repositories?q=created:>${ 
				that.getDate( Date.now(), 30 ) }&sort=stars&order=desc`,
			repos: [],
			isLoading: false
		}
	}

	getDate( date, days ) {
		let d = new Date( date );
		d.setDate( d.getDate() - days );
		return d.getFullYear() + 
			"-" + ( 
				d.getMonth() + 1 < 10 ? '0' + 
				( d.getMonth() + 1 ) : ( d.getMonth() + 1 ) 
				) +
			 "-" + d.getDate();
	}

	handleScroll = () => {
		let { page, link, repos } = this.state;
		this.setState({ isLoading: true});

		fetch( link + "&page=" + page )
		.then( response => response.json() )
		.then( rs => {
			// in case the rate limit is reached we should check the returned value to make sure it contains something or it is empty.
			this.setState({ 
				repos: repos.concat( rs.items ? rs.items : [] ),
				isLoading: false,
				page: rs.items ? page + 1 : page  
			});
		})
	}

	componentWillMount() {
		this.setState({ isLoading: true });

		fetch( this.state.link )
		.then( response => response.json() )
		.then( rs => {
			this.setState({ repos: rs.items, isLoading: false });
		})
	}

	render() {
		const { isLoading, repos } = this.state;

		return (
		<div className="container">
			<div className="header">
			<div className="title">
				<span className="github-logo"></span>
				<h2>The Most Starred Github Repositories</h2>
			</div>
			</div>
			<CardList
				repos = { repos }
				isLoading = { isLoading }
				handleScroll = { this.handleScroll } />
		</div>
		)
	}  
}

export default App;
