import { memo, useContext } from 'react'
import { ClientDetailsList } from '../../../components/Client/ClientDetailsList';
import { TabContentSkleton } from '../../../components/Skleton/ClientSkleton';
import { EditClient } from '../../../components/Client/Edit/EditClient';
import { ImageViewer } from '../../../components/Client/ImageViewer';
import { ClientContext } from '../../../context/context'
import not_found from '../../../assets/images/avatar.png';


function AboutClient({ id }) {
  const { client } = useContext(ClientContext)

  return (
    <>
      <div className="client_details_box">
        <ImageViewer
          img_src={client?.paths?.length > 0 ? `${ process.env.BASE_URL }/${client?.paths[0]}` : not_found}
          slide_src={
            client?.paths?.length > 0 ?
              client?.paths?.map(item => {
                return { src: `${process.env.BASE_URL}/${item}` }
              }) : [{ src: not_found }]
          }
        />
        <ClientDetailsList client={client} />
      </div>
      {
        client.id ? <EditClient id={id} /> : <TabContentSkleton />
      }
    </>
  )
}

export default memo(AboutClient)