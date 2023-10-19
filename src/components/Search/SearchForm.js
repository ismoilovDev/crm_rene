import { memo } from 'react'
import { Input } from '@nextui-org/react';

function SearchForm({ searchContents, checkSearch, searchInput, placeholder }) {
   return (
      <div className="search_content">
         <form className="search_form" onSubmit={searchContents}>
            <Input
               rounded
               bordered
               placeholder={placeholder}
               color="secondary"
               label=' '
               width='300px'
               className='search-input'
               type="search"
               ref={searchInput}
               onChange={(e) => checkSearch(e.target.value)}
               contentRight={
                  <i className='bx bx-search-alt-2'></i>
               }
            />
            <button className="serach_btn" type='submit' onClick={searchContents}></button>
         </form>
      </div>
   )
}

export default memo(SearchForm)