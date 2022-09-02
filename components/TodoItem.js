const { useDispatch } = ReactRedux;
let template = `
    <div style={{display: 'flex'}}>
        <h2>{todo._id.substr(0, 2)},</h2> &nbsp;&nbsp;&nbsp;
        <h2>{todo.title}</h2>&nbsp;&nbsp;&nbsp;
        <div style={{marginTop: '6px'}}>
            <button style={{cursor: 'pointer', marginRight: '20px'}} onClick={() => handleUpdate(todo._id)}>Update</button>
            <button style={{cursor: 'pointer'}} onClick={() => handleDelete(todo._id)}>Delete</button>
        </div>
    </div>
`;

function TodoItem({ todo }) {
    const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch({
        type: 'DELETE_TODO',
        payload: id
    })
  };
  const handleUpdate = (id) => {
    dispatch({
        type: 'SET_UPDATE_TODO',
        payload: id
    })
  };
  return eval(Babel.transform(template, { presets: ["es2017", "react"] }).code);
}
export default TodoItem;
