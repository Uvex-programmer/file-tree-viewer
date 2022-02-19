import Icon from './Icon'
import TreeContainer from './TreeContainer'
import styles from './TreeFile.module.scss'
import Menu from './Menu'
import React, { useState, useRef, useEffect } from 'react'
import Form from './forms/Form'

/**
 * File/folder component.
 * here is the most logic on the client side.
 */

const TreeFile = ({ file }) => {
  // State for knowing if a folder is open or not
  const [showChildren, setShowChildren] = useState(false)
  // State for open menu on right click
  const [showMenu, setShowMenu] = useState(false)
  // State for adding the edit field when renaming a file/folder
  const [showEditForm, setShowEditForm] = useState(false)
  // State for checking what type of file for icon
  const [fileType, setFileType] = useState('')
  // State for adding the input fieldn when creating an folder/file
  const [showAddForm, setShowAddForm] = useState(false)
  // Ref for the div we need to add eventlistener to for overriding the browser right click event.
  const item = useRef()

  const handleMenu = (e) => {
    e.preventDefault()
    setShowMenu((prev) => !prev)
  }

  const handleClick = () => {
    showMenu && setShowMenu(false)
  }

  const formHandler = (action) => {
    action === 'add' ? setShowAddForm(false) : setShowEditForm(false)
  }
  const showMenuHandler = () => {
    setShowMenu((prev) => !prev)
  }

  const handleEdit = () => {
    setShowEditForm(true)
  }
  const handleAddFile = (data) => {
    setFileType(data)
    setShowAddForm(true)
    setShowChildren(true)
  }

  const File = () => {
    // Adding event listener to the items so we can open our own menu on right click.
    useEffect(() => {
      item.current.addEventListener('contextmenu', handleMenu)
      item.current.addEventListener('click', handleClick)
    })
    // Variable that changes the css depending on if folder is open or closed.
    const childrenTrue = showChildren ? 'expand' : 'collapse'

    return (
      <>
        <div
          className={styles.header}
          onClick={() => {
            setShowAddForm(false)
            setShowEditForm(false)
            if (file.type !== 'folder') return
            setShowChildren((prev) => !prev)
          }}
          ref={item}
        >
          {file.type === 'folder' && <Icon data={childrenTrue} />}
          <Icon data={file.type} />
          <div className={styles.name}>{file.name}</div>
        </div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      {showMenu && (
        <div
          className={styles.overlay}
          onClick={() => setShowMenu(false)}
        ></div>
      )}

      <div className={styles.header}>
        {showMenu && (
          <Menu
            file={file}
            edit={handleEdit}
            addFile={handleAddFile}
            setMenu={showMenuHandler}
          />
        )}
        {showEditForm ? (
          <Form
            file={file}
            type={fileType}
            formHandler={formHandler}
            action='edit'
          />
        ) : (
          <File />
        )}
      </div>

      {file.type === 'folder' && showChildren && (
        <>
          {showAddForm && (
            <Form
              file={file}
              type={fileType}
              formHandler={formHandler}
              action='add'
            />
          )}
          <TreeContainer data={file.children} />
        </>
      )}
    </div>
  )
}

export default TreeFile
