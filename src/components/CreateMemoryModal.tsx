import Modal from 'react-modal'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InputError } from './InputError'
import { Memory } from '../utils/types'
import { createMemory, updateMemory } from '../utils/service'

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
  name: Yup.string().required('Title is required').max(30, 'Title is too long'),
  description: Yup.string().required('Description is required'),
  timestamp: Yup.string().required('Date is required'),
})

interface MemoryModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onSaveMemory: () => void
  selectedMemory?: Memory
  userId: number
}

export function CreateMemoryModal({
  isOpen,
  onRequestClose,
  onSaveMemory,
  selectedMemory,
  userId,
}: MemoryModalProps) {

  const initialMemory:Memory = {
    name: selectedMemory?.name ?? '',
    description: selectedMemory?.description ?? '',
    timestamp: selectedMemory?.timestamp ?? '',
    imageUrl: selectedMemory?.imageUrl ?? '',
    userId: selectedMemory?.userId ?? userId,
  }
  const handleSaveMemory = async (memory: Memory) => {
    if (selectedMemory) {
      await updateMemory(selectedMemory.id as number, {
        ...memory,
        userId,
      })
    } else {
      await createMemory(memory)
    }
    onSaveMemory()
  }
  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onRequestClose}>
      <Formik
        initialValues={initialMemory}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSaveMemory(values)
          resetForm()
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => {
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
                    name='name'
                    type='text'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </label>
                {errors.name && touched.name ? <InputError error={errors.name} /> : null}
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
                {errors.description && touched.description ? <InputError error={errors.description} /> : null}
              </div>
              <div>
                <label className='flex flex-col'>
                  <span className='uppercase text-xs'>Date</span>
                  <input
                    className='w-full border-solid border rounded'
                    type='date'
                    name='timestamp'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.timestamp}
                  />
                </label>
                {errors.timestamp && touched.timestamp ? <InputError error={errors.timestamp} /> : null}
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
