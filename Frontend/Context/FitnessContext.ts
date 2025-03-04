import React, { createContext, useReducer } from "react";

// Define state type
type StateType = {
  completed: number[];
  workout: number;
  calories: number;
  minutes: number;
};

type ActionType =
  | { type: "ADD_WORKOUT"; payload: number }
  | { type: "ADD_CALORIES"; payload: number }
  | { type: "ADD_MINUTES"; payload: number }
  | { type: "COMPLETE_WORKOUT"; payload: number };
 
type ContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};
const reducer = (state:StateType,action:ActionType) => {
    switch(action.type){
        case "ADD_WORKOUT":
            return {...state,workout:action.payload}
        case "ADD_CALORIES":
            return {...state,calories:action.payload}
        case "ADD_MINUTES":
            return {...state,minutes:action.payload}
        case "COMPLETE_WORKOUT":
            return {...state,completed:[...state.completed,action.payload]}
        default:
            return state
    }
}
// Ensure FitnessItems is properly initialized
export const FitnessItems = createContext<ContextType | undefined>(undefined);

export const FitnessProvider = ({ children }:{ children: React.ReactNode }) => {
  const initialState: StateType = {
    completed: [],
    workout: 0,
    calories: 0,
    minutes: 0,
  };

  const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState);

  return (
    <FitnessItems.Provider value={{ state, dispatch }}>
      {children}
    </FitnessItems.Provider>
  );
};

// export { FitnessItems };
