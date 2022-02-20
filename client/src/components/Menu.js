import styles from './Menu.module.scss'
import { useContext } from 'react'
import { TreeContext } from '../store/ContextProvider'

/**
 * Right click menu component.
 * When user right click on a file/folder they will trigger this
 * component to render.
 */

const Menu = ({ file, edit, addFile, setMenu }) => {
  const ctx = useContext(TreeContext)

  const deleteFile = () => {
    fetch('/api/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: file.currentPath, type: file.type }),
    })
      .then((res) => res.json())
      .then((data) => ctx.setTreeHandler(data))
  }

  return (
    <div className={styles.menu}>
      <div className={styles.list}>
        {file.type === 'folder' && (
          <>
            <button
              onClick={() => {
                addFile('file')
                setMenu()
              }}
            >
              new File
            </button>
            <button
              onClick={() => {
                setMenu()
                addFile('folder')
              }}
            >
              new Folder
            </button>
          </>
        )}

        <button
          onClick={() => {
            setMenu()
            deleteFile()
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            setMenu()
            edit()
          }}
        >
          Edit
        </button>
      </div>
    </div>
  )
}

export default Menu
