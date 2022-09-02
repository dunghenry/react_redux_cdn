import TodoItem from './TodoItem.js';
import TodoForm from './TodoForm.js';
const {useDispatch, useSelector} = ReactRedux
let template = `
<div>
    <TodoForm/>
    {
        loading ? <h2>Loading...</h2> : <>
            {
                todos.map((todo) =>{
                    return <TodoItem key={todo._id} todo={todo} />
                })
            }
        </>
    }
</div>
`;

function TodoList(){
    const {todos, loading} = useSelector(state => state.todoReducer);
    return(
        eval(Babel.transform(template, { presets: ['es2017', 'react'] }).code)
    )
}
export default TodoList;