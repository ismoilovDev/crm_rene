import { useEffect, useState } from 'react';
import { useTable, useBlockLayout } from 'react-table';
import { useSticky } from 'react-table-sticky';


function Table({ columns, data, isLoading, children }) {

   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
   } = useTable(
      {
         columns,
         data
      },
      useBlockLayout,
      useSticky
   );


   return (
      <div
         {...getTableProps()}
         className="table sticky"
         style={{ width: "100%", height: "79vh" }}
      >
         <div className="header">
            {headerGroups.map((headerGroup, index) => (
               <div key={index} {...headerGroup.getHeaderGroupProps()} className="tr" style={{ display: "flex" }}>
                  {headerGroup.headers.map((column, index) => (
                     <div key={index + "abc"} {...column.getHeaderProps()} className="th">
                        {column.render("Header")}
                     </div>
                  ))}
               </div>
            ))}
         </div>

         <div {...getTableBodyProps()} className="body">
            {rows.map((row, i) => {
               prepareRow(row);
               return (
                  <div {...row.getRowProps()} className="tr">
                     {row.cells.map(cell => {
                        return (
                           <div {...cell.getCellProps()} className="td" >
                              {
                                 isLoading ? <span className="loading"></span> : <pre> {cell.render("Cell")} </pre>
                              }
                           </div>
                        );
                     })}
                     {
                        children
                     }
                  </div>
               );
            })}
         </div>
      </div>
   );
}

function StickyTable({ columns, datas, children, isLoading }) {

   return (
      <section className="custom_sticky_table">
         <Table columns={columns} data={datas} children={children} isLoading={isLoading} />
      </section>
   )
}

export default StickyTable;