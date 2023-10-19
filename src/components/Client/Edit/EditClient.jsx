import { useState, useContext, memo, useMemo } from 'react'
import { Input } from '@nextui-org/react'
import { AiOutlineUserAdd, AiOutlineArrowDown } from 'react-icons/ai'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { TabContentSkleton } from '../../Skleton/ClientSkleton';
import { ClientInput, ClientPINFLInput } from './EditInputs';
import { useCountries } from '../../../hooks/useCountries';
import { ClientContext } from '../../../context/context';
import { useRegions } from '../../../hooks/useRegions';
import { ClientSelect } from './ClientSelects';
import { alert } from '../../Alert/alert'
import ContainerEdit from '../../ImageContainer/ContainerEdit';
import LoaderBackdrop from '../../Loader/LoaderBackdrop';
import https from '../../../services/https'

const sectionOptions = [
  { value: '1', label: "O'zR fuqarosining ID kartasi" },
  { value: '2', label: "O'zR Fuqarosining biometrik pasporti" },
  { value: '3', label: "Harbiy xizmatchi guvohnomasi" },
  { value: '4', label: "Xizmat guvohnomasi" },
  { value: '5', label: "Xorijiy fuqaro pasporti" },
  { value: '6', label: "Yashash guvohnomasi" },
  { value: '7', label: "O'zR fuqarosining yangi namunadagi haydovchilik guvohnomasi" },
  { value: '8', label: "Boshqa" }
]

const genderOptions = [
  { value: 'male', label: "Erkak" },
  { value: 'female', label: "Ayol" }
]

const basic_inputs = [
  {
    id: 1,
    label: 'Mijoz kodi',
    value: "code"
  },
  {
    id: 2,
    label: 'Familiyasi',
    value: "surname"
  },
  {
    id: 3,
    label: 'Ismi',
    value: "firstname"
  },
  {
    id: 4,
    label: 'Sharifi',
    value: "lastname"
  },
  {
    id: 5,
    label: "Tug'ilgan sana",
    value: "birth_date",
    type: "date"
  },
]

const address_inputs = [
  {
    id: 1,
    label: "Doimi manzil",
    value: "address"
  },
  {
    id: 2,
    label: "Vaqtinchalik yashash joyi",
    value: "temp_address"
  }
]

const doc_inputs = [
  {
    id: 1,
    label: 'Hujjat seriya raqami',
    value: "serial_num"
  },
  {
    id: 2,
    label: 'Kim tomondan berildi',
    value: "issued_by"
  },
  {
    id: 3,
    label: 'Hujjat berilgan sana',
    value: "issued_date",
    type: "date"
  },
  {
    id: 4,
    label: 'Hujjat tugash sana',
    value: "doc_end",
    type: "date"
  },
  {
    id: 5,
    label: "Ish lavozmi",
    value: "job"
  }
]

