import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import NumberFormat from 'react-number-format';

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
			<BootstrapTable keyField="momentUrl" data={moments} columns={columns} />
		</div>
	);
};

export default MomentsTable;
