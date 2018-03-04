import React from 'react';
import { connect } from 'dva';
import MyForm from '../components/form';

function myForm() {
  return (
      <MyForm />
  );
}

export default connect()(myForm);
