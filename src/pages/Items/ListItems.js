import React from 'react';
import { connect } from 'react-redux';

const ListItems = ({ items }) => items.docs.map(item => (
  <div>
    {item.product}
  </div>
));

export default connect(
  ({ items }) => ({ items }),
)(ListItems);
