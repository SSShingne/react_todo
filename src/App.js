/**
 * Let's make it so our checkbox can actually mark our todo as complete or incomplete!
 * This challenge is a little more involved than some of the past ones. Check the comments 
 * in the code for some help on accomplishing this one
 * 
 * Challenge: 
 * 1. Create an event handler in the App component for when the checkbox is clicked (which is an `onChange` event)
 *    a. This method will be the trickest part. Check the comments in the stubbed-out method below for some pseudocode to help guide you through this part
 * 2. Pass the method down to the TodoItem component
 * 3. In the TodoItem component, make it so when the `onChange` event happens, it calls the `handleChange` method and passes the id of the todo into the function
 */

 import React from "react"
 import TodoItem from "./TodoItem"
 import todosData from "./todosData"
 
 class App extends React.Component {
     constructor() {
         super()
         this.state = {
             todos: todosData,
             newItem:""
         }
         this.handleChange = this.handleChange.bind(this)
         this.handleInput = this.handleInput.bind(this)
         this.addTodo = this.addTodo.bind(this)
         
     }
     addTodo(){
         this.setState(prev=>{
            prev.todos.push({id:(prev.todos.length +1),
                text:this.state.newItem,completed:false})
            prev.newItem=""
            return{
                 todos:prev.todos
            }
         })
     }
     handleChange(id) {
         this.setState(prevState => {
             const updatedTodos = prevState.todos.map(todo => {
                 if (todo.id === id) {
                     todo.completed = !todo.completed
                     
                 }
                 return todo
             })
             return {
                 todos: updatedTodos
             }
         })
     }
     handleInput(event){
         this.setState({newItem:event.target.value})
     }
     
     render() {
         const todoItems = this.state.todos.slice(0).reverse().filter(item=>item.completed===false).map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange}/>)
         const done= this.state.todos.slice(0).reverse().filter(item=>  item.completed===true).map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange}/>)
         return (
             <div className="todo-list">
                 <input name="item" value={this.state.newItem} onChange={this.handleInput} />
                 <button onClick={this.addTodo}>add</button>
                 {todoItems}
                 {done}
             </div>
         )    
     }
 }
 
 export default App