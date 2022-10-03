import './dataEntry.css'

//leftView

export default function DataEntry() {

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    let data = {
      "username": document.getElementById('username').value,
      "email": document.getElementById('email').value,
      "phone": document.getElementById('phone').value,
      "ImageData": document.getElementById('upload').value,
    }
    const myData = await fetch('http://localhost:8800/api/records/add', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json());
    console.log(myData);
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
        <input type="text" id='username' placeholder='Enter Unique username' className='input-text' />
      </div>
      <div className="Email same-in-all">
        <h2>Email<sup>*</sup></h2>
        <input type="email" id='email' placeholder='Enter Unique email' className='input-text' />
      </div>
      <div className="Phone same-in-all">
        <h2>Phone</h2>
        <input type="number" id='phone' placeholder='Enter min 10 digit' className='input-text' />
      </div>
      <div className="Multi-image same-in-all">
        <form method="post" enctype="multipart/form-data">
          <label for="imageData" style={{fontWeight: 'bold', fontSize: '1.2rem'}}>Multi Image upload</label>
          <input type="file" name="imageData" multiple id='upload' className='input-image' />
        </form>
      </div>
      <div className='btn-container'>
        <input className='btn submit' type="submit" value="submit" onClick={(e) => handleDataSubmit(e)} />
        <input className='btn delete' type="button" value="Delete" onClick={(e) => handleDataDelete(e)} />
      </div>
    </div>
  )
}
