import { Box, Stack } from '@mui/material';
import { dummyBlue, dummyGreyTitle } from 'constants/colors';

import { DummyTaskProps } from './Dummy.types';

function DummyTask(props: DummyTaskProps) {
  const { isCircleBlue, isTitleBlue } = props;

  return (
    <Stack
      width={250}
      height={100}
      padding={2}
      spacing={1.5}
      sx={{ backgroundColor: '#FFF', borderRadius: '13px' }}
    >
      <Box
        sx={{
          width: 180,
          height: 25,
          backgroundColor: isTitleBlue ? dummyBlue : dummyGreyTitle,
          borderRadius: '20px',
        }}
      />
      <Stack sx={{ width: '100%', alignItems: 'flex-end' }}>
        <Box
          sx={{
            width: 25,
            height: 25,
            backgroundColor: isCircleBlue ? dummyBlue : dummyGreyTitle,
            borderRadius: '50%',
          }}
        />
      </Stack>
    </Stack>
  );
}

export default DummyTask;