export const EditClient = memo(({ id }) => {
  const { setCurrentClient } = useContext(ClientContext)
  const currentClient = useContext(ClientContext).client
  const [client, setClient] = useState(currentClient || {})
  const [districts, setDistricts] = useState([])
  const [disable, setDisable] = useState(false)
  const [paths, setPaths] = useState([]);
  const countries = useCountries();
  const regions = useRegions();

  const getDistricts = async (regionId) => {
    try {
      const res = await https.get('/districts');
      const filteredItems = res.data.filter(item => item.region_id === regionId);

      const array = filteredItems.map(item => ({
        value: item.id,
        label: item.name_uz,
      }));

      setDistricts(array);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  useMemo(() => {
    let isMounted = true;
    getClientDetails();

    async function getClientDetails() {
      try {
        const response = await https.get(`/clients/${id}`);
        if (isMounted) {
          setClient(response?.data);
          setPaths(response?.data?.paths);
          getDistricts(response?.data?.region?.id);
        }
      } catch (err) {
        console.log(err);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [id])

  const client_selects = [
    {
      id: 1,
      label: 'Viloyat/Respublika',
      selectClassName: 'region_select',
      options: regions,
      changeHendle: getDistricts
    },
    {
      id: 2,
      label: 'Tuman',
      selectClassName: 'ditrict_select',
      options: districts
    },
  ]

  async function editClient() {
    setDisable(true);
    try {
      const { region, district } = client;
      const data = {
        ...client,
        region_id: region?.id,
        district_id: district?.id,
        paths: paths
      };
      await https.put(`/clients/${id}`, data);
      setClient(data);
      setCurrentClient(data);
      alert("Mijoz o'zgartirildi", "success");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "An error occurred", "error");
    } finally {
      setDisable(false);
    }
  }

  return (
    <>
      {
        client?.id ?
          <div className="tab_content">
            <div className='edit-buttons'>
              <button type='submit' disabled={disable} className={`client_submit submit back_green ${disable ? "disabled" : ""}`} onClick={editClient}>
                O'zgarishni saqlash
                <AiOutlineUserAdd />
              </button>
            </div>
            <Accordion>
              <AccordionSummary
                expandIcon={<AiOutlineArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ fontWeight: 600, color: '#7828c8' }}
              >
                Shaxsiy ma'lumotlari
              </AccordionSummary>
              <AccordionDetails>
                <div className='tab_content_list'>
                  {
                    basic_inputs.map(item => (
                      <ClientInput
                        key={item.id}
                        label={item.label}
                        value={item.value}
                        client={client}
                        setClient={setClient}
                        type={item.type}
                      />
                    ))
                  }
                  <ClientSelect
                    label={"Jinsi"}
                    client={client}
                    setClient={setClient}
                    selectClassName={"gender_select"}
                    options={genderOptions}
                  />
                  <ClientPINFLInput
                    label={"JSHSHIR(PINFL)"}
                    value={"pinfl"}
                    client={client}
                    setClient={setClient}
                    type="number"
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<AiOutlineArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ fontWeight: 600, color: '#7828c8' }}
              >
                Yashash manzillari
              </AccordionSummary>
              <AccordionDetails>
                <div className="tab_content_list">
                  {
                    client_selects.map(item => (
                      <ClientSelect
                        key={item.id}
                        label={item.label}
                        client={client}
                        setClient={setClient}
                        selectClassName={item.className}
                        options={item.options}
                        changeHendle={item.changeHendle}
                      />
                    ))
                  }
                  {
                    address_inputs.map(item => (
                      <ClientInput
                        key={item.id}
                        label={item.label}
                        value={item.value}
                        client={client}
                        setClient={setClient}
                        type={item.type}
                      />
                    ))
                  }
                </div>
                <div className='margin_top_15'>
                  {
                    client?.phone?.map((item, index) => {
                      return (
                        <div className='kl1_product' key={index}>
                          <Input
                            width='93%'
                            clearable
                            label={`Telefon raqami (${index + 1})`}
                            bordered
                            className='vall'
                            color="secondary"
                            required
                            value={item}
                            onChange={(e) => {
                              let array = { ...client }
                              array.phone[index] = e.target.value
                              setClient(array)
                            }}
                          />
                          <button
                            className='kl1_delete_button'
                            type='button'
                            onClick={() => {
                              let newInfo = { ...client }
                              if (newInfo.phone.length > 1) {
                                newInfo.phone = newInfo?.phone?.filter(x => x !== newInfo.phone[index])
                              }
                              setClient(newInfo)
                            }}
                          >
                            <i className='bx bx-trash'></i>
                          </button>
                        </div>
                      )
                    })
                  }
                  <div className='margin_bottom20'>
                    <button
                      className='kl1_add_button'
                      type='button'
                      onClick={() => {
                        let newNumber = ['']
                        let newInfo = { ...client }
                        newInfo.phone = newInfo.phone.concat(newNumber)
                        setClient(newInfo)
                      }}
                    >
                      Telefon raqam qo'shish
                    </button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<AiOutlineArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ fontWeight: 600, color: '#7828c8' }}
              >
                Shaxsini tasdiqlovchi hujjatlari
              </AccordionSummary>
              <AccordionDetails>
                <div className="tab_content_list">
                  <ClientSelect
                    label="Shaxsini tasdiqlovchi hujjat"
                    client={client}
                    setClient={setClient}
                    selectClassName={'doc_select'}
                    options={sectionOptions}
                  />
                  {
                    doc_inputs.map(item => (
                      <ClientInput
                        key={item.id}
                        label={item.label}
                        value={item.value}
                        client={client}
                        setClient={setClient}
                        type={item.type}
                      />
                    ))
                  }
                  <ClientSelect
                    label={"Fuqarolik"}
                    client={client}
                    setClient={setClient}
                    selectClassName={"country_select"}
                    options={countries}
                  />
                </div>
                <ContainerEdit path={paths} setPath={setPaths} />
              </AccordionDetails>
            </Accordion>
          </div> :
          <TabContentSkleton />
      }
      <LoaderBackdrop disable={disable} />
    </>
  )
})
