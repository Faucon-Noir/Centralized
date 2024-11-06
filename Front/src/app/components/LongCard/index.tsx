import { Box } from '@mui/system';
import { ItemDivStyle } from './style';
import { ReactNode } from 'react';

function LongCard({ children }: { children: ReactNode }) {
	return <Box sx={ItemDivStyle}>{children}</Box>;
}

export default LongCard;
