
import editIcon from '../icons/edit.svg'
import './EditButton.css'

export default function EditButton ({onClick}: {onClick: () => void}) {
	return <button className='editButton' onClick={onClick}>
		<img src={editIcon} alt='edit'/>
		</button>
}