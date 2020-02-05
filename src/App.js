import React, { Component } from 'react';
import './App.css';
import CardList from './Components/CardList';
import Filter from './Components/Filter';

class App extends Component {
	constructor() {
		super();
		let that = this;

		this.state = {
			page: 2,
			link: `https://api.github.com/search/repositories?q=created:>${ 
				that.getDate( Date.now(), 30 ) }&sort=stars&order=desc`,
			repos: [],
			isLoading: false,
			searchField: ''
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
			"-" + ( d.getDate() < 10 ? '0' + d.getDate() : d.getDate() );
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

	handleFilter = ( event ) => {
		this.setState({ searchField: event.target.value });
	}

	componentWillMount() {
		this.setState({ isLoading: true });

		fetch( this.state.link )
		.then( response => response.json() )
		.then( rs => {
			console.log(rs);
			this.setState({ repos: rs.items, isLoading: false });
		})
	}

	render() {
		const { searchField, isLoading, repos } = this.state;

		const filteredRepos = repos.filter(( repo ) => {
			return repo.owner.login.includes( searchField );
		});

		return (
		<div className="container">
			<div className="header">
				<div className="title">
					<span className="github-logo"></span>
					<h2>The Most Starred Github Repositories Created In The Last 30 Days</h2>
				</div>
				<Filter handleFilter = { this.handleFilter } />
			</div>
			<CardList
				repos = { filteredRepos }
				isLoading = { isLoading }
				handleScroll = { this.handleScroll } />
		</div>
		)
	}  
}

export default App;
