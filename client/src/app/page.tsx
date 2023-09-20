'use client'

import s from './home.module.css'
import { Task } from './components/task/Task'
import { useState } from 'react'
import Modal from "./components/modal/modal";
import useModal from "./hooks/useModal";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from 'next/image';

type Inputs = {
  text: string,
};

export default function Home() {

  const [tasks, setTasks] = useState([
    { id: 1, isDone: false, name: 'learn 1', date: '19.09.2023' },
    { id: 2, isDone: false, name: 'learn 2', date: '19.09.2023' },
    { id: 3, isDone: false, name: 'learn 3', date: '19.09.2023' },
  ])

  const { isOpen, toggle } = useModal();



  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      text: ''
    }
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    const newTask = {
      id: tasks.length + 1,
      isDone: false,
      name: data.text,
      date: ''
    }

    tasks.push(newTask)
    reset({
      text: ''
    })
    toggle()
    setActiveFilter('')
  };

  const onClose = () => {
    toggle()
    errors.text = undefined
    setActiveFilter('')
  }


  const [activeFilter, setActiveFilter] = useState('')


  return (
    <div>
      <div className={s.taskContainer}>

        <div className={s.taskSettings}>

          <div className={s.topBar}>

            <button onClick={() => setActiveFilter('Today')} className={activeFilter == 'Today' ? s.btn_active : s.btn} role="button">
              <Image src={activeFilter == 'Today' ? 'vectorActive.svg' : 'vector.svg'} alt='' width={24} height={24} />
              Today
            </button>

            <button onClick={() => setActiveFilter('All')} className={activeFilter == 'All' ? s.btn_active : s.btn} role="button">
              <Image src={activeFilter == 'All' ? 'doneActive.svg' : 'done.svg'} alt='' width={24} height={24} />
              All
            </button>

            <button onClick={() => setActiveFilter('Date')} className={activeFilter == 'Date' ? s.btn_active : s.btn} role="button">
              <Image src={activeFilter == 'Date' ? 'dateActive.svg' : 'date.svg'} alt='' width={24} height={24} />
              Date
            </button>
          </div>

          <div className={s.bottomBar}>
            <button onClick={() => { setActiveFilter('addTask'), toggle() }} className={activeFilter == 'addTask' ? s.btn_active : s.btn} role="button" >
              <Image src={activeFilter == 'addTask' ? 'addActive.svg' : 'add.svg'} alt='' width={24} height={24} />
              Add task
            </button>
          </div>
        </div>

        <div className={s.taskBoard}>
          {tasks.map((obj, index) => (
            <Task key={index} isDone={obj.isDone} name={obj.name} date={obj.date} />
          ))}
        </div>
      </div>


      <Modal isOpen={isOpen} toggle={toggle} setActive={() => setActiveFilter('')}>

        <div className={s.modalTitle} >
          Crate task
        </div>
        <div className={s.modalContent} >

          <form onSubmit={handleSubmit(onSubmit)}>

            <input
              className={s.text_input}
              placeholder='Enter text'
              {...register("text", { required: true })}
            />

            {errors.text ? <div className={s.form_error}>This field should not be empty</div> : <div><br /></div>}

            <div className={s.form_btns}>

              <button className={s.submit_button + ' ' + s.form_buttons} type="submit">
                <Image src='Check_ring.svg' alt='Save' width={30} height={30} />
                <p>Save</p>
              </button>

              <button className={s.close_button + ' ' + s.form_buttons} onClick={onClose}>
                <Image src='close.svg' alt='Close' width={30} height={30} />
                <p>Close</p>
              </button>

            </div>
          </form>
        </div>

      </Modal>
    </div>
  )
}
