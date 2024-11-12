import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import LifeSkills from './pages/LifeSkills';
import ToolKit from './pages/ToolKit';
// import Footer from './components/Footer';
import ProfessionalBrandingResume from './pages/GettingToKnowYourself';
import EffectiveCommunicationAndNetworking from './pages/EffectiveCommunicationAndNetwork';
import CraftingThePerfectElevatorPitch from './pages/CraftingThePerfectElevatorPitch';
import BusinessEtiquette from './pages/BusinessEtiquette';
import TimeManagement from './pages/TimeManagement';
import TechnicalInterviewPrep from './pages/TechnicalPrepInterview'
import JobSearch from './pages/JobSearch'
import ManagingMoneyAndPayment from './pages/ManagingMoneyAndPayment'
import WorkingInTeams from './pages/WorkingInTeams'
import ResumeUploaderPage from './components/ResumeUploaderPage';
import AcingTheInterview from './pages/AcingTheInterview';
import OnTheJobSuccess from './pages/OnTheJobSuccess';
import KableAcademyFinalSteps from './pages/KableAcademyFinalSteps';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<LifeSkills/>} />
          <Route path='/toolkit' element={<ToolKit />} />
          <Route path='/professional-branding-and-resume' element={<ProfessionalBrandingResume />} />
          <Route path='/effective-communication-and-networking' element={<EffectiveCommunicationAndNetworking />} />
          <Route path='/crafiting-the-perfict-elevator-pitch' element={<CraftingThePerfectElevatorPitch />} />
          <Route path='/business-etiquette' element={<BusinessEtiquette />} />
          <Route path='/acing-the-interview' element={<AcingTheInterview />} />
          <Route path='/time-managment' element={<TimeManagement />} />
          <Route path='/working-in-teams' element={<WorkingInTeams />} /> 
          <Route path='/technical-interview-prep' element={<TechnicalInterviewPrep/>} />
          <Route path='/job-search' element={<JobSearch />} />
          <Route path='/on-the-job-success' element={<OnTheJobSuccess/>} />
          <Route path='/kable-academy-final-steps' element={<KableAcademyFinalSteps />} />
          <Route path='/managing-money-and-payments' element={<ManagingMoneyAndPayment />} />
          <Route path='/resume-upload' element={<ResumeUploaderPage />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
