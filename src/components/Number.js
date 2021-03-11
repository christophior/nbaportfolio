import React from 'react';
import NumberFormat from 'react-number-format';

export const Number = ({ value, prefix = '', suffix = '' }) => {
	const val = value === parseInt(value, 10) ? value : value.toFixed(2);
	return value === 0 ? (
		'N/A'
	) : (
		<NumberFormat
			value={val}
			displayType={'text'}
			thousandSeparator={true}
			prefix={prefix}
			suffix={suffix}
		/>
	);
};
