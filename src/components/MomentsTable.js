import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Number } from './Number';

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
					<Number value={cell} />
					{' of '}
					<Number
						value={row.circulationCount}
						suffix={row.flowRetired ? '' : '+'}
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
					<a
						href={cell}
						style={{ padding: '.25rem' }}
						target="_blank"
						rel="noreferrer"
					>
						moment
					</a>
					{row.marketplaceUrl && (
						<a
							href={row.marketplaceUrl}
							style={{ padding: '.25rem' }}
							target="_blank"
							rel="noreferrer"
						>
							marketplace
						</a>
					)}
				</div>
			);
		},
	},
	{
		dataField: 'priceRange.minAsk',
		text: 'min asking',
		sort: true,
		formatter: (cell) => <Number value={cell} prefix={'$'} />,
	},
	{
		dataField: 'priceRange.maxAsk',
		text: 'max asking',
		sort: true,
		formatter: (cell) => <Number value={cell} prefix={'$'} />,
	},
];

const MomentsTable = ({ moments }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				justifyContent: 'center',
			}}
		>
			<BootstrapTable
				keyField="momentUrl"
				data={moments}
				columns={columns}
				defaultSorted={[
					{
						dataField: 'priceRange.minAsk',
						order: 'desc',
					},
				]}
			/>
		</div>
	);
};

export default MomentsTable;
