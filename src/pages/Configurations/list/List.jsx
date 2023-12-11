import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { AiOutlineArrowDown } from 'react-icons/ai'
import { ClientQuestionnaire } from "../../../components/Configurations/Questionnaire"
import { UploadDocs } from '../../../components/Configurations/UploadDocs';

function ConfigList() {
   return (
      <section className="config_list">
         <Accordion defaultExpanded={true}>
            <AccordionSummary
               expandIcon={<AiOutlineArrowDown />}
               aria-controls="panel1a-content"
               id="panel1a-header"
               style={{ fontWeight: 600, color: '#7828c8' }}
            >
               Variantlar
            </AccordionSummary>
            <AccordionDetails>
               <ClientQuestionnaire />
            </AccordionDetails>
         </Accordion>
         <Accordion>
            <AccordionSummary
               expandIcon={<AiOutlineArrowDown />}
               aria-controls="panel1a-content"
               id="panel1a-header"
               style={{ fontWeight: 600, color: '#7828c8' }}
            >
               Hujjatlar
            </AccordionSummary>
            <AccordionDetails>
               <UploadDocs />
            </AccordionDetails>
         </Accordion>
      </section>
   )
}
export default ConfigList