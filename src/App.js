import React, { Component } from 'react';
import './App.css';
import CardList from './Components/CardList';

class App extends Component {
	constructor() {
		super();
		let that = this;

		this.state = {
		page: 1,
		link: `https://api.github.com/search/repositories?q=created:>${that.getDate( Date.now(), 30 )}&sort=stars&order=desc`,
		repos: []
		}
	}

	getDate( date, days ) {
		let d = new Date( date );
		d.setDate( d.getDate() - days );
		return d.getFullYear() + "-" + (d.getMonth() + 1 < 10 ? '0'+( d.getMonth() + 1 ) : ( d.getMonth() + 1 )  ) + "-" + d.getDate();
	}

	componentWillMount() {
		fetch( this.state.link )
		.then( response => response.json() )
		.then( rs => {
		this.setState({ repos: rs.items });
		})
	}

	render() {
		const { repos } = this.state;

		return (
		<div className="container">
			<div className="header">
			<div className="title">
				<span className="github-logo"></span>
				<h2>The Most Starred Github Repositories</h2>
			</div>
			</div>
			<CardList repos = { repos } />
		</div>
		)
	}  
}

export default App;
