import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from 'yet-another-react-lightbox/plugins';

export function ImageViewer({ img_src, slide_src }) {
   const [open, setOpen] = useState(false);

   return (
      <div className="client_img">
         <img
            src={img_src}
            onClick={() => setOpen(true)}
            alt="Mijoz rasmi"
         />
         <Lightbox
            open={open}
            close={() => setOpen(false)}
            carousel={{ finite: true, preload: 2, }}
            plugins={[Zoom]}
            slides={slide_src}
         />
      </div>
   )
}