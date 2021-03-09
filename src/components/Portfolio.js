import React, { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { star as starIcon } from 'react-icons-kit/fa/star';
import NumberFormat from 'react-number-format';
import { Helmet } from 'react-helmet';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import get from 'lodash.get';

import { listUl as listIcon } from 'react-icons-kit/fa/listUl';
import { th as cardsIcon } from 'react-icons-kit/fa/th';

import MomentCards from './MomentCards';
import MomentsTable from './MomentsTable';
import { useWindowSize } from '../utils/useWindowSize';

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
						window.open(`https://www.nbatopshot.com/user/@${username}`);
					}}
				>
					{username}
				</h1>
				<span
					style={{ paddingLeft: '.5rem', cursor: 'pointer' }}
					onClick={() => {
						if (favorited) {
							const updatedFavs = favoritedUsers.filter(
								(u) => u !== username
							);
							writeStorage('favoritedUsers', updatedFavs);
						} else {
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
					borderRadius: '12px',
				}}
			>
				<p style={{ color: 'white' }}>estimate portfolio value</p>
				<p style={{ color: 'white', fontSize: '2rem' }}>
					<NumberFormat
						value={data.portfolio.minValue}
						displayType={'text'}
						thousandSeparator={true}
						prefix={'$'}
					/>
				</p>
			</div>

			<div style={{ padding: '1.5rem 0' }}>
				{!isMobile && (
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
								onClick={() => setTableView(false)}
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
								onClick={() => setTableView(true)}
							/>
						</span>
					</div>
				)}
				{!tableView && (
					<MomentCards moments={get(data, 'usersMoments', [])} />
				)}
				{tableView && (
					<MomentsTable moments={get(data, 'usersMoments', [])} />
				)}
			</div>
		</div>
	);
};

export default Portfolio;
