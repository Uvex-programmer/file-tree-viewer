import fs from 'fs'

//Fetching the json file which we use as temp DB
const getJsonFile = () => {
  const rawdata = fs.readFileSync('paths.json')
  return JSON.parse(rawdata)
}

// Small function for updating the json file
const writeToJsonFile = (data) => {
  fs.writeFileSync('paths.json', JSON.stringify(data))
}

// Checking for existing paths in currentTree
const checkExistingPath = (array, value) => {
  for (const path of array) {
    if (path.currentPath === value) {
      return path
    }
  }
  return false
}

// Creates a file or folder depending if we are the last index of the paths array
const createFileOrFolder = (isLastIndex, path, currentPath) => {
  return {
    name: path,
    currentPath: currentPath,
    type: isLastIndex ? path.split('.')[1] : 'folder',
    children: [],
  }
}

//Check if string in array already exists
const stringExists = (value, array) => {
  return array.indexOf(value) > -1
}

const createTree = (paths) => {
  // Starting with sorting all strings in path array.
  paths = paths.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })
  // The tree structure we will collect all map/files in.
  var treeStructure = []
  // Need a counter which will tell where in the string path we are.
  var counter = 0
  // Will loop through all strings from the json.file. Strings looking like this: abc/test/whatever.txt
  for (const string of paths) {
    // Splitting the string at forwards slashes to create all dir files.
    var newPaths = string.split('/')
    // Counter that checks where in the array we are
    counter = 0
    // Need to keep track on current tree structure
    var currentTree = treeStructure
    // Current path to the part of dir we are at
    var currentPath = ''

    // Here we loop the dir paths from the string we splitted. abc/test/whatever.txt = [abc, test, whatever.txt]
    for (const path of newPaths) {
      counter++
      if (path.length < 1) break
      // A const that we use to check if we are at last index of the path array
      const isLastIndex = counter === newPaths.length

      //Check if we are not at last index, then add a forward slash because it means it's a folder.
      isLastIndex ? (currentPath += path) : (currentPath += path + '/')
      const existingPath = checkExistingPath(currentTree, currentPath)

      // If there already is an path we set the current tree to its children and loop over.
      if (existingPath) {
        currentTree = existingPath.children
        continue
      }
      // Here we check if it a folder or file
      const dirPath = createFileOrFolder(isLastIndex, path, currentPath)
      // Adds the file to the tree structure
      currentTree.push(dirPath)
      // sets current tree to the children of last folder
      currentTree = dirPath.children
    }
  }
  return treeStructure
}

const utils = {
  createTree,
  getJsonFile,
  writeToJsonFile,
  stringExists,
}

export default utils
