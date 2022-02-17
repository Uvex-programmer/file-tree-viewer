import utils from '../utils/utils.js'

/**
 * ADD FILE/FOLDER
 */
const addFile = async (req, res) => {
  let { name, path } = req.body
  //Fetch json file
  const jsonFile = await utils.getJsonFile()

  //Check if path already exists in the json file and send message if it does
  for (const file of jsonFile) {
    console.log()
    if (file === path + name || file === name) {
      res.send({ message: 'already exists' })
      return
    }
  }
  // if there is no path we are in root folder and will only push the name that will create a file/folder
  // in root.
  if (path !== undefined) {
    jsonFile.push(path + name)
  } else {
    jsonFile.push(name)
  }

  utils.writeToJsonFile(jsonFile)
  var newTree = utils.createTree(jsonFile)
  res.send(JSON.stringify(newTree))
}
/**
 * DELETE FILE/FOLDER
 */
const deleteFile = async (req, res) => {
  var string = req.body.path
  // fetch json file
  var jsonFile = await utils.getJsonFile()
  // filter out the path that we want deleted.
  var newFile = jsonFile.filter((path) => !path.includes(string))
  // save new json file
  utils.writeToJsonFile(newFile)
  var newTree = utils.createTree(newFile)
  res.send(JSON.stringify(newTree))
}

/**
 * RENAME FILE/FOLDER
 */
const updateFile = async (req, res) => {
  var { oldPath, newPath, type } = req.body
  // We need to destructure old path
  var buildNewPath = oldPath.split('/')
  // if we have an empty field at last index we need to pop two times
  // then push the new name for folder/file
  if (buildNewPath[buildNewPath.length - 1] === '') {
    buildNewPath.pop()
  }
  buildNewPath.pop()
  buildNewPath.push(newPath)
  // reasemble the string path and fetch the json file
  var doneNewPath = buildNewPath.join('/')
  var jsonFile = await utils.getJsonFile()
  // replace the old path in json file with the new and updated string path
  var newFile = jsonFile.map((path) =>
    path.replace(oldPath, type === 'folder' ? doneNewPath + '/' : doneNewPath)
  )
  // save and send back new structure
  utils.writeToJsonFile(newFile)
  var newTree = utils.createTree(newFile)
  res.send(JSON.stringify(newTree))
}

/**
 * GET TREE
 * here is the fetch of the tree structure
 */
const getTree = async (req, res) => {
  var tree = utils.createTree(await utils.getJsonFile())
  res.send(JSON.stringify(tree))
}

const controller = {
  addFile,
  deleteFile,
  updateFile,
  getTree,
}

export default controller
