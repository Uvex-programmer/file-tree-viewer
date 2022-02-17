import fs from 'fs'

//Fetching the json file which we use as temp DB
const getJsonFile = async () => {
  let rawdata = await fs.readFileSync('paths.json')
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

const createTree = (paths) => {
  // Starting with sorting all strings in path array.
  paths = paths.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })
  // The tree structure we will collect all map/files in.
  var treeStructure = []
  // Need a counter which will tell where in the string path we are.
  var counter = 0
  // The object that will hold the directory info
  var dirPath = {}

  // Will loop through all strings from the json.file. Strings looking like this: abc/test/whatever.txt

  for (const string of paths) {
    // Splitting the string at forwards slashes to create all dir files.
    var newPaths = string.split('/')
    // test / aw / 3"
    counter = 0
    // Need to keep track on current tree structure
    var currentTree = treeStructure
    // Current path to the part of dir we are at
    var currentPath = ''

    // Here we loop the dir paths from the string we splitted. abc/test/whatever.txt = [abc, test, whatever.txt]
    for (const directory of newPaths) {
      var name = directory
      counter++

      //Check if we are not on last part, then add a forward slash because it means it's a folder.
      if (counter === newPaths.length) {
        currentPath += name
      } else {
        //name = name + '/'
        currentPath += name + '/'
      }
      if (currentTree === undefined) {
        break
      }

      // Searching if path exists in current tree, then we will not create a duplicate.
      var existingPath = checkExistingPath(currentTree, currentPath)

      // If there already is an path we set the current tree to its children and loop over.
      // Else we create a new path for a folder/file.

      if (existingPath) {
        currentTree = existingPath.children
      } else {
        // When we reach last part of string we will create a file or if last part is "empty" we will break the loop. Else create folder
        if (counter === newPaths.length) {
          if (name.length < 1) break
          let fileType = name.split('.')
          dirPath = {
            name: name,
            currentPath: currentPath,
            type: fileType[1],
          }
          currentPath = ''
        } else {
          dirPath = {
            name: name,
            currentPath: currentPath,
            type: 'folder',
            children: [],
          }
        }
        currentTree.push(dirPath)
        currentTree = dirPath.children
      }
    }
  }
  return treeStructure
}

const utils = {
  createTree,
  getJsonFile,
  writeToJsonFile,
}

export default utils
