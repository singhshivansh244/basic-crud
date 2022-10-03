import './display.css'

export default function Display(props) {
  return (
    <div className='container-display'>
        <div className='username same-style'>{props.data.username}</div>
        <div className='email same-style'>{props.data.email}</div>
        <div className='phone same-style'>{props.data.phone}</div>
        <div className='image same-style'>{props.data.imageData !== '' ? props.data.imageData : 'No upload'}</div>
    </div>
  )
}
