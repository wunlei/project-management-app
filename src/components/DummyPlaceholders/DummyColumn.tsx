import { Box, Stack } from '@mui/material';
import { DummyColumnProps } from './Dummy.types';
import { dummyBlue, dummyGreyTitle, dummyGreyBG } from 'constants/colors';

function DummyColumn(props: DummyColumnProps) {
  const { children, isTitleBlue, boxShadow } = props;
  return (
    <Stack
      padding={2}
      spacing={2}
      sx={{
        width: 280,
        boxShadow,
        backgroundColor: dummyGreyBG,
        borderRadius: '19px',
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 25,
          backgroundColor: isTitleBlue ? dummyBlue : dummyGreyTitle,
          borderRadius: '20px',
        }}
      />
      {children}
    </Stack>
  );
}

export default DummyColumn;
