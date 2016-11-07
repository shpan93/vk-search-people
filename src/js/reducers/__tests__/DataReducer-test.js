import expect from 'expect'
import reducer from '../DataReducer'
import * as types from '../../constants/ActionTypes'
import {INITIAL_STATE} from '../../constants/InitialState'

const sampleEvent = {
  "description": "Meeting with CatWoman",
  "author":'Bruce Wayne',
  "day": '01-09-2016',
  "startDate": '10:30',
  "endDate":'13:30',
  "cuid":"12345"
};
describe('data reducer', () => {
  it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  });

  it('should handle ADD_EVENT', () => {
    expect(
        reducer({
          events:[],
          isNewTaskWidgetOpened: false
        }, {
          type: types.ADD_EVENT,
          event:sampleEvent
        })
    ).toEqual({
      events:[sampleEvent],
      isNewTaskWidgetOpened: false
    });

  })
});
