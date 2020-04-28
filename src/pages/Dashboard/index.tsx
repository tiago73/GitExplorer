import React,{useState, FormEvent} from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../service/api';
import {FiChevronRight, FiAlertCircle} from 'react-icons/fi';
import LogoImg from '../../assets/logo.svg';

import {Title, Form,Repositorio,Error} from "./styles";
import Repository from "../Repository";


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

    const [repositories, setRepositories] = useState<Repository[]>([]);

    const[inputError, setInputError] = useState('');

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{

    event.preventDefault();
    if(!newRepo){

       toast.error("Digite o autor/Nome do repositorio");
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

            toast.error("Erro na busca desse repository!");
    }

}

    return (
        <>
        <img src={LogoImg} alt="GitHub EXplorer"/>
        <Title>Explore repository no GitHub</Title>

        <Form hasError={!!inputError} onSubmit={handleAddRepository}>
            <input value={newRepo}
            onChange={(e)=> setNewRepo(e.target.value)}
            placeholder="Escreva o nome do repositorio"/>
            <button type="submit">Pesquisa</button>
        </Form>
    {inputError && <Error>{inputError}</Error>}
        <Repositorio>
            {repositories.map((Repository)=>(
                            <a key={Repository.full_name} href="teste">
                            <img src={Repository.owner.avatar_url} alt={Repository.owner.login}/>
                            <div>
             <strong>{Repository.full_name}</strong>
             <p>{Repository.description}</p>
                            </div>
                            <FiChevronRight size={20}/>

                        </a>
            ))}
        </Repositorio>

        </>
        )
}
export default Dashboard;
