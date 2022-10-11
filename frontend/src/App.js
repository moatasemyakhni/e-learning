import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landing';
import Student from './components/Student';
import StudentAssignment from './components/student/StudentAssignment';
import StudentCourse from './components/student/StudentCourse';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentAnnouncements from './components/student/StudentAnnouncements';
import Instructor from './components/Instructor';
import InstructorCourse from './components/instructor/InstructorCourse';
import InstructorAnnouncements from './components/instructor/InstructorAnnouncements';
function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element= {<Login />} />
          <Route path="/signup" element= {<Signup user_types={['student', 'instructor', 'admin']} api={'register'} />} />
          <Route path="/landing" element= {<Landing />} />
          <Route path="/student/*" element= {<Student />} />
          <Route path="/instructor/*" element= {<Instructor />} />
          
        </Routes>
        
        <Routes>
          <Route path="/student/assignments" element= {<StudentAssignment />} />
          <Route path="/student/courses" element= {<StudentCourse />} />
          <Route path="/student/announcements" element= {<StudentAnnouncements />} />
        </Routes>

        <Routes>
          <Route path="/instructor/courses" element= {<InstructorCourse />} />
          <Route path="/instructor/announcements" element= {<InstructorAnnouncements />} />
        </Routes>
      </div>
  );
}

export default App;
