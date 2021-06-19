import './App.css';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import AdminLogin from './Login/AdminLogin/AdminLogin';
import { Redirect, Route, Switch } from 'react-router';
import StudentLogin from './Login/StudentLogin/StudentLogin';
import TeacherLogin from './Login/TeacherLogin/TeacherLogin';
import Footer from './Footer/Footer';
import StudentProfile from './Student/StudentProfile/StudentProfile';
import TeacherProfile from "./Teacher/TeacherProfile/TeacherProfile";
import AdminProfile from './Admin/AdminProfile/AdminProfile';
import StudentHome from './Student/StudentHome/StudentHome';
import AllCoursesS from './Student/AllCourses/AllCourses';
import Course from './Student/Course/Course';
import MaterialView from './Student/MaterialView/MaterialView';
import Assignment from './Student/Assignment/Assignment';
import Quiz from './Student/Quiz/Quiz';
import QuizStart from './Student/QuizStart/QuizStart';
import AllCoursesT from './Teacher/AllCourses/AllCourses';
import CourseT from './Teacher/Course/Course';
import CreateCourse from './Teacher/CreateCourse/CreateCourse';
import AddAssignment from './Teacher/AddAssignment/AddAssignment';
import AddQuiz from './Teacher/AddQuiz/AddQuiz';
import AddMaterial from './Teacher/AddMaterial/AddMaterial';
import AllAttempts from './Teacher/AllAttempts/AllAttempts';
import Attempt from './Teacher/Attempt/Attempt';
import AllSubmissions from './Teacher/AllSubmissions/AllSubmissions';
import Submission from './Teacher/Submission/Submission';
import Enrolled from './Teacher/Enrolled/Enrolled';
import StudentReport from './Teacher/StudentReport/StudentReport';
import AdminHome from './Admin/AdminHome/AdminHome';
import AddStudent from './Admin/AddStudent/AddStudent';
import RemoveStudent from './Admin/RemoveStudent/RemoveStudent';
import AddDepartment from './Admin/AddDepartment/AddDepartment';
import RemoveDepartment from './Admin/RemoveDepartment/RemoveDepartment';
import AddTeacher from './Admin/AddTeacher/AddTeacher';
import RemoveTeacher from './Admin/RemoveTeacher/RemoveTeacher';
import Posts from './Blog/Posts/Posts';
import Post from './Blog/Post/Post';
import { useSelector } from 'react-redux';
import NotFound from './NotFound/NotFound';
import ViewSubmission from './Student/ViewSubmission/ViewSubmission';
import ViewAssignment from './Student/ViewAssignment/ViewAssignment';
import ViewAssignmentT from './Teacher/ViewAssignmentT/ViewAssignmentT';

