import './dataEntry.css'
import {useState} from 'react'

//leftView

export default function DataEntry() {

  const [fileData, setFileData] = useState([]);

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    if(!document.getElementById('username').value.trim()){
      alert('Please enter username');
      return;
    }
    if(!document.getElementById('email').value){
      alert('Please enter email');
      return;
    }
    const data = new FormData();

    for(let i = 0; i < fileData.length; i++){
      data.append('images', fileData[i]);
    }
    data.append('image', fileData);
    setFileData('');
    console.log(fileData);

    await fetch('http://localhost:8800/api/records/uploadImage', {
      method: "POST",
      body: data
    }).then(res => console.log('File uploaded successfully'))
      .catch(err => console.log(err.message))

    let info = {
      "username": document.getElementById('username').value,
      "email": document.getElementById('email').value,
      "phone": document.getElementById('phone').value,
      "imageData": fileData.name,
    }
    await fetch('http://localhost:8800/api/records/add', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    }).then(res => res.json());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const data = new FormData();

    // // for(let i = 0; i < fileData.length; i++){
    // //   data.append('images', fileData[i]);
    // // }
    //   data.append('image', fileData);
    // setFileData([]);
    // // console.log(fileData);

    // await fetch('http://localhost:8800/api/records/add', {
    //   method: "POST",
    //   body: data
    // }).then(res => console.log('File uploaded successfully'))
    // .catch(err => console.log(err.message))

  }

  const handleChange = (e) => {
    for(let i = 0; i < e.target.files.length; i++){
      setFileData(prev => [...prev, e.target.files[i]]);
    }
  }

  const handleDataDelete = async (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;

    await fetch(`http://localhost:8800/api/records/${user}`, {
      method: "DELETE"
    })
  }

  return (
    <div className='container-dataEntry'>
      <div className="Username same-in-all">
        <h2>Username<sup>*</sup></h2>
        <input type="text" id='username' required placeholder='Enter Unique username' className='input-text' />
      </div>
      <div className="Email same-in-all">
        <h2>Email<sup>*</sup></h2>
        <input type="email" id='email' required placeholder='Enter Unique email' className='input-text' />
      </div>
      <div className="Phone same-in-all">
        <h2>Phone</h2>
        <input type="number" id='phone' placeholder='Enter min 10 digit' className='input-text' />
      </div>
      <div className="Multi-image same-in-all">
        <form onSubmit={handleSubmit}>
          <label for="imageData" style={{fontWeight: 'bold', fontSize: '1.2rem'}}>Multi Image upload</label>
          <input type="file" name="images" multiple id='upload' className='input-image' onChange={handleChange} />
        </form>
      </div>
      <div className='btn-container'>
        <input className='btn submit' type="submit" value="submit" onClick={(e) => handleDataSubmit(e)} />
        <input className='btn delete' type="button" value="Delete" onClick={(e) => handleDataDelete(e)} />
      </div>
    </div>
  )
}
