import utils from '../utils/utils.js'

// ADD FILE/FOLDER
const addFile = async (req, res) => {
  const { path } = req.body
  //Fetch json file
  const jsonFile = await utils.getJsonFile()

  //Check if path already exists in the json file and send message if it does
  for (const file of jsonFile) {
    if (file === path) {
      res.send({ message: 'already exists' })
      return
    }
  }
  jsonFile.push(path)
  utils.writeToJsonFile(jsonFile)
  const newTree = utils.createTree(jsonFile)
  res.send(JSON.stringify(newTree))
}

// DELETE FILE/FOLDER
const deleteFile = async (req, res) => {
  const { path, type } = req.body
  // fetch json file
  const jsonFile = await utils.getJsonFile()

  // filter out the path that we want deleted.
  const newJsonFile = jsonFile.filter((paths) => {
    if (type === 'folder') {
      return !paths.includes(path)
    }
    return paths !== path
  })
  // save new json file
  utils.writeToJsonFile(newJsonFile)
  const newTree = utils.createTree(newJsonFile)
  res.send(JSON.stringify(newTree))
}

// RENAME FILE/FOLDER
const updateFile = async (req, res) => {
  const { oldPath, newPath, type } = req.body
  // We need to destructure old path and remove empty values
  var creatingPath = oldPath.split('/').filter((part) => part.length > 0)
  // removing the part that we will rename
  creatingPath.pop()
  //adding the new name to the file/folder
  creatingPath.push(newPath)
  // reasemble the string path and fetch the json file
  var pathCreated = creatingPath.join('/')
  const jsonFile = await utils.getJsonFile()
  // replace the old path in json file with the new and updated string path
  const newFile = jsonFile.map((path) =>
    path.replace(oldPath, type === 'folder' ? pathCreated + '/' : pathCreated)
  )
  // save and send back new structure
  utils.writeToJsonFile(newFile)
  const newTree = utils.createTree(newFile)
  res.send(JSON.stringify(newTree))
}

/**
 * GET TREE
 * here is the fetch of the tree structure
 */
const getTree = async (req, res) => {
  const tree = utils.createTree(await utils.getJsonFile())
  res.send(JSON.stringify(tree))
}

const controller = {
  addFile,
  deleteFile,
  updateFile,
  getTree,
}

export default controller
