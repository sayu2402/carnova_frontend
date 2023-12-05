import React, {useContext , useEffect} from 'react'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user, itspartner } = useContext(AuthContext);
  const navigate = useNavigate();

  // prevent loged in user from going back
  useEffect(() => {
    if (user || itspartner) {
      navigate('/'); 
    }
  }, [user, itspartner, navigate]);


  return (
    <div className='bg-slate-200'>
      Home
    </div>
  )
}

export default Home
