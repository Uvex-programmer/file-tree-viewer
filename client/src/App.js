import './App.scss'
import { useEffect, useContext } from 'react'
import { TreeContext } from './store/ContextProvider'
import Form from './components/forms/Form'
import TreeContainer from './components/TreeContainer'

function App() {
  const ctx = useContext(TreeContext)

  useEffect(() => {
    ctx.getTreeHandler()
  }, [])

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
        <div className='App-rootFolder'>
          <p>add root folder</p>
          <Form type={'folder'} action={'add'} />
        </div>

        <TreeContainer data={ctx.tree} />
      </div>
    </div>
  )
}

export default App
