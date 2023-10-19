export const ResetDataModal = ({ resetWarning, closeReset }) => {
   return (
      <div className={resetWarning}>
         <p>Haqiqatan ham ma'lumontlarni qayta tiklamoqchimisiz?</p>
         <div >
            <button onClick={closeReset}>Yoq</button>
            <button onClick={closeReset}>Ha</button>
         </div>
      </div>
   )
}