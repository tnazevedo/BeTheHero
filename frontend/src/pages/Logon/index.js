import React,{useState} from 'react';
import  {Link, useHistory} from 'react-router-dom';
import './styles.css';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

// import { Container } from './styles';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon({children}) {
  const[id,setId]= useState('');
  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();
    try{
        const res = await api.post('/sessions', {id});
        console.log(res.data.name);
        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', res.data.name);
        history.push('/profile');



    }catch(err){
      alert('Falha no login tente novamente')

    }


  }
  return (
      <div className="logon-container">
          <section className="form">
            <img src={logoImg} alt="Be The Hero" srcset=""/>
            <form onSubmit={handleLogin}>
                <h1>Faça seu logon</h1>
                <input  
                  placeholder="Sua ID"
                  value={id}
                  onChange={e=> setId(e.target.value)}
                  
                  />
                <button className="button"type="submit">Entrar</button>
                < Link className="back-link"to = "/register"><FiLogIn size={16} color="#e02041"/> Não tenho Cadastro</Link>
            
            </form>

          </section>
          
          <img src={heroesImg} alt="Heroes" srcset=""/>
      </div>
    
  );
}
