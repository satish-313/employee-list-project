import {useState} from 'react';

const useForm = (intialValues) => {
  const [values,setValues] = useState(intialValues)

  return [
    values,
    e => {
      setValues({
        ...values,[e.target.name]: e.target.value
      })
    }
  ]
}

export default useForm;