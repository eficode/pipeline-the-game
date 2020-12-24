import {Action, ReducersMapObject} from "@reduxjs/toolkit";

function testReducer(state = {}, action: Action) {
  return state;
}

const reducers: ReducersMapObject = {
  test: testReducer
};

export default reducers;
