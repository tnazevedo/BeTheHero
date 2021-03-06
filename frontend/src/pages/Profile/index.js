import React,{useEffect,useState}from 'react';
import { Link , useHistory}from 'react-router-dom';
// import { Container } from './styles';
import {FiPower,FiTrash2} from 'react-icons/fi';
import LogoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.css';
export default function Profile() {
  const [incidents,setIncidents] = useState([])
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();
  useEffect(()=>{
    api.get('/profile',{
        headers:{
            authorization:ongId,
        }
    }).then(response => {
        setIncidents(response.data);

    })

  },[ongId]);

  async function handleDeleteIncident(id){
      try{
        await api.delete(`/incidents/${id}`,{
            headers:{
                authorization: ongId,
            }
        });
        setIncidents(incidents.filter(incident => incident.id !== id));

      }catch(err){
        alert('Erro ao deletar caso, tente novamente.')
      }

  }

  function handleLogout(){
      localStorage.clear();
      history.push('/');
  }
  return (
    <div className="profile-container">
        <header>
            <img src={LogoImg} alt="Be the Hero" srcset=""/>
            <span>Bem vinda, {ongName}</span>
            <Link to='/incidents/new' className="button" >Cadastrar novo caso</Link>
            <button type = "button" onClick={handleLogout}> <FiPower size={18} color="#e02041"/></button>


        </header>
        <h1>Casos Cadastrados</h1>
        <ul>
            {incidents.map(incident =>(
                <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>
                <strong>Descrição:</strong>
                <p>{incident.description}</p>
                <strong>VALOR:</strong>
                <p>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</p>
                <button onClick={()=>handleDeleteIncident(incident.id)}type="button"><FiTrash2 size={20} color="#a8a8b3"/></button>


            </li>
            ))}

            
        </ul>
    </div>

  );
}
