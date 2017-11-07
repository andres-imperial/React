const addTask =(task)=>{
  return {
    type:'ADD_TASK',
    payload:task
  };
}

export const deleteTask = (taskId) => {
  console.log('hello 2');
  return {
    type:'DELETE_TASK',
    payload:taskId
  };
}

export {addTask};
