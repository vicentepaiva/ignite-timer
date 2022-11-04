import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesDuration: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      // return {
      //     ...state,
      //     cycles: [...state.cycles, action.payload.newCycle],
      //     activeCycleId: action.payload.newCycle.id
      // }
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //     ...state,
      //     cycles: state.cycles.map((cycle) => {
      //         if (cycle.id === state.activeCycleId) {
      //             return { ...cycle, interruptedDate: new Date() }
      //         } else {
      //             return cycle
      //         }
      //     }),
      //     activeCycleId: null
      // }
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      // eslint-disable-next-line no-unused-expressions
      currentCycleIndex < 0 && state
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case ActionTypes.SET_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      // eslint-disable-next-line no-unused-expressions
      currentCycleIndex < 0 && state
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }
    default:
      return state
  }
}
