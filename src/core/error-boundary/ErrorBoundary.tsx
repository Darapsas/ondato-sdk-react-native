import React, { Component, ReactNode } from 'react';
import { View } from 'react-native';
import { flex1 } from '../../theme/common';

interface State {
  hasError: boolean;
}

interface Props {
  children: ReactNode;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: false };
  }

  render() {
    const { children } = this.props;
    return <View style={flex1}>{children}</View>;
  }
}

export default ErrorBoundary;
