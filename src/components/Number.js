import React from 'react';
import NumberFormat from 'react-number-format';

export const Number = ({ value, prefix = '', suffix = '' }) => {
	return value === 0 ? (
		<p>N/A</p>
	) : (
		<NumberFormat
			value={value}
			displayType={'text'}
			thousandSeparator={true}
			prefix={prefix}
			suffix={suffix}
		/>
	);
};
