import React, { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { star as starIcon } from 'react-icons-kit/fa/star';
import { Helmet } from 'react-helmet';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import ReactGA from 'react-ga';
import { Button } from 'react-bootstrap';

import { listUl as listIcon } from 'react-icons-kit/fa/listUl';
import { th as cardsIcon } from 'react-icons-kit/fa/th';
import { areaChart } from 'react-icons-kit/fa/areaChart';

import MomentCards from './MomentCards';
import MomentsTable from './MomentsTable';
import MomentCharts from './MomentCharts';
import { useWindowSize } from '../utils/useWindowSize';
import { Number } from './Number';

const WHITELISTED = ['christophior', 'charlie0715'];

const Portfolio = ({
	username: usernameRaw = '',
	portfolio,
	usersMoments = [],
	error,
	loadMore,
	loadingMore,
}) => {
	const username = usernameRaw.toLowerCase();
	const exposeSecretView = WHITELISTED.includes(username);
	const [favoritedUsers = []] = useLocalStorage('favoritedUsers');
	const { isMobile } = useWindowSize();
	const [tableView, setTableView] = useState(false);
	const [secretView, setSecretView] = useState(false);

	const favorited = favoritedUsers.includes(username);
	// const flowProfile = `https://flowscan.org/account/0x${data.flowAddress}`;

	useEffect(() => {
		if (isMobile) {
			setTableView(false);
		}
	}, [isMobile]);

	if (error) {
		ReactGA.event({
			category: 'error',
			action: 'username not found',
			value: username,
		});

		return <h1>{`${username} not found`} </h1>;
	}

	return (
		<div>
			<Helmet>
				<title>@{username}&apos;s portfolio</title>
			</Helmet>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: '1rem',
				}}
			>
				<h1
					className="profileUsername"
					onClick={() => {
						ReactGA.event({
							category: 'interaction',
							action: 'open topshot profile',
							value: username,
						});
						window.open(`https://www.nbatopshot.com/user/@${username}`);
					}}
				>
					{username}
				</h1>
				<span
					style={{ paddingLeft: '.5rem', cursor: 'pointer' }}
					onClick={() => {
						if (favorited) {
							ReactGA.event({
								category: 'interaction',
								action: 'favorited user',
								value: username,
							});

							const updatedFavs = favoritedUsers.filter(
								(u) => u !== username
							);
							writeStorage('favoritedUsers', updatedFavs);
						} else {
							ReactGA.event({
								category: 'interaction',
								action: 'unfavorited user',
								value: username,
							});

							const updatedFavs = [username, ...favoritedUsers];
							writeStorage('favoritedUsers', updatedFavs);
						}
					}}
				>
					<Icon
						icon={starIcon}
						style={favorited ? { color: '#e0db16' } : {}}
						className="starIcon"
						size={24}
					/>
				</span>
			</div>

			<div
				style={{
					// textAlign: 'left',
					background: 'rgb(10 111 10)',
					display: 'inline-block',
					padding: '.5rem 2.5rem',
					borderRadius: '6px',
				}}
			>
				<div
					style={{
						display: 'inline-block',
						borderRight: isMobile ? 'none' : '1px solid #fff',
						borderBottom: isMobile ? '1px solid #fff' : 'none',
						paddingRight: isMobile ? '0' : '1rem',
					}}
				>
					<p style={{ color: 'white' }}>minimum value</p>
					<p style={{ color: 'white', fontSize: '2rem' }}>
						<Number
							value={portfolio.minValue}
							displayType={'text'}
							thousandSeparator={true}
							prefix={'$'}
						/>
					</p>
				</div>
				<div
					style={{
						display: 'inline-block',
						paddingLeft: isMobile ? '0' : '1rem',
						paddingTop: isMobile ? '.5rem' : '0',
					}}
				>
					<p style={{ color: 'white' }}>
						comparable value<b>*</b>
					</p>
					<p style={{ color: 'white', fontSize: '2rem' }}>
						<Number
							value={portfolio.estimatedValue}
							displayType={'text'}
							thousandSeparator={true}
							prefix={'$'}
						/>
					</p>
				</div>
			</div>

			<div style={{ padding: '1.5rem 0' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						paddingBottom: '1rem',
					}}
				>
					<span className="toggleViewIcons">
						<Icon
							icon={cardsIcon}
							className="selectViewIcon"
							size={20}
							style={{
								borderBottom:
									!tableView && !secretView
										? '2px solid #b1b1b1'
										: 'none',
							}}
							onClick={() => {
								ReactGA.event({
									category: 'interaction',
									action: 'toggle card view',
									value: username,
								});
								setTableView(false);
								setSecretView(false);
							}}
						/>
						<Icon
							icon={listIcon}
							size={20}
							className="selectViewIcon"
							style={{
								borderBottom:
									tableView && !secretView
										? '2px solid #b1b1b1'
										: 'none',
							}}
							onClick={() => {
								ReactGA.event({
									category: 'interaction',
									action: 'toggle table view',
									value: username,
								});
								setTableView(true);
								setSecretView(false);
							}}
						/>
						{exposeSecretView && (
							<Icon
								icon={areaChart}
								size={20}
								className="selectViewIcon"
								style={{
									borderBottom: secretView
										? '2px solid #b1b1b1'
										: 'none',
								}}
								onClick={() => {
									ReactGA.event({
										category: 'interaction',
										action: 'enable secret view',
										value: username,
									});
									setSecretView(true);
								}}
							/>
						)}
					</span>
				</div>

				{!tableView && !secretView && <MomentCards moments={usersMoments} />}
				{tableView && !secretView && <MomentsTable moments={usersMoments} />}
				{secretView && <MomentCharts moments={usersMoments} />}

				{loadMore && (
					<Button
						variant="outline-success"
						disabled={loadingMore}
						style={{
							margin: '1rem',
						}}
						onClick={loadMore}
					>
						load more
					</Button>
				)}

				<p style={{ padding: '1rem 0', color: '#666' }}>
					* comparable values are calculated by getting the average of the
					asking prices of the 10 closest serial numbers (minus the highest
					ask)
				</p>
			</div>
		</div>
	);
};

export default Portfolio;
