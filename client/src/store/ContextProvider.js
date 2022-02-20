import React, { useState } from 'react'

/**
 * Added a context provider so we can easily set and update
 * the file tree when we do different updates and so on in different components.
 */
export const TreeContext = React.createContext({
  tree: [],
  setTreeHandler: () => {},
  getTreeHandler: () => {},
})

const TreeCtx = (props) => {
  const [tree, setTree] = useState()

  const setTreeHandler = (data) => {
    setTree(data)
  }

  const getTreeHandler = async () => {
    await fetch('/api', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setTree(data)
      })
  }

  return (
    <TreeContext.Provider
      value={{
        tree: tree,
        setTreeHandler: setTreeHandler,
        getTreeHandler: getTreeHandler,
      }}
    >
      {props.children}
    </TreeContext.Provider>
  )
}

export default TreeCtx
