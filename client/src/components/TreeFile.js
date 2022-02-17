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
  const [showChildren, setshowChildren] = useState(false)
  // State for open menu on right click
  const [showMenu, setshowMenu] = useState(false)
  // State for adding the edit field when renaming a file/folder
  const [showEdit, setshowEdit] = useState(false)
  // State for checking what type of file for icon
  const [fileType, setFileType] = useState('')
  // State for adding the input fieldn when creating an folder/file
  const [showAddForm, setShowAddForm] = useState(false)
  // Ref for the div we need to add eventlistener to for overriding the browser right click event.
  const item = useRef()

  const handleMenu = (e) => {
    e.preventDefault()
    setshowMenu((prev) => !prev)
  }

  const handleClick = () => {
    showMenu && setshowMenu(false)
  }

  const formHandler = (action) => {
    switch (action) {
      case 'edit':
        setshowEdit((prev) => !prev)
        break
      case 'add':
        setShowAddForm((prev) => !prev)

        break
      default:
        break
    }
  }
  const showMenuHandler = () => {
    setshowMenu((prev) => !prev)
  }

  const handleEdit = () => {
    setshowEdit(true)
  }
  const handleAddFile = (data) => {
    console.log(data)
    setFileType(data)
    setShowAddForm(true)
    setshowChildren(true)
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
            if (file.type !== 'folder') return
            setshowChildren((prev) => !prev)
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
          onClick={() => setshowMenu(false)}
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
        {showEdit ? (
          <Form file={file} formHandler={formHandler} action='edit' />
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
