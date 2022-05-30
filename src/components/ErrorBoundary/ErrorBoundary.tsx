import { Component } from 'react';
import { Props, State } from './ErrorBoundary.types';
import { Navigate } from 'react-router-dom';

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;

    this.setState({ error: null });

    return <Navigate to="/404" />;
  }
}
