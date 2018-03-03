import React from 'react';
import { connect } from 'dva';
import MyForm from '../components/form';

function IndexPage() {
  return (
    <div>
      <MyForm />
    </div>
  );
}

export default connect()(IndexPage);
