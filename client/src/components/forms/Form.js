import styles from './Form.module.scss'
import Icon from '../Icon'
import { useContext, useState } from 'react'
import { TreeContext } from '../../store/ContextProvider'
/**
 * Form with and input field that will handle either add or edit file
 * depending on what action we prop down to this component
 */

const Form = ({ formHandler, file, action, type }) => {
  const ctx = useContext(TreeContext)
  const [newFileName, setNewFileName] = useState('')

  const setFileNameHandler = (data) => {
    const name = data.replaceAll('/', '')
    setNewFileName(name)
  }

  const editHandler = (e) => {
    e.preventDefault()
    if (newFileName.length < 1) return
    switch (action) {
      case 'add':
        fetch('/api/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: file.currentPath,
            name: type === 'folder' ? newFileName + '/' : newFileName,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            formHandler('add')
            if (data.message) {
              console.log(data.message)
              return
            }
            ctx.setTreeHandler(data)
          })
        break
      case 'edit':
        fetch('/api/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            oldPath: file.currentPath,
            newPath: newFileName,
            type: file.type,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            ctx.setTreeHandler(data)
            formHandler('edit')
          })
        break
      default:
        break
    }
  }

  return (
    <div className={styles.center}>
      <Icon data={type ? type : file.type} />
      <form className={styles.form}>
        <input
          className={styles.input}
          placeholder={file.name}
          type='text'
          onChange={(e) =>
            setTimeout(() => {
              setFileNameHandler(e.target.value)
            }, 100)
          }
        />
        <button onClick={(e) => editHandler(e)}>save</button>
      </form>
    </div>
  )
}

export default Form
