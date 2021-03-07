import React, { useState, useEffect } from 'react';
import { Navbar, Spinner } from 'react-bootstrap';
import qs from 'query-string';
import axios from 'axios';

import Portfolio from './Portfolio';
import Search from './Search';

const Layout = ({ children }) => (
	<>
		<Navbar bg="dark">
			<Navbar.Brand href="/" style={{ color: '#fff' }}>
				NBA Topshot Portfolio
			</Navbar.Brand>
		</Navbar>
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				margin: 'auto',
				padding: '2rem',
				textAlign: 'center',
				maxWidth: '1000px',
			}}
		>
			{children}
		</div>
	</>
);

const App = () => {
	const { username } = qs.parse(window.location.search);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (username) {
			setLoading(true);
			(async () => {
				const { data: userdata } = await axios.get(
					`https://ceznzhg1t7.execute-api.us-east-1.amazonaws.com/dev/portfolio/${username}`
				);
				setData(userdata);
				setLoading(false);
			})();
		}
	}, []);

	if (!username) {
		return (
			<Layout>
				<Search />
			</Layout>
		);
	}

	if (loading) {
		return (
			<Layout>
				<div style={{ textAlign: 'center', marginTop: '20%' }}>
					<Spinner
						animation="border"
						role="status"
						variant="secondary"
						style={{
							height: '100px',
							width: '100px',
						}}
					/>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<Portfolio data={data} username={username} />
		</Layout>
	);
};

export default App;