const { useSelector, useDispatch } = ReactRedux;
let template = `
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title: </label>
                {
                    isUpdate ? <input type="text" value={ti} onChange={(e) =>dispatch({
                        type: "CHANGE_TITLE",
                        payload: e.target.value
                    })}/> :  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                }
            </div>
            <br/>
            <div>
                <label>Des:&nbsp;&nbsp;</label>
                {
                    isUpdate ? <input type="text" value={de} onChange={(e) =>dispatch({
                        type: "CHANGE_DESCRIPTION",
                        payload: e.target.value
                    })}/> : <input type="text" value={des} onChange={(e) => setDes(e.target.value)}/>
                }
            </div>
            <br/>
            <div>
            {
                isUpdate ? <><button type="button" style={{cursor: 'pointer'}} onClick={handleUpdate}>Update todo</button>&nbsp;&nbsp;&nbsp;<button type="button" style={{cursor: 'pointer'}} onClick={handleDestroyUpdate}>&nbsp;x&nbsp;</button> </> : <> <button type="submit" style={{cursor: 'pointer'}}>Add todo</button></>
            }
            </div>
        </form>
        <br/>
    </div>

`;
function TodoForm() {
  const [title, setTitle] = React.useState("");
  const [des, setDes] = React.useState("");
  const { isUpdate, ti, de, idUpdate } = useSelector(
    (state) => state.todoReducer
  );
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && des) {
      dispatch({
        type: "ADD_TODO",
        payload: {
          _id: String(Math.floor(Math.random() * 1000000 - 999)),
          title,
          description: des,
          completed: false,
        },
      });
      setTitle("");
      setDes("");
    } else {
      alert("Please enter a title and des");
    }
  };
  const handleDestroyUpdate = () => {
    dispatch({
      type: "DESTROY_UPDATE_TODO",
    });
  };
  const handleUpdate = () => {
    dispatch({
      type: "UPDATE_TODO_SUCCESS",
      payload: {
        ti,
        de,
        idUpdate,
      },
    });
  };
  return eval(Babel.transform(template, { presets: ["es2015", "react"] }).code);
}
export default TodoForm;
