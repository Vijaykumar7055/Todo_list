import React, { useState,useEffect } from 'react';
import './todu.css'

const getLocalData=()=>{
    const lists=localStorage.getItem("mytodolist");

    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}
const Todu = () => {
    const [inputdata,setinputdata]= useState("");
    const [items,setItems]=useState(getLocalData())
    const [isEditItem,setIsEditItem]=useState("");
    const [toggleButton ,setToggleBotton]=useState(false);

    const addItem=()=>{
        if(!inputdata){
            alert("plz fill the data");
        }
        else{
            const myNewInputData={
                id:new Date().getTime().toString(),
                name:inputdata,
            };
            setItems([...items,myNewInputData]);
            setinputdata("");
        }
    }


    const editItem=(index)=>{
const item_dodo_edit=items.find((curEle)=>{
return curEle.id===index;
});

setinputdata(item_dodo_edit.name)
setIsEditItem(index);
setToggleBotton(true)

    }

const deleteItem=(index)=>{
const updatedItem=items.filter((curEle)=>{
return curEle.id!==index;
});

setItems(updatedItem);
};





const removeAll=()=>{
setItems([]);
}



// adding local storage

useEffect(()=>{
localStorage.setItem("mytodolist",JSON.stringify(items));
},[items]);


  return (

    <>
      <div className="main-container">
        <div className="child-container">
            <figure>
                <img src="./download.png" alt="" />
                <figcaption>Here you can Write anything </figcaption>
            </figure>
            <div className="AddItems">
                <input type="text " placeholder='✍✍ Write Quetos' className='form-control' 
                value={inputdata} 
                onChange={(event)=>setinputdata(event.target.value)}/>
                
                <i class="fa-solid fa-arrow-right"  onClick={addItem}></i>
                </div>  

            <div className="show-items">

             {items.map((curEle,index)=>{
                return(
                    <div className="EachItem" key={index}>
                    <h4>{curEle.name}</h4>
                   
                    <div className="todo-btn" >
                    <i class="fa-solid fa-trash" onClick={()=>{deleteItem(curEle.id)}}></i>
                    
                    <i class="fa-solid fa-edit"  onClick={()=>editItem(curEle.id)}></i>
                    </div>
                </div>
                )
             })}   
               
            </div>



                <div className="show-tems">
                    <button className='btn-effect' data-sm-link-text="remove All" onClick={removeAll}>Delete All</button>
                </div>
              </div>
      </div>
    </>
  )
}

export default Todu
