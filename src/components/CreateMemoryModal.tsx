import Modal from 'react-modal'
import { Memory } from '../utils/types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InputError } from './InputError'

Modal.setAppElement('#root')
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    padding: '2rem',
  },
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.string().required('Date is required'),
})

interface MemoryModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onSaveMemory: (memory: Memory) => void
}

export function CreateMemoryModal({
  isOpen,
  onRequestClose,
  onSaveMemory,
}: MemoryModalProps) {
  const initialMemory:Memory = {
    title: '',
    description: '',
    date: '',
    imageUrl: '',
  }
  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onRequestClose}>
      <Formik
        initialValues={initialMemory}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSaveMemory(values)
          resetForm()
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors }) => {
          return (
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <h3 className='text-2xl text-center'>
                Let's create your new&nbsp;memory
              </h3>
              <div>
                <label className='flex flex-col'>
                  <span className='uppercase text-xs'>Title</span>
                  <input
                    className='w-full border-solid border rounded'
                    name='title'
                    type='text'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                </label>
                {errors.title ? <InputError error={errors.title} /> : null}
              </div>
              <div>
                <label className='flex flex-col'>
                  <span className='uppercase text-xs'>Description</span>
                  <textarea
                    rows={3}
                    className='w-full border-solid border rounded'
                    name='description'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                </label>
                {errors.description ? <InputError error={errors.description} /> : null}
              </div>
              <div>
                <label className='flex flex-col'>
                  <span className='uppercase text-xs'>Date</span>
                  <input
                    className='w-full border-solid border rounded'
                    type='date'
                    name='date'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                  />
                </label>
                {errors.date ? <InputError error={errors.date} /> : null}
              </div>
              <div className='flex flex-col gap-2'>
                <button
                  className='flex items-center justify-center border rounded p-1 bg-black text-white '
                  type='submit'
                >
                  Save
                </button>
                <button
                  className='flex items-center justify-center border rounded p-1'
                  type='button'
                  onClick={() => onRequestClose()}
                >
                  Cancel
                </button>
              </div>
            </form>
          )
        }}
      </Formik>
    </Modal>
  )
}
