import React, { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { star as starIcon } from 'react-icons-kit/fa/star';
import NumberFormat from 'react-number-format';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';

import { listUl as listIcon } from 'react-icons-kit/fa/listUl';
import { th as cardsIcon } from 'react-icons-kit/fa/th';
import BootstrapTable from 'react-bootstrap-table-next';

import MomentCard from './MomentCard';
import { useWindowSize } from '../utils/useWindowSize';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const columns = [
	{
		dataField: 'playerName',
		text: 'player',
		sort: true,
	},
	{
		dataField: 'playCategory',
		text: 'play',
		sort: true,
	},
	{
		dataField: 'serialNumber',
		text: 'serial #',
		sort: true,
		formatter: (cell, row) => {
			return (
				<>
					<NumberFormat
						value={cell}
						displayType={'text'}
						thousandSeparator={true}
					/>
					{' of '}
					<NumberFormat
						value={row.circulationCount}
						displayType={'text'}
						thousandSeparator={true}
					/>
				</>
			);
		},
	},
	{
		dataField: 'momentUrl',
		text: 'urls',
		formatter: (cell, row) => {
			return (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<a href={cell} style={{ padding: '.25rem' }} target="_blank">
						moment
					</a>
					<a
						href={row.marketplaceUrl}
						style={{ padding: '.25rem' }}
						target="_blank"
					>
						marketplace
					</a>
				</div>
			);
		},
	},
	{
		dataField: 'priceRange.minAsk',
		text: 'min asking',
		sort: true,
		formatter: (cell) => (
			<NumberFormat
				value={cell}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'$'}
			/>
		),
	},
	{
		dataField: 'priceRange.maxAsk',
		text: 'max asking',
		sort: true,
		formatter: (cell) => (
			<NumberFormat
				value={cell}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'$'}
			/>
		),
	},
];

const Portfolio = ({ username: usernameRaw = '', data }) => {
	const username = usernameRaw.toLowerCase();
	const [favoritedUsers = []] = useLocalStorage('favoritedUsers');
	const { isMobile } = useWindowSize();
	const [tableView, setTableView] = useState(false);

	const favorited = favoritedUsers.includes(username);

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
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: '1rem',
				}}
			>
				<h1>{username}</h1>
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
						size={24}
					/>
				</span>
			</div>

			<div
				style={{
					// textAlign: 'left',
					background: '#1a8a1a',
					display: 'inline-block',
					padding: '.5rem 2.5rem',
					borderRadius: '5px',
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
				<h2 style={{ margin: '0' }}>{username}'s moments</h2>
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
								style={{
									borderBottom: !tableView
										? '2px solid #666'
										: 'none',
								}}
								onClick={() => setTableView(false)}
							/>
							<Icon
								icon={listIcon}
								style={{
									borderBottom: tableView
										? '2px solid #666'
										: 'none',
								}}
								onClick={() => setTableView(true)}
							/>
						</span>
					</div>
				)}
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'center',
					}}
				>
					{!tableView &&
						data.usersMoments.map((moment) => (
							<MomentCard key={moment.momentUrl} moment={moment} />
						))}
					{tableView && (
						<BootstrapTable
							keyField="momentUrl"
							data={data.usersMoments}
							columns={columns}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Portfolio;
