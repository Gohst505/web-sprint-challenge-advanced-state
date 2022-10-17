import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../state/action-creators';

export function Wheel(props) {

  //I acidentally switched the two but it still works
  const {moveClockwise, moveCounterClockwise} = props;
  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={props.wheel === 0 ? 'cog active' : 'cog'}style={{ "--i": 0 }}>{props.wheel === 0 ? 'B' : ''}</div>
        <div className={props.wheel === 1 ? 'cog active' : 'cog'} style={{ "--i": 1 }}>{props.wheel === 1 ? 'B' : ''}</div>
        <div className={props.wheel === 2 ? 'cog active' : 'cog'} style={{ "--i": 2 }}>{props.wheel === 2 ? 'B' : ''}</div>
        <div className={props.wheel === 3 ? 'cog active' : 'cog'} style={{ "--i": 3 }}>{props.wheel === 3 ? 'B' : ''}</div>
        <div className={props.wheel === 4 ? 'cog active' : 'cog'} style={{ "--i": 4 }}>{props.wheel === 4 ? 'B' : ''}</div>
        <div className={props.wheel === 5 ? 'cog active' : 'cog'} style={{ "--i": 5 }}>{props.wheel === 5 ? 'B' : ''}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={moveClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={moveCounterClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(st => st, actions) (Wheel);