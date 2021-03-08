import React from 'react';
import NumberFormat from 'react-number-format';

export const Number = ({ value, prefix = '', suffix = '' }) => {
	return value === 0 ? (
		'N/A'
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
