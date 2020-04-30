import React,{useState,useEffect} from "react";
import {Header, RepositorioInfo, Issues} from './styles';
import LogoImg from '../../assets/logo.svg';
import { FiChevronRight, FiChevronLeft,FiStar,} from 'react-icons/fi'
import { AiOutlineFork,AiFillFolderOpen} from 'react-icons/ai'
import {useRouteMatch,Link} from 'react-router-dom';
import api from "../../service/api";


interface RepositoryParems{
    repository: string
}
interface Repository{
    full_name: string;
    description:String;
    stargazers_count: number;
    forks_count:number;
    open_issues_count:number;
    owner:{
        login:string;
        avatar_url: string;
    };

}
interface Issuer{
 id: number;
 title:string;
 html_url: string;
 user:{
     login:string;
 }
}
const Repository: React.FC = () => {
    const [repositorio, sertRepository] = useState<Repository | null>(null)
    const[issues, setIssues] = useState<Issuer[]>([]);

    const {params}=useRouteMatch<RepositoryParems>();

useEffect(()=> {
    api.get(`repos/${params.repository}`).then((response)=> {
        sertRepository(response.data)
      });
      api.get(`repos/${params.repository}/issues`).then((response)=>{
          setIssues(response.data);
      });
},[params.repository]);

return(
    <>
<Header>

    <img src={LogoImg} alt="Github Explore"/>

    <Link to="">
    <FiChevronLeft size={16}/>
    Volta
    </Link>
</Header>
{repositorio && (
    <RepositorioInfo>
        <header>
            <img src={repositorio.owner.avatar_url} alt=""/>
            <div>
                <strong>{repositorio.full_name}</strong>
                <p> {repositorio.description}</p>
            </div>
        </header>

        <ul>
          <li>
            <strong>{repositorio.stargazers_count}</strong>

           <span> < FiStar size={20}/> Stars</span>
          </li>
          <li>
            <strong>{repositorio.forks_count}</strong>
            <span><AiOutlineFork size={20}/> Forks</span>
          </li>
          <li>
            <strong>{repositorio.open_issues_count}</strong>
           <span> <AiFillFolderOpen size={20} />Issues Abertas</span>
          </li>
        </ul>
    </RepositorioInfo>
)}

    <Issues>
{issues.map((issue)=>(
        <a key={issue.id} target="_blank" href={issue.html_url}>
        <div>

              <strong>{issue.title}</strong>
      <p>{issue.user.login}</p>
      </div>

    <FiChevronRight size={20}/>

 </a>
))}
    </Issues>
</>
);}

export default Repository;
