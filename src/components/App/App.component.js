import React from 'react';
import './App.component.scss';
import { Router, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProductListComponent from '../ProductList/ProductList.component';

class App extends React.Component {
	render() {
		return (
			<div className="container-fluid px-0">
				<nav className="navbar navbar-expand-lg navbar-light bg-primary px-5" id="appnavbar">
					<a className="navbar-brand text-white" href="#">Test Labs</a>
				</nav>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={ProductListComponent} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
