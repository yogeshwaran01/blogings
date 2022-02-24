import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header'
import Footer from './components/Footer';
import Home from './pages/Home';
import Post from './components/Post';
import Profile from './pages/Profile';
import Me from './pages/Me'
import Create from './pages/Create';
import Edit from './pages/Edit';

function App() {
  // let isAuth = localStorage.getItem('isAuth')
  return (
    <>
      <Header />
      <Router>
        <div>
          <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/' element={<Home />} />
            <Route path='/blog/:id' element={<Post />}/>
            <Route path='/user/:userName' element={<Profile />}/>
            <Route path='/me' element={<Me />} />
            <Route path='/create' element={<Create />} />
            <Route path='/edit/:id' element={<Edit />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>

  );
}

export default App;
