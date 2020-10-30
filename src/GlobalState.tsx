import React from "react";

export interface State {
  popSize: number;
  minDepth: number;
  maxDepth: number;
  location: string;
  theme: string;
}

export interface Action {
  type: string;
  value: string;
}

const initialState: State = {
  popSize: 24,
  minDepth: 0,
  maxDepth: 12,
  location: "welcome",
  theme: "dark",
};

const rootReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_POP_SIZE":
      return {
        ...state,
        popSize: +action.value,
      };
    case "SET_MIN_DEPTH":
      return {
        ...state,
        minDepth: +action.value,
      };
    case "SET_MAX_DEPTH":
      return {
        ...state,
        maxDepth: +action.value,
      };
    case "SET_LOCATION":
      return {
        ...state,
        location: action.value,
      };
    case "SET_THEME":
      return {
        ...state,
        theme: action.value,
      };
    default:
      throw new Error("Invalid action");
  }
};

const StateContext = React.createContext(initialState);
const DispatchContext = React.createContext((a: Action) => {});

const StateProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const setLocation = (dispatch: React.Dispatch<Action>, value: string) =>
  dispatch({ type: "SET_LOCATION", value });

export const setPopSize = (dispatch: React.Dispatch<Action>, value: string) =>
  dispatch({ type: "SET_POP_SIZE", value });

export const setMinDepth = (dispatch: React.Dispatch<Action>, value: string) =>
  dispatch({ type: "SET_MIN_DEPTH", value });

export const setMaxDepth = (dispatch: React.Dispatch<Action>, value: string) =>
  dispatch({ type: "SET_MAX_DEPTH", value });

export const setTheme = (dispatch: React.Dispatch<Action>, value: string) =>
  dispatch({ type: "SET_THEME", value });

export { StateProvider, DispatchContext, StateContext };
