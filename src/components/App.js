import React, { useState, useEffect } from 'react';
import { Navbar, Spinner } from 'react-bootstrap';
import qs from 'query-string';
import axios from 'axios';
import { Icon } from 'react-icons-kit';
import { twitter } from 'react-icons-kit/fa/twitter';
import ReactGA from 'react-ga';
import get from 'lodash.get';

import { useWindowSize } from '../utils/useWindowSize';
import Portfolio from './Portfolio';
import Search from './Search';
import SearchInput from './SearchInput';

const donationLink = 'https://www.buymeacoff.ee/christophior';
// const endpoint = 'http://localhost:3000/dev/portfolio/';
const endpoint =
	'https://ceznzhg1t7.execute-api.us-east-1.amazonaws.com/dev/portfolio/';

const Layout = ({ children, showSearch = false }) => (
	<>
		<Navbar className="justify-content-between" style={{ padding: '.5rem 0' }}>
			<Navbar.Brand href="/" style={{ paddingLeft: '1rem' }}>
				NBA Topshot Portfolio
			</Navbar.Brand>
			{showSearch && (
				<SearchInput style={{ paddingRight: '1rem' }} context="nav" />
			)}
		</Navbar>
		<div className="main">{children}</div>
		<div className="footer">
			<div className="footer-left">
				<span
					onClick={() => {
						ReactGA.event({
							category: 'promotion',
							action: 'donation link',
						});

						window.open(donationLink);
					}}
				>
					buy me a coffee
				</span>
			</div>
			<div className="footer-right">
				<span
					onClick={() => {
						ReactGA.event({
							category: 'promotion',
							action: 'twitter',
						});
						window.open('https://twitter.com/christophior');
					}}
				>
					<Icon icon={twitter} />
				</span>
			</div>
		</div>
	</>
);

const App = () => {
	const { username } = qs.parse(window.location.search);
	const [portfolio, setPortfolio] = useState(null);
	const [usersMoments, setUsersMoments] = useState([]);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [paginationToken, setPaginationToken] = useState();
	const { isMobile } = useWindowSize();

	useEffect(() => {
		if (username) {
			setLoading(true);
			(async () => {
				const { data: userData } = await axios.get(`${endpoint}${username}`);
				if (!userData || userData.error) {
					setError(get(userData, 'error', `${username} not found`));
				} else {
					setPortfolio(userData.portfolio);
					setUsersMoments(userData.usersMoments);
					setPaginationToken(userData.paginationToken);
				}

				setLoading(false);
			})();
		}
	}, []);

	const handleLoadMore = async () => {
		setLoadingMore(true);

		const { data: nextData } = await axios.get(
			`${endpoint}${username}?paginationToken=${paginationToken}`
		);

		setUsersMoments([...usersMoments, ...nextData.usersMoments]);
		setPortfolio({
			minValue: portfolio.minValue + get(nextData, 'portfolio.minValue', 0),
			maxValue: portfolio.maxValue + get(nextData, 'portfolio.maxValue', 0),
			estimatedValue:
				portfolio.estimatedValue +
				get(nextData, 'portfolio.estimatedValue', 0),
		});
		setPaginationToken(nextData.paginationToken);

		setLoadingMore(false);
	};

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
		<Layout showSearch={!isMobile}>
			<Portfolio
				username={username}
				portfolio={portfolio}
				usersMoments={usersMoments}
				error={error}
				loadMore={paginationToken ? handleLoadMore : null}
				loadingMore={loadingMore}
			/>
		</Layout>
	);
};

export default App;
