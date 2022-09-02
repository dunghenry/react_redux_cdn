const { createElement: h } = React;
const {useDispatch, useSelector} = ReactRedux
let template = `
<div>
    <h1>Total todos: {todos.length}</h1>
    
</div>
`;
function Navbar(){
    const {todos} = useSelector(state => state.todoReducer);
    // return h('div', {}, 'hello!!');
    return (
        eval(Babel.transform(template, { presets: ['es2017', 'react'] }).code)
    );
}
export default Navbar;

