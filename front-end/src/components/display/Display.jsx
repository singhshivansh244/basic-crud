import './display.css'

export default function Display(props) {
  return (
    <div className='container-display'>
        <div className='username same-style'>{props.data.username}</div>
        <div className='email same-style'>{props.data.email}</div>
        <div className='phone same-style'>{props.data.phone}</div>
        <div className='image same-style'>{props.data.imageData !== '' ? <a href={`http://localhost:8800/api/records/${props.data.imageData}`}>{props.data.imageData} </a> : 'No upload'}</div>
    </div>
  )
}
