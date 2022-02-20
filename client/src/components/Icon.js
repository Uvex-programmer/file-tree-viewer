import {
  FcDocument,
  FcImageFile,
  FcFolder,
  FcAnswers,
  FcPlus,
  FcMinus,
} from 'react-icons/fc'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'

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
