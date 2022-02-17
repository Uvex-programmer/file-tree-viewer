import {
  FcDocument,
  FcImageFile,
  FcFolder,
  FcAnswers,
  FcPlus,
  FcMinus,
} from 'react-icons/fc'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'

/**
 * Icon component where we pass down what type the file is.
 * Will only get different outcomes if the user puts ".something" at the end
 * of file name.
 */

const Icon = ({ data }) => {
  switch (data) {
    case 'txt':
      return <FcDocument />
    case 'png':
      return <FcImageFile />
    case 'folder':
      return <FcFolder />
    case 'expand':
      return <MdKeyboardArrowDown />
    case 'collapse':
      return <MdKeyboardArrowRight />
    case 'add':
      return <FcPlus size={14} />
    case 'minus':
      return <FcMinus size={14} />
    default:
      return <FcAnswers />
  }
}

export default Icon
