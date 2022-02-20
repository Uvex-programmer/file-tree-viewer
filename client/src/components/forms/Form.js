import styles from './Form.module.scss'
import Icon from '../Icon'
import { useContext, useState } from 'react'
import { TreeContext } from '../../store/ContextProvider'
/**
 * Form with and input field that will handle either add or edit file/folder
 * depending on what action we prop down to this component
 */

const Form = ({ formHandler, file, action, type }) => {
  const ctx = useContext(TreeContext)
  const [fileName, setFileName] = useState('')

  // If its a folder we most add the forward slash at the end. And we remove all forward
  // slashes if a user enters it in the name. Or it will create extra sub folders.
  const createFolderOrFile = (name) => {
    const updatedName = name.replaceAll('/', '')
    return type === 'folder' ? updatedName + '/' : updatedName
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (fileName.length < 1) return
    switch (action) {
      case 'add':
        fetch('/api/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: file
              ? file.currentPath + createFolderOrFile(fileName)
              : createFolderOrFile(fileName),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setFileName('')
            file && formHandler('add')
            if (data.message) {
              alert(data.message)
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
            newPath: fileName,
            type: file.type,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setFileName('')
            file && formHandler('edit')
            if (data.message) {
              alert(data.message)
              return
            }
            ctx.setTreeHandler(data)
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
          placeholder={file ? file.name : ''}
          type='text'
          onChange={(e) => setFileName(e.target.value)}
          value={fileName}
        />
        <button onClick={(e) => submitHandler(e)}>enter</button>
      </form>
    </div>
  )
}

export default Form
