import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserId } from 'redux/global/globalSlice';
import { Props, State } from './ErrorBoundary.types';
import ServerError from 'utils/errors/ServerError';

function HooksProvider({ children }: { children: React.ReactElement }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ErrorBoundary dispatch={dispatch} navigate={navigate}>
      {children}
    </ErrorBoundary>
  );
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;

    if (error instanceof ServerError) {
      const onClose = () => {
        this.setState({ error: null });
        this.props.navigate('/');
        // this.props.dispatch(setUserId(null));
        // localStorage.removeItem('token');
      };

      return (
        <Modal
          open={!!error}
          dialogTitle={error.message}
          onClose={onClose}
          onConfirm={onClose}
        />
      );
    } else {
      throw new Error(error.message);
    }
  }
}

export default HooksProvider;
