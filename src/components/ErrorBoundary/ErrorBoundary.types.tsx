import { NavigateFunction } from 'react-router-dom';
import { useDispatch } from 'react-redux';

type DispatchType = ReturnType<typeof useDispatch>;

export type Props = {
  children: React.ReactElement;
  dispatch: DispatchType;
  navigate: NavigateFunction;
};

export type State = {
  error: Error | null;
};
