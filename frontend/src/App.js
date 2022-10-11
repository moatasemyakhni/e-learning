import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Student from './components/Student';
import StudentAssignment from './components/student/StudentAssignment';
import StudentCourse from './components/student/StudentCourse';
import { Routes, Route } from "react-router-dom";
import StudentAnnouncements from './components/student/StudentAnnouncements';
import Instructor from './components/Instructor';
import InstructorAssignment from './components/instructor/InstructorAssignment';
import InstructorAnnouncements from './components/instructor/InstructorAnnouncements';
import Admin from './components/Admin';
import AdminAddPeople from './components/admin/AdminAddPeople';
import AdminAddCourse from './components/admin/AdminAddCourse';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element= {<Login />} />
        <Route path="/signup" element= {<Signup user_types={['student', 'instructor', 'admin']} api={'register'} />} />
        <Route path="/student/*" element= {<Student />} />
        <Route path="/instructor/*" element= {<Instructor />} />
        <Route path="/admin/*" element= {<Admin />} />       
      </Routes>
      
      <Routes>
        <Route path="/student/assignments" element= {<StudentAssignment />} />
        <Route path="/student/courses" element= {<StudentCourse />} />
        <Route path="/student/announcements" element= {<StudentAnnouncements />} />
      </Routes>

      <Routes>
        <Route path="/instructor/assignments" element= {<InstructorAssignment />} />
        <Route path="/instructor/announcements" element= {<InstructorAnnouncements />} />
      </Routes>

      <Routes>
        <Route path="/admin/people" element= {<AdminAddPeople />} />
        <Route path="/admin/course" element= {<AdminAddCourse />} />
      </Routes>
    </div>
  );
}

export default App;
