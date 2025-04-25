import css from './index.module.scss'

export const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <div className={css.loader} />
    </div>
  )
}
