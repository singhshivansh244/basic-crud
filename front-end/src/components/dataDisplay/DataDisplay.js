import {useState, useEffect} from 'react'
import './dataDisplay.css'
import Display from '../display/Display'
export default function DataDisplay() {
  const [record, setRecord] = useState([]);

  const handleFetch = async () => {
    const data = await fetch('http://localhost:8800/api/records/allRecord').then(res => res.json());
    setRecord(prev => data);
  }

  useEffect(() => {
    handleFetch();
  }, [])

  const handleEdit = async () => {
    let data = {
      "username": document.getElementById('username').value,
      "email": document.getElementById('email').value,
      "phone": document.getElementById('phone').value,
      "ImageData": document.getElementById('upload').value,
    }
    await fetch(`http://localhost:8800/api/records/${document.getElementById('username').value}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    handleFetch();
  }

  return (
    <div className='container-dataDisplay'>
        <button className='btn-edit button' onClick={() => handleEdit()}>Edit Data</button>
        <button className='btn-fetch button' onClick={() => handleFetch()}>Fetch Data</button>
        <div className='first-row'>
          <div className='box'>Username</div>
          <div className='box'>Email</div>
          <div className='box'>Phone No.</div>
          <div className='box'>Image Link</div>
        </div>
        {
          record.map(rec => <Display key={rec._id} data={rec} />)
        }
    </div>
  )
}
