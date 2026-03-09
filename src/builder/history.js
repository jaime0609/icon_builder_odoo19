import { useReducer, useCallback } from 'react';
import { MAX_HISTORY } from './constants.js';

function historyReducer(state, action) {
  switch (action.type) {
    case 'COMMIT': {
      return {
        past: [...state.past, state.present].slice(-MAX_HISTORY),
        present: action.shapes,
        future: [],
      };
    }
    case 'UNDO': {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    }
    case 'REDO': {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
      };
    }
    case 'RESET': {
      return { past: [], present: action.shapes, future: [] };
    }
    default:
      return state;
  }
}

export function useHistory(initialShapes = []) {
  const [history, dispatch] = useReducer(historyReducer, {
    past: [],
    present: initialShapes,
    future: [],
  });

  const commit = useCallback((shapes) => {
    dispatch({ type: 'COMMIT', shapes });
  }, []);

  const undo = useCallback(() => dispatch({ type: 'UNDO' }), []);
  const redo = useCallback(() => dispatch({ type: 'REDO' }), []);
  const reset = useCallback((shapes) => dispatch({ type: 'RESET', shapes }), []);

  return {
    shapes: history.present,
    commit,
    undo,
    redo,
    reset,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
}
