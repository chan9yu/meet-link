import { style } from '@vanilla-extract/css';

export const container = style({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '50px',
	marginTop: '60px'
});

export const title = style({
	fontSize: '32px',
	fontWeight: '600'
});

export const wrapper = style({
	display: 'flex',
	gap: '20px'
});

export const form = style({
	width: '300px',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	margin: 'auto'
});

export const label = style({
	fontSize: '18px'
});

export const input = style({
	padding: '4px 8px'
});

export const button = style({
	padding: '4px 8px',
	cursor: 'pointer'
});
