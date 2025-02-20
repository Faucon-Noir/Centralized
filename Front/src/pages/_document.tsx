import { Html, Head, Main, NextScript } from 'next/document';
export default function Document(): JSX.Element {
	return (
		<Html style={{ height: '100%' }}>
			<Head />
			<body
				style={{
					height: '100%',
					margin: 0,
					padding: 0,
				}}
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
