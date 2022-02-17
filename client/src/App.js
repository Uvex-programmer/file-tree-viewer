import './App.scss'
import { useEffect, useContext, useState } from 'react'
import { TreeContext } from './store/ContextProvider'
import TreeContainer from './components/TreeContainer'

function App() {
  const ctx = useContext(TreeContext)
  const [fileName, setfileName] = useState('')

  useEffect(() => {
    ctx.getTreeHandler()
  }, [])

  // If someone ends up deleting everything they can add new "root" folders. Just a small fix if that happends
  const addFile = (e) => {
    e.preventDefault()
    if (fileName.length < 1) return
    fetch('/api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fileName.replaceAll('/', '') + '/',
        type: 'folder',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          console.log(data.message)
          return
        }
        ctx.setTreeHandler(data)
      })
    setfileName('')
  }

  return (
    <div className='App'>
      <header className='App-header'>File tree viewer </header>
      <p className='info'>
        - This file tree viewer is based on string paths like
        folder1/folder2/file.
      </p>
      <p className='info'>
        - You can right click on files/folders for options.
      </p>
      <div className='App-container'>
        <form className='App-rootFolder'>
          <p>add root folder</p>
          <input
            type='text'
            value={fileName}
            minLength='1'
            onChange={(e) => setfileName(e.target.value)}
          />
          <button onClick={(e) => addFile(e)}>+</button>
        </form>

        <TreeContainer data={ctx.tree} />
      </div>
    </div>
  )
}

export default App
