import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToList,
  removeFromPendingList,
  markComplete,
  removeFromCompletedList,
  editPendingListTask,
} from '../redux-toolkit/todoSlice'


const Todo = () => {

  const dispatch = useDispatch()
  const [task, setTask] = useState('')
  const pendingList = useSelector((state) => state.todo.pendingList)
  const completedList = useSelector((state) => state.todo.completedList)
  const [selected, setSelected] = useState('All')
  const [edit, setEdit] = useState({ id: '', title: '' })

  
  return (
    <div class="container mt-5">
      <div>
        <div class="row container d-flex justify-content-center">
          <div class="col-md-12">
            <div class="bg-dark card px-3">
              <div class="card-body">
                <div class="add-items d-flex">
                  <input
                    onChange={(e) => setTask(e.target.value)}
                    type="text"
                    class="form-control todo-list-input mb-2 text-white bg-transparent border-0 border-bottom border-secondary"
                    placeholder="Whats need to be done"
                    value={task}
                  />
                  <button
                    disabled={!task}
                    onClick={() => {
                      dispatch(addToList(task))
                      setTask('')
                    }}
                    class="add btn btn-outline-info border-0 border-left text-white font-weight-bold"
                  >
                    Add
                  </button>
                </div>

                <div class="list-wrapper">
                  <nav aria-label="breadcrumb my-2">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item active">
                        <a 
                        className={selected === "All" ? "text-white p" : "text-secondary p"} 
                        onClick={() => setSelected("All")}> 
                        View All
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a onClick={() => setSelected("Pending")}
                        className={selected === "Pending" ? "text-white p" : "text-secondary p"}>active</a>
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        <a onClick={() => setSelected("Completed")}
                        className={selected === "Completed" ? "text-white p" : "text-secondary p"}>Completed</a>
                      </li>
                    </ol>
                  </nav>

                  <ul class="pt-3">
                    {(selected === 'Pending' || selected === 'All') &&
                      pendingList.map((l) => (
                        <div class="pb-2 d-flex row border-bottom border-secondary">
                          <div key={l.id} className="col-md-5">
                            <i
                              onClick={() => dispatch(markComplete(l.id))}
                              className="fa fa-check-circle text-secondary ml-2"
                            ></i>
                            {edit.id !== l.id && (
                              <span class="form-check-label h5">{l.title}</span>
                            )}
                            {edit.id === l.id && (
                              <input
                                type="text"
                                class="form-check-label bg-transparent text-white border-0"
                                value={edit.title}
                                onChange={(e) =>
                                  setEdit({ ...edit, title: e.target.value })
                                }
                              />
                            )}
                          </div>
                          {edit.id !== l.id && (
                            <>
                              <div className="col-md-5">
                                <i
                                  onClick={() =>
                                    dispatch(removeFromPendingList(l.id))
                                  }
                                  className="fa fa-trash mx-1 px-2"
                                ></i>
                                <i
                                  onClick={() => setEdit(l)}
                                  className="fa fa-pencil-square-o mx-2"
                                ></i>
                              </div>
                            </>
                          )}
                          {edit.id === l.id && (
                            <>
                              <div className="col-6">
                                <i
                                  onClick={() => {
                                    dispatch(editPendingListTask(edit));
                                    setEdit({});
                                  }}
                                  className="fa fa-save ml-2"
                                ></i>
                                <i
                                  onClick={() => setEdit({})}
                                  // className="fa fa-ban ml-2"
                                ></i>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    {(selected === 'Completed' || selected === 'All') &&
                      completedList.map((l) => (
                        <div class="pb-2 d-flex row">
                          <div key={l.id} className="col-6">
                            <i
                              style={{ color: '#bbff99' }}
                              class="pr-2 fa fa-circle-check"
                            ></i>
                            <span
                              style={{ color: '#bbff99' }}
                              class="form-check-label"
                            >
                              <s style={{ color: '#77ff33' }}> {l.title}</s>
                            </span>
                          </div>
                          <div className="col-6">
                            <i
                              onClick={() =>
                                dispatch(removeFromCompletedList(l.id))
                              }
                              className="fa fa-trash"
                            ></i>
                          </div>
                        </div>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
