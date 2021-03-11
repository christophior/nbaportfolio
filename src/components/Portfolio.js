import React, { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { star as starIcon } from 'react-icons-kit/fa/star';
import { Helmet } from 'react-helmet';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import get from 'lodash.get';
import ReactGA from 'react-ga';

import { listUl as listIcon } from 'react-icons-kit/fa/listUl';
import { th as cardsIcon } from 'react-icons-kit/fa/th';

import MomentCards from './MomentCards';
import MomentsTable from './MomentsTable';
import { useWindowSize } from '../utils/useWindowSize';
import { Number } from './Number';

const Portfolio = ({ username: usernameRaw = '', data }) => {
	const username = usernameRaw.toLowerCase();
	const [favoritedUsers = []] = useLocalStorage('favoritedUsers');
	const { isMobile } = useWindowSize();
	const [tableView, setTableView] = useState(false);

	const favorited = favoritedUsers.includes(username);
	// const flowProfile = `https://flowscan.org/account/0x${data.flowAddress}`;

	useEffect(() => {
		if (isMobile) {
			setTableView(false);
		}
	}, [isMobile]);

	if (!data || data.error) {
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
					<p style={{ color: 'white' }}>minimum portfolio value</p>
					<p style={{ color: 'white', fontSize: '2rem' }}>
						<Number
							value={data.portfolio.minValue}
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
						comparable portfolio value<b>*</b>
					</p>
					<p style={{ color: 'white', fontSize: '2rem' }}>
						<Number
							value={data.portfolio.estimatedValue}
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
								borderBottom: !tableView
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
							}}
						/>
						<Icon
							icon={listIcon}
							size={20}
							className="selectViewIcon"
							style={{
								borderBottom: tableView
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
							}}
						/>
					</span>
				</div>
				{!tableView && (
					<MomentCards moments={get(data, 'usersMoments', [])} />
				)}
				{tableView && (
					<MomentsTable moments={get(data, 'usersMoments', [])} />
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
