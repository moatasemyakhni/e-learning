import Signup from "../Signup"


const AdminAddPeople = () => {
  return (
    <Signup user_types={['student', 'instructor']} api={'register_people'} />
  )
}

export default AdminAddPeople