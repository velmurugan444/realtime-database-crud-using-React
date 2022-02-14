import './App.css';
import React,{useState,useEffect} from 'react';
import { db } from './files/firebase';

function App() {
  const [task, settask] = useState('');
  const [updatedvalue, setupdatedvalue] = useState('');
  const [taskdata, settaskdata] = useState([]);

  useEffect(() => {
    db.ref("data").child("tasks").on('value',(snapshot)=>{
      let newdata=[];
      snapshot.forEach(data=>{
        newdata.push({
          id:data.key,
          task:data.val(),
        });
      })
      settaskdata(newdata);
    })
  }, [])
  

  const handleSubmit = (e)=>{
      e.preventDefault(); 
      if(task === ""){
        alert("please enter task");
      }else{
        db.ref("data").child("tasks").push({task:task}).then(()=>{
          alert("data inserted successfully");
          settask('');
        }).catch((error)=>{
          console.log(error);
        })
      }
  }

  const updateTask = (id)=>{
    if(updatedvalue === ""){
      alert("please enter updated value");
    }else{
      db.ref("data").child(`tasks/${id}`).update({task:updatedvalue}).then(()=>{
        setupdatedvalue("");
      })
    }
  }
  return (
    <div className="App">
     <h1>REALTIME CRUD USING REACT</h1>
     <br/><br/>
     <input type="text"placeholder='Enter Task'value={task}onChange={(e)=>settask(e.target.value)} />
     <br/><br/>
     <button onClick={handleSubmit}>Submit</button>
     <br/><br/>
     <div>
       {
         taskdata.map((data,index)=>{
           if(data === ""){
             return <p>no datas added yet</p>
           }else{
             return <div key={index}>
               <p>Task: {data.task.task}</p>
               <input type="text"placeholder='enter updated value'value={updatedvalue}onChange={(e)=>setupdatedvalue(e.target.value)} />
               &nbsp;
               <button onClick={()=>updateTask(data.id)}>Update</button>
               <br/>
               <p>Delete : <a onClick={()=>{db.ref("data").child("tasks").child(data.id).remove()}}><i className='fa fa-trash'></i></a></p>
             </div>
           }
         })
       }
     </div>
    </div>
  );
}

export default App;
