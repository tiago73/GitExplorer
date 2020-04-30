import React,{useState, FormEvent,useEffect} from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';

import api from '../../service/api';
import {FiChevronRight} from 'react-icons/fi';
import LogoImg from '../../assets/logo.svg';

import {Title, Form,Repositorio,Error,Logo} from "./styles";
//import Repository from "../Repository";

interface Repository{
    full_name: string;
    description:String;
    owner:{
        login:string;
        avatar_url: string;
    };
}

toast.configure()


const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');

    const [repositories, setRepositories] = useState<Repository[]>(()=>{
        const storagedRepositories = localStorage.getItem(
            '@GithubExplorer:repositories'
        );
        if(storagedRepositories){
            return JSON.parse(storagedRepositories);
        }
        return [];
    });
    useEffect(()=> {
        localStorage.setItem('@GithubExplorer:repositories',
        JSON.stringify(repositories));

    },[repositories]);

    const[inputError, setInputError] = useState('');

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{

    event.preventDefault();

    if(!newRepo){
       setInputError("Digite o autor/Nome do repositorio");
       {inputError && toast.error(inputError)}
       return;
    }
    try{
        const response = await api.get<Repository>(`repos/${newRepo}`);
        toast.success("sucesso")

        const repository = response.data;
        setRepositories([...repositories,repository]);
        setNewRepo('');
        setInputError('');
    }catch(err){
            setInputError("Erro na busca desse repository!");
            {inputError && toast.error(inputError)}

    }

}

    return (
        <>
        <Logo src={LogoImg} alt="GitHub EXplorer"/>
        <Title>Explore repository no GitHub</Title>

        <Form hasError={!!inputError} onSubmit={handleAddRepository}>
            <input value={newRepo}
            onChange={(e)=> setNewRepo(e.target.value)}
            placeholder="Escreva o nome do repositorio"/>
            <button type="submit">Pesquisa</button>
        </Form>

        <Repositorio>
            {repositories.map((Repository)=>(
                            <Link key={Repository.full_name} to={`/Repository/${Repository.full_name}`}>
                            <img src={Repository.owner.avatar_url} alt={Repository.owner.login}/>
                            <div>
             <strong>{Repository.full_name}</strong>
             <p>{Repository.description}</p>
                            </div>
                            <FiChevronRight size={20}/>

                        </Link>
            ))}
        </Repositorio>

        </>
    )
}
export default Dashboard;
