import { easing, Slide, useScrollTrigger } from '@mui/material';

interface Props {
  children: React.ReactElement;
}

export default function HideOnScroll({ children }: Props) {
  const trigger = useScrollTrigger({
    target: window ? window : undefined,
  });

  return (
    <Slide
      appear={false}
      direction="down"
      in={!trigger}
      easing={{
        enter: easing.easeOut,
        exit: easing.easeIn,
      }}
    >
      {children}
    </Slide>
  );
}
