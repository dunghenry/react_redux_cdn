import Hello from './components/Navbar.js';
import TodoList from './components/TodoList.js';
let template = `
<div>
    <h1>Todos App</h1>
    <TodoList/>
    <Hello data={'hehe'}/>
</div>
`;

function App(){
    return (
        eval(Babel.transform(template, { presets: ['es2017', 'react'] }).code)
    );
}
export default App;

