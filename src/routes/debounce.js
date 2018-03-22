import React from 'react';
import { connect } from 'dva';
import DebounceComponent from '../components/debounceComponent';

function Debounce() {
  return (
    <DebounceComponent />
  );
}

export default connect()(Debounce);
