import "./App.css";
import { Form, Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([])

  const AddFriend = () => {
    Axios.post("http://localhost:3001/addFriend", { name: name, age: age })
    .then(() => {
      setListOfFriends([...listOfFriends, { name: name, age: age }]);
    });
  };

  const updateFriend = (id) => {
    const newAge = prompt("Enter new age:");

    Axios.put("http://localhost:3001/Update", { newAge: newAge, id: id }).then(() => {
      setListOfFriends(listOfFriends.map((val) => {
        return val._id == id ? {_id: id, name:val.name, age: newAge} : val
      } ))
    } )
  };

  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setListOfFriends(listOfFriends.filter((val)=> {
        return val._id != id;
      }))
    } )
  } 

  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((response) => {
        setListOfFriends(response.data)
        console.log(response);
      })
      .catch(() => {
        console.log('ERR');
      });
  },[]);

  return (
    <div
      className="App container "
      style={{ marginTop: "5%", backgroundColor: "skyblue" }}
    >
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Enter The Name Of Your Friend"
          />
          <Form.Text className="text-muted">
            <i> Type The Name Of Your Good Friends </i>
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Age</Form.Label>
          <Form.Control
            onChange={(e) => {
              setAge(e.target.value);
            }}
            type="number"
            placeholder="Enter The Age Of Your Friend"
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox"></Form.Group>
        <Button onClick={AddFriend} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div className="table" >

        {listOfFriends.map((val) => {
          return <> <div>   <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{ val.name }</td>
              <td>{val.age}</td>
              <td> <Button onClick={ () =>{ updateFriend(val._id); } } variant="success" >Update</Button> </td>
              <td> <Button onClick={ () =>{ deleteFriend(val._id); } } variant="danger" >Delete</Button> </td>
            </tr>
          </tbody>
        </Table> </div> </>
               
        

        } )}

    

      </div>
    </div>
  );
}

export default App;
