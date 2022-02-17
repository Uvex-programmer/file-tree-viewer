import styles from './TreeContainer.module.scss'
import TreeFile from './TreeFile'

/**
 * Container component for files
 */
const TreeContainer = ({ data }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {data?.map((item, index) => {
          return <TreeFile file={item} key={index} />
        })}
      </ul>
    </div>
  )
}

export default TreeContainer
