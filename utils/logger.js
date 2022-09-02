function logger(reducer){
    return (prevState, action) =>{
        console.group(action.type);
        console.log(action);
        console.log("PrevState: ", prevState);
        const newState = reducer(prevState, action);
        console.log("NewState", newState);
        console.groupEnd();
        return newState;
    }
}
export default logger;