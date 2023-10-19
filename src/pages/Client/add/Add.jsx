import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { AiOutlineClear, AiOutlineUserAdd, AiOutlineArrowDown } from 'react-icons/ai'
import { registerLocale } from "react-datepicker";
import { Input } from '@nextui-org/react';
import { v4 as uuidv4 } from 'uuid';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Select from 'react-select';
import uz from "date-fns/locale/uz";
import { ResetDataModal } from '../../../components/Client/Create/ResetData';
import { useCountries } from '../../../hooks/useCountries';
import { useRegions } from '../../../hooks/useRegions';
import { alert } from '../../../components/Alert/alert'
import Container from '../../../components/ImageContainer/Container';
import Prev from '../../../components/Prev/Prev'
import https from '../../../services/https';


const sectionOptions = [
  { value: '1', label: "O'zR fuqarosining ID kartasi" },
  { value: '2', label: "O'zR Fuqarosining biometrik pasporti" },
  { value: '3', label: "Harbiy xizmatchi guvohnomasi" },
  { value: '4', label: "Xizmat guvohnomasi" },
  { value: '5', label: "Xorijiy fuqaro pasporti" },
  { value: '6', label: "Tug'ulganlik haqidagi guvohnoma" },
  { value: '7', label: "O'zR fuqarosining yangi namunadagi haydovchilik guvohnomasi" },
  { value: '8', label: "Boshqa" }
]

const genderOptions = [
  { value: 'male', label: "Erkak" },
  { value: 'female', label: "Ayol" }
]

const customStyles = {
  option: (provided) => ({
    ...provided,
    padding: 10,
    borderRadius: 5
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

const makeTheme = (theme) => ({
  ...theme,
  borderRadius: 12,
  colors: {
    ...theme.colors,
    primary25: '#7828c8',
    primary: '#7828c8',
  },
})

function ClientForm() {
  const [paths, setPaths] = useState([])
  const [disable, setDisable] = useState(false)
  const [clientCode, setClientCode] = useState('')
  const [pinfl, setPinfl] = useState('')
  const [document, setDocument] = useState('')
  const [gender, setGender] = useState(genderOptions[0])
  const [section, setSection] = useState(sectionOptions[0])
  const [sectionRole, setSectionRole] = useState(sectionOptions?.[0]?.label)
  const [selectedRegion, setSelectedRegion] = useState({})
  const [selectedCountry, setSelectedCountry] = useState({})
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState({})
  const [resetWarning, setResetWarning] = useState('warning_reset_main close')
  const [phoneArray, setPhoneArray] = useState([{ id: 1, phone: "", }])
  const { register, handleSubmit } = useForm()
  const countries = useCountries()
  const navigate = useNavigate()
  const regions = useRegions()
  registerLocale("uz", uz)

  const getDistracts = async (regionId) => {
    try {
      const response = await https.get('/districts');
      const filteredDistricts = response?.data?.filter((item) => item?.region_id === regionId);
      if (filteredDistricts.length > 0) {
        const formattedDistricts = filteredDistricts.map((item) => ({
          value: item?.id,
          label: item?.name_uz,
        }));
        setDistricts(formattedDistricts);
        setSelectedDistrict(formattedDistricts[0]);
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  }

  useEffect(() => {
    getDistracts(1)
    setSelectedCountry(countries[238])
    setSelectedRegion(regions[0])
  }, [regions, countries])

  function openReset(e) {
    e.preventDefault()
    setResetWarning('warning_reset_main open')
  }

  function closeReset(e) {
    e.preventDefault()
    setResetWarning('warning_reset_main close')
  }

  function addPhoneNumber() {
    let newNumber = [{
      id: uuidv4(),
      phone: ""
    }]
    setPhoneArray(phoneArray.concat(newNumber))
  }

  function deletePhoneNumber(id) {
    if (phoneArray.length > 1) {
      let sortedArray = phoneArray.filter(item => item?.id !== id)
      setPhoneArray(sortedArray)
    }
  }

  function calculateAge(date) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const onSubmit = async (data) => {
    const now = new Date();
    const birthDate = new Date(data.birth_date);
    const docEndDate = new Date(data.doc_end);

    if (birthDate > now) {
      setDisable(false);
      return alert("Tug'ilgan sana noto'g'ri", 'error');
    }

    if (docEndDate < now) {
      setDisable(false);
      return alert("Hujjat muddati tugagan", 'error');
    }

    const age = calculateAge(data.birth_date);
    if (age < 18) {
      setDisable(false);
      return alert("Mijozning yoshi 18 yoshdan kichik", 'error');
    }

    const numberArray = phoneArray.map(item => `+998${item?.phone}`);
    const info = {
      ...data,
      paths: paths,
      phone: numberArray,
      gender: gender.value,
      doc_type: sectionRole,
      code: `99${data?.code || ''}`,
      region_id: selectedRegion.value,
      citizenship: selectedCountry.label,
      district_id: selectedDistrict.value,
    };
    try {
      const response = await https.post('/clients', info);
      alert("Mijoz qoshildi", 'success');
      navigate(`/client/${response?.data?.data?.client_id}/`, { replace: true });
      setDisable(false);
    } catch (err) {
      alert(err?.response?.data?.message, 'error');
      setDisable(false);
    }
  }

  return (
    <>
      <ResetDataModal resetWarning={resetWarning} closeReset={closeReset} />
      <Prev />
      <div className='client_form'>
        <div className='clientform_head'>
          <div className='clientform_title_container'>
            <div className='clientform_title'><p>Mijoz tafsilotlari</p></div>
          </div>
        </div>

        <form className='clientform_form margin_top_20' onSubmit={handleSubmit(onSubmit)} >
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<AiOutlineArrowDown />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ fontWeight: 600, color: '#7828c8' }}
            >
              Shaxsiy ma'lumotlari
            </AccordionSummary>
            <AccordionDetails>
              <div className="tab_content_list">
                <Input
                  bordered
                  label="Mijoz kodi"
                  labelLeft='99'
                  value={clientCode}
                  color="secondary"
                  required
                  {...register("code", { required: true })}
                  onChange={(e) => {
                    if (e.target.value.trim().length < 7) {
                      setClientCode(e.target.value)
                    }
                  }}
                />
                <Input
                  bordered
                  label="Familiyasi"
                  color="secondary"
                  {...register("surname", { required: true })}
                />
                <Input
                  bordered
                  label="Ismi"
                  color="secondary"
                  {...register("firstname", { required: true })}
                />
                <Input
                  bordered
                  label="Sharifi"
                  color="secondary"
                  {...register("lastname", { required: true })}
                />
                <Input
                  bordered
                  label="Tug'ilgan sana"
                  color="secondary"
                  type='date'
                  {...register("birth_date", { required: true })}
                />
                <div className='clientForm_selector'>
                  <p>Jinsi</p>
                  <Select
                    defaultValue={gender}
                    value={gender}
                    options={genderOptions}
                    className='buyurtma_select_new gender_select'
                    styles={customStyles}
                    theme={makeTheme}
                    onChange={(event) => {
                      setGender(event)
                    }}
                  />
                </div>
                <Input
                  bordered
                  label="JSHSHIR(PINFL)"
                  value={pinfl}
                  color="secondary"
                  {...register("pinfl", { required: true })}
                  onChange={e => {
                    if (e.target.value.trim().length < 15) {
                      setPinfl(e.target.value)
                    }
                  }}
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
                <div className='clientForm_selector'>
                  <p>Viloyat/Respublika</p>
                  <Select
                    defaultValue={regions[0]}
                    value={selectedRegion}
                    options={regions}
                    className={"buyurtma_select_new region_select"}
                    styles={customStyles}
                    theme={makeTheme}
                    onChange={(event) => {
                      setSelectedRegion(event)
                      getDistracts(event?.value)
                    }}
                  />
                </div>
                <div className='clientForm_selector'>
                  <p>Tuman</p>
                  <Select
                    defaultValue={selectedDistrict}
                    value={selectedDistrict}
                    options={districts}
                    className='buyurtma_select_new ditrict_select'
                    styles={customStyles}
                    theme={makeTheme}
                    onChange={(event) => {
                      setSelectedDistrict(event)
                    }}
                  />
                </div>
                <Input
                  bordered
                  required
                  label="Doimiy manzili"
                  color="secondary"
                  {...register("address", { required: true })}
                />
                <Input
                  bordered
                  label="Vaqtinchalik yashash joyi"
                  color="secondary"
                  {...register("temp_address", { required: false })}
                />
              </div>
              <div>
                {
                  phoneArray?.map((item, index) => {
                    return (
                      <div className='kl1_product' key={item?.id}>
                        <Input
                          width='93%'
                          clearable
                          bordered
                          label={`Telefon raqami (${index + 1})`}
                          pattern='[0-9]'
                          labelLeft='+998'
                          type="number"
                          color="secondary"
                          className="vall"
                          value={phoneArray?.find(x => x.id === item?.id).phone}
                          onChange={(e) => {
                            let array = [...phoneArray]
                            array[index].phone = e.target.value
                            setPhoneArray(array)
                          }}
                        />
                        <button
                          className='kl1_delete_button'
                          type='button'
                          onClick={() => deletePhoneNumber(item?.id)}
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
                    onClick={() => { addPhoneNumber() }}
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
                <div className='clientForm_selector'>
                  <p>Shaxsini tasdiqlovchi hujjat</p>
                  <Select
                    defaultValue={section}
                    value={section}
                    options={sectionOptions}
                    className='buyurtma_select_new doc_select'
                    styles={customStyles}
                    theme={makeTheme}
                    onChange={(event) => {
                      setSectionRole(event.label)
                      setSection(event)
                    }}
                  />
                </div>
                <Input
                  bordered
                  label="Hujjat seriya raqami"
                  value={document}
                  color="secondary"
                  {...register("serial_num", { required: true })}
                  onChange={e => {
                    const result = e.target.value.toUpperCase();
                    setDocument(result)
                  }}
                />
                <Input
                  bordered
                  label="Kim tomondan berildi"
                  color="secondary"
                  {...register("issued_by", { required: true })}
                />
                <Input
                  bordered
                  required
                  label="Hujjat berilgan sana"
                  color="secondary"
                  type='date'
                  {...register("issued_date", { required: true })}
                />
                <Input
                  bordered
                  label="Hujjat tugash sanasi"
                  color="secondary"
                  type='date'
                  {...register("doc_end", { required: true })}
                />
                <div className='clientForm_selector'>
                  <p>Fuqarolik</p>
                  <Select
                    defaultValue={selectedCountry}
                    value={selectedCountry}
                    options={countries}
                    className='buyurtma_select_new country_select'
                    styles={customStyles}
                    theme={makeTheme}
                    onChange={(event) => {
                      setSelectedCountry(event)
                    }}
                  />
                </div>
                <Input
                  bordered
                  label="Ish lavozmi"
                  color="secondary"
                  {...register("job", { required: true })}
                />
              </div>
              <Container path={paths} setPath={setPaths} />
            </AccordionDetails>
          </Accordion>
          <div className='submit-buttons'>
            <button className='client_submit reset' type='button' onClick={openReset}>
              Formani tiklash
              <AiOutlineClear />
            </button>
            <button type='submit' disabled={disable} className={`client_submit submit ${disable ? "disabled" : ""}`}>
              Mijoz qo'shish
              <AiOutlineUserAdd />
            </button>
          </div>
        </form >
      </div >
    </>
  )
}

export default ClientForm