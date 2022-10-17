import React from 'react';
import {connect} from 'react-redux';

export function Message(props) {//Comes from reducer after being dispatched
  return <div id="message">{props.infoMessage}</div>
}
export default connect(str=> str) (Message);
