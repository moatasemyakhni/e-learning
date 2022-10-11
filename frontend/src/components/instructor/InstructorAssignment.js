import axios from 'axios';
import {useRef, useState, useEffect} from 'react';
import WaitingSection from '../WaitingSection';
import CommandForm from '../CommandForm';


const InstructorAssignment = () => {


  return (
    <CommandForm name={'Assignments'} api={'create_assignment'} />
  )
}

export default InstructorAssignment