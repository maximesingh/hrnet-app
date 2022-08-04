import React, { useState } from 'react';
import close from "../../assets/close.png"
import INPUT_DATA from '../../data/INPUT_DATA.json';
import DROPDOWN_DATA from '../../data/DROPDOWN_DATA.json';
import EMPLOYEES_LIST from '../../data/MOCK_DATA.json';
import icoAdd from '../../assets/ico-user-add.jpg';
import './form.css';
import Input from '../Input/Input';
import Dropdown from '../Dropdown/Dropdown';
import Modal from 'react-modal'
/**
 * Form
 * @returns {Reactnode}  jsx injected in DOM
 */
 export default function Form() {
  const initialState = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      street: '',
      city: '',
      zipCode: '',
      stateAbbrev: '',
      startDate: '',
      department: '',
    };
  const [newEmployee, setNewEmployee] = useState(initialState);

  const [modalIsOpen, setIsOpen] = useState(false);

// MODAL
function openModal() {
    setIsOpen(true);
    }

function closeModal() {
setIsOpen(false);
}

    const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '400px',
        height: '300px',
        background: '#f2f2f2',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    };  
   
  
// ON CHANGE
const handleChange = (e) => {
  setNewEmployee({ ...newEmployee, [e.target.id]: e.target.value.trim() });
};

// GET DATA
let employeesList =
  
  JSON.parse(window.localStorage.getItem('employeesList')) || EMPLOYEES_LIST;

// ON SUBMIT
const handleSubmit = (e) => {
  e.preventDefault();
  // update data
  employeesList = employeesList || [];
  employeesList.push(newEmployee);
  // complete / correct data
  newEmployee.id = employeesList.length;
  newEmployee.dateOfBirth = newEmployee.dateOfBirth.replace(/-/g, '/');
  newEmployee.startDate = newEmployee.startDate.replace(/-/g, '/');
  // store data
  window.localStorage.setItem('employeesList', JSON.stringify(employeesList));
  // reset form
  setNewEmployee({ ...newEmployee }, e.target.reset());

  openModal();
};
  return (
      <form action="" className="form-newEmployee" onSubmit={handleSubmit}>
      <img
        className="form-newEmployee--ico"
        src={icoAdd}
        alt="add employee icon"
      />

      {INPUT_DATA.map((data, index) => (
        <Input
          key={index}
          type={data.type}
          className={data.className}
          htmlFor={data.id}
          label={data.label}
          id={data.id}
          value={newEmployee[index]}
          handleChange={handleChange}
          autoComplete="off"
        />  
      ))}

      <fieldset
        id="addressContainer"
        className="form-newEmployee--addressContainer"
      >
        <legend className="form-newEmployee--addressGroup">Address</legend>
      </fieldset>

      {DROPDOWN_DATA.map((data, index) => (
        <Dropdown
          key={index}
          type={data.type}
          className={data.className}
          htmlFor={data.id}
          label={data.label}
          id={data.id}
          select={data.select}
          handleChange={handleChange}
        />
      ))}

      <button
        type="submit"
        className="submit form-newEmployee--submit"
      >
        Save
      </button>

    </form>
  );
};