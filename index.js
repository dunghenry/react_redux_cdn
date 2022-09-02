// import App from './App.js'
import Navbar from './components/Navbar.js';
import TodoList from './components/TodoList.js';
import logger from './utils/logger.js';
const { Provider } = ReactRedux;
// const {applyMiddleware, compose} = Redux;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose;
const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);
const initialState = {
    todos: [],
    loading: false,
    error: false,
    isUpdate: false,
    ti: '',
    de: '',
    idUpdate: undefined,
}
function todoReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_DATA":
            return {
                ...state,
                todos: action.payload
            }
        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.payload)
            }
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case 'SET_UPDATE_TODO':
            console.log(action.payload)
            const {title, description} = state.todos.find(todo => todo._id === action.payload)
            return {
                ...state,
                isUpdate: true,
                idUpdate: action.payload,
                ti: title,
                de: description
            }
        case 'DESTROY_UPDATE_TODO':
            return {
                ...state,
                ti: '',
                de: '',
                isUpdate: false,
                idUpdate: undefined,
            }
            case 'CHANGE_TITLE':
                console.log(action.payload)
                return {
                    ...state,
                    ti: action.payload
                }
            case 'CHANGE_DESCRIPTION':
                return {
                    ...state,
                    de: action.payload
                }
            case 'UPDATE_TODO_SUCCESS':
                    const {ti, de, idUpdate} = action.payload
                    console.log(ti, de, idUpdate)
                return {
                    ...state,
                    todos: state.todos.map(todo =>{
                        if(todo._id === idUpdate){
                            todo.title = ti
                            todo.description = de
                        }
                        return todo;
                    }),
                    isUpdate: false,
                    idUpdate: undefined,
                    ti: '',
                    de: '',
                }
        default:
            return state;
    }
}

const rootReducer = Redux.combineReducers({
    todoReducer
});

const store = Redux.createStore(logger(rootReducer), /* preloadedState, */composeEnhancers)
// const store = Redux.createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
function App(){
    React.useEffect(() => {
        (async () =>{
            try {
                const res = await axios.get('https://express-mongodb-todos.herokuapp.com/api/v1/todos');
                store.dispatch({
                    type: "SET_DATA",
                    payload: res.data
                })
           } catch (error) {
            console.log(error);
           }
        })();
    }, []);
    return (
        <div>
            <h1>Todos App</h1>
            <Navbar data={"Navbar Component"} />
            <TodoList />
        </div>
    )
}
root.render(<Provider store={store}><App /></Provider>);


