import express from 'express'
import TreeController from '../controller/TreeController.js'
const router = express.Router()

router.get('/', TreeController.getTree)
router.post('/add', TreeController.addFile)
router.delete('/delete', TreeController.deleteFile)
router.put('/update', TreeController.updateFile)

export default router