function App() {

  const userType = useSelector(state => state.auth.userType);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  let routes =  <Switch>
                    <Route path='/' component={Login} exact/>
                    <Route path='/Login/AdminLogin' component={AdminLogin} exact/>
                    <Route path='/Login/TeacherLogin' component={TeacherLogin} exact/>
                    <Route path='/Login/StudentLogin' component={StudentLogin} exact/>
                    <Redirect to='/'/>
                </Switch>
  
  if(userType==='Admin' && isAuthenticated){
    routes =  <Switch>
                    <Route path='/NotFound' component={NotFound} exact/>
                    <Route path='/Admin/Profile' component={AdminProfile} exact/>
                    <Route path='/Admin/Home' component={AdminHome} exact/>
                    <Route path='/Admin/AddStudent' component={AddStudent} exact/>
                    <Route path='/Admin/RemoveStudent' component={RemoveStudent} exact/>
                    <Route path='/Admin/AddDepartment' component={AddDepartment} exact/>
                    <Route path='/Admin/RemoveDepartment' component={RemoveDepartment} exact/>
                    <Route path='/Admin/AddTeacher' component={AddTeacher} exact/>
                    <Route path='/Admin/RemoveTeacher' component={RemoveTeacher} exact/>
                    <Route path='/Blog' component={Posts} exact/>
                    <Route path='/Blog/:postID' component={Post} exact/>
                    <Redirect to='/NotFound'/>
              </Switch>
  }

  if(userType==='Teacher' && isAuthenticated){
    routes =  <Switch>
                    <Route path='/NotFound' component={NotFound} exact/>
                    <Route path='/Teacher/Profile' component={TeacherProfile} exact/>
                    <Route path='/Teacher/:dept/:teacher' component={AllCoursesT} exact/>
                    <Route path='/Teacher/:dept/:teacher/Course/:courseID' component={CourseT} exact/>
                    <Route path='/Teacher/:dept/:teacher/CreateCourse' component={CreateCourse} exact/>
                    <Route path='/Teacher/:dept/:teacher/Course/:courseID/CreateAssignment' component={AddAssignment} exact/>
                    <Route path='/Teacher/:dept/:teacher/Course/:courseID/CreateQuiz' component={AddQuiz} exact/>
                    <Route path='/Teacher/:dept/:teacher/Course/:courseID/Enrolled' component={Enrolled} exact/>
                    <Route path='/Teacher/:dept/:teacher/Course/:courseID/Enrolled/:studentID' component={StudentReport} exact/>
                    <Route path='/Teacher/:dept/:teacher/Course/:courseID/Assignments/:assignmentID' component={AllSubmissions} exact/>
                    <Route path='/Teacher/:dept/:teacher/Course/:courseID/Assignments/:assignmentID/Submissions/:submissionID' component={Submission} exact/>
                    <Route path='/Teacher/:dept/:teacher/Course/:CourseID/Assignment/:assignmentID/ViewAssignment' component={ViewAssignmentT} exact/>
                    <Route path='/Teacher/:dept/:teacher/Course/:courseID/Quiz/:quizID' component={AllAttempts} exact/>
                    <Route path='/Teacher/:dept/:teacher/Course/:courseID/Quiz/:quizID/Attempt/:attemptID' component={Attempt} exact/>
                    <Route path='/Teacher/:dept/:teacher/Course/:courseID/UploadMaterial' component={AddMaterial} exact/>
                    <Route path='/Teacher/:dept/:teacher/Course/:courseID/Material/:materialID' component={MaterialView} exact/>
                    <Route path='/Blog' component={Posts} exact/>
                    <Route path='/Blog/:postID' component={Post} exact/>
                    <Redirect to='/NotFound'/>
              </Switch>
  }

  if(userType==='Student' && isAuthenticated){
      routes =  <Switch>
                    <Route path='/Student/Profile' component={StudentProfile} exact/>
                    <Route path='/Student/:dept' component={StudentHome} exact/>
                    <Route path='/Student/:dept/:teacher' component={AllCoursesS} exact/>
                    <Route path='/Student/:dept/:teacher/Course/:CourseID' component={Course} exact/>
                    <Route path='/Student/:dept/:teacher/Course/:CourseID/Material/:materialID' component={MaterialView} exact/>
                    <Route path='/Student/:dept/:teacher/Course/:CourseID/Assignment/:assignmentID' component={Assignment} exact/>
                    <Route path='/Student/:dept/:teacher/Course/:CourseID/Assignment/:assignmentID/View' component={ViewSubmission} exact/>
                    <Route path='/Student/:dept/:teacher/Course/:CourseID/Assignment/:assignmentID/ViewAssignment' component={ViewAssignment} exact/>
                    <Route path='/Student/:dept/:teacher/Course/:CourseID/Quiz' component={Quiz} exact/>
                    <Route path='/Student/:dept/:teacher/Course/:CourseID/Quiz/:quizID' component={QuizStart} exact/>
                    <Route path='/Blog' component={Posts} exact/>
                    <Route path='/Blog/:postID' component={Post} exact/>
                    <Redirect to='/NotFound'/>
                </Switch>
  }

  return (
    <div className="App">
        <Navbar/>
        {routes}
        <Footer/>
    </div>
  );
}

export default App;
