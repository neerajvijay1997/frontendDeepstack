import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";




function App() {


  let [responseData, setResponseData] = useState([])


  const fetchdata = () => {
    axios.get('http://localhost:8000/')
      .then(function (response) {
        setResponseData(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }


  useEffect(fetchdata, [])

  console.log(responseData)




  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const onSubmit = (data) => {

    console.log(data)
    axios.post('http://localhost:8000/', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  const deleteTodo = async (id) => {

    console.log(id)
    const data = { "id": id }
    axios.post('http://localhost:8000/delete', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    fetchdata()

  }

  const [editing, setEditing] = useState(null);






  return (
    <div>
      Basic todo
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="number" name="id" {...register("id")} />
        <input type="text" name="title" {...register("title")} />
        <input type="text" name="body" {...register("body")} />
        <input type="submit" />
      </form>
      {responseData.map((i) => {
        return (<div >
          {i.id}- {i.title}-{i.body}
          <button onClick={() => deleteTodo(i.id)} > Delete</button>
          <button > update</button>

        </div>)
      })
      }
    </div>
  );
}

export default App;
