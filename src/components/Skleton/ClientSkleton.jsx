const tabs = [1, 2, 3, 4, 5, 6, 7]
const tab_contents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const btns = [1, 2, 3]

export function TabPanelSkleton({ type = "tabs" }) {
   return (
      <div className="skleton_tab_panel">
         <ul className="skleton_tab_panel_list">
            {
               (type === 'tabs' ? tabs : btns).map(_ => (
                  <li key={_} className="skleton_tab"></li>
               ))
            }
         </ul>
      </div>
   )
}

export function ClientDetailsSkleton() {
   return (
      <div className="skleton_client_details">
         <h2></h2>
         <div className="skleton_client_details_box">
            <div className="skleton_client_img">
               <div className="img_box"></div>
            </div>
            <div className="skleton_client_details_list">
               <ul>
                  {
                     tabs.map(_ => (
                        <li key={_} className="details_list_item"></li>
                     ))
                  }
               </ul>
            </div>
         </div>
      </div>
   )
}

export function TabContentSkleton() {
   return (
      <div className="skleton_tab_content">
         <div className='skleton_tab_content_list'>
            {
               tab_contents.map(_ => (
                  <div key={_} className="skleton_tab_content_list_item">
                     <p></p>
                     <p></p>
                  </div>
               ))
            }
         </div>
      </div>

   )
}