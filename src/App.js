import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card,Dropdown } from 'react-bootstrap';
import "./App.css"

function App() {
  const [productList, setProductList] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [filteredProductList, setFilteredProductList] = useState([]);
console.log(useState())
  const addTodo = () => {
    //console.log("0")
    const newProduct = {
      name,
      description,
      status: 'Not Completed',
      show: true
    };
    setProductList([...productList, newProduct]);
    setFilteredProductList([...productList, newProduct]);
    console.log(newProduct);
    setName('');
    setDescription('');
    
  };
  console.log('==productList', productList)
    console.log('==filteredProductList',  filteredProductList)
  const updateStatus = (index, newStatus) => {
    const updatedProductList = [...productList];
  
    updatedProductList[index].status = newStatus;
    setProductList(updatedProductList);
    
  };
  const show = (id) => {
    const updatedCart = filteredProductList.filter((product) => product !== id);
    setFilteredProductList(updatedCart);
    console.log(updatedCart);
  };
  function filter  (selectedStatus)  {
    console.log('==productList', productList)
    console.log('==filteredProductList',  filteredProductList)
    if (selectedStatus === 'All') {
      // Show all todos
      setFilteredProductList(productList);
    } else {
      // Filter todos based on the selected status
      const filteredList = productList.filter((product) => product.status === selectedStatus);
      setFilteredProductList(filteredList);
    }
  };
  return (
    <div className="App">
      <Heading
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        addTodo={addTodo}
      />
      <List filter={filter}/>
      <TextExample filteredProductList={filteredProductList} updateStatus={updateStatus} show={show} />
    </div>
  );
}

function Heading({ name, setName, description, setDescription, addTodo }) {
  return (
    <div className="todo">
      <div>
        <h3>My todo</h3>
      </div>
      <div>
        <span className="name">
          <input
            className="name1"
            type="text"
            placeholder="Todo Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          <input
            className="name2"
            type="text"
            placeholder="Todo Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></input>
          <button type="button" className="btn btn-success" onClick={addTodo}>
            Add ToDo
          </button>
        </span>
      </div>
    </div>
  );
}



function TextExample({ filteredProductList,updateStatus,show }) {
  return (
    <div className="display">
      {filteredProductList && filteredProductList.map((product, index) => (
        <Card key={index} style={{ width: '18rem', marginBottom: '10px' }} className='card'>
          <Card.Body>
            <Card.Text>
              Todo Name: {product.name} <br />
              Todo Description: {product.description} <br />
              Todo Status:  <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {product.status}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => updateStatus(index, 'Completed')}>
                    Completed
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => updateStatus(index, 'Not Completed')}>
                    Not Completed
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown><br />
              <span className='btn'>
              <button type="button" className="btn btn-primary" > Edit </button>
              <button type="button" className="btn btn-danger" onClick={()=> show(product)} >Delete </button>

              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
function List({ filter }) {
  return (
    <div className='list'>
      <span className='li'>
        <h4>My Todos</h4>
        <h4>
          Status Filter: 
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              All
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => filter('All')}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => filter('Completed')}>
                Completed
              </Dropdown.Item>
              <Dropdown.Item onClick={() => filter('Not Completed')}>
                Not Completed
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </h4>
      </span>
    </div>
  );
}
export default App;
