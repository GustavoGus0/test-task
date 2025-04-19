import css from './index.module.scss'

export const Segment = ({
  title,
  size = 1,
  children,
}: {
  title: string
  size?: 1 | 2
  children: React.ReactNode
}) => {
  return (
    <div className={css.segment}>
      {size === 1 ? (
        <h2 className={css.headerLarge}>{title}</h2>
      ) : (
        <h3 className={css.headerSmall}>{title}</h3>
      )}
      <div className={css.content}>{children}</div>
    </div>
  )
}
