import { Dispatch, useReducer } from "react";
import "./App.css";

//Define types for the pizza data and state
type PizzaData = {
  numberOfPeople: number;
  slicesPerPerson: number;
  slicesPerPie: number;
};

// Extend PizzaData to include pizzasNeeded
type PizzaState = PizzaData & { pizzasNeeded: number };


//Define the types of actions that can be dispatched
type PizzaAction = {
  type:
    | "UPDATE_NUMBER_OF_PEOPLE"
    | "UPDATE_SLICES_PER_PERSON"
    | "UPDATE_SLICES_PER_PIE";
  payload: number;
};

//Calculate the number of pizzas needed based on the pizza data
const calculatePizzasNeeded = ({
  numberOfPeople,
  slicesPerPerson,
  slicesPerPie,
}: PizzaData): number => {
  return Math.ceil((numberOfPeople * slicesPerPerson) / slicesPerPie);
};

//Add pizzassNeeded to the pizza data and return a new PizzaState object
const addPizzassNeededToPizzaData = (data: PizzaData): PizzaState => {
  return { ...data, pizzasNeeded: calculatePizzasNeeded(data) };
};

//Define the initial state for the pizza calculator
const initialState: PizzaState = {
  numberOfPeople: 8,
  slicesPerPerson: 2,
  slicesPerPie: 8,
  pizzasNeeded: 2,
};


//Reducer function to handle state updates based on dispatched actions
const reducer = (state: PizzaState, action: PizzaAction) => {
  if (action.type === "UPDATE_NUMBER_OF_PEOPLE") {
    return addPizzassNeededToPizzaData({
      ...state,
      numberOfPeople: action.payload,
    });
  }
  if (action.type === "UPDATE_SLICES_PER_PERSON") {
    return addPizzassNeededToPizzaData({
      ...state,
      slicesPerPerson: action.payload,
    });
  }
  if (action.type === "UPDATE_SLICES_PER_PIE") {
    return addPizzassNeededToPizzaData({
      ...state,
      slicesPerPie: action.payload,
    });
  }
  return state;
};

//Component to display the calculated pizza needed
const Calculation = ({ count }: { count: any }) => {
  return (
    <section className="calculation">
      <p className="count">{count}</p>
      <p className="caption">Pizzas Needed</p>
    </section>
  );
};

//Component to handle input fields for the pizza data
const Calculator = ({
  dispatch,
  state,
}: {
  state: PizzaState;
  dispatch: Dispatch<PizzaAction>;
}) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <label htmlFor="number-of-people">Number of people</label>
      <input
        id="number-of-people"
        type="number"
        value={state.numberOfPeople}
        onChange={(event) =>
          dispatch({
            type: "UPDATE_NUMBER_OF_PEOPLE",
            payload: +event.target.value,
          })
        }
      />
      <label htmlFor="slices-per-person">Slices Per Person</label>
      <input
        id="slices-per-person"
        type="number"
        value={state.slicesPerPerson}
        onChange={(event) =>
          dispatch({
            type: "UPDATE_SLICES_PER_PERSON",
            payload: +event.target.value,
          })
        }
      />
      <label htmlFor="slices-per-pie">Slices Per Pie</label>
      <input
        id="slices-per-pie"
        type="number"
        value={state.slicesPerPie}
        onChange={(event) =>
          dispatch({
            type: "UPDATE_SLICES_PER_PIE",
            payload: +event.target.value,
          })
        }
      />
    </form>
  );
};

function App() {
  // Use useReducer hook to manage state using the reducer function
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main className="calculator">
      <header>
        <h1>Pizza Calculator</h1>
      </header>
      <Calculation count={state.pizzasNeeded} />
      <Calculator state={state} dispatch={dispatch} />
    </main>
  );
}

export default App;
