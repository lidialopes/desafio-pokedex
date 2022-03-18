import { useEffect, useState } from 'react';
import { Input, Button, Typography  } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import './Home.css';
import api from '../../services/api';
import Pokemon from '../../model/Pokemon';
import Pokedex from '../../components/Pokedex/Pokedex';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

const { Title } = Typography;

const Home: React.FC = () => {
    const [filterText, setFilterText] = useState('');
    const [showEmptyMessage, setShowEmptyMessage] = useState(false);
    const [filteredPokemon, setFilteredPokemon] = useState<Pokemon>();
    const [isLoadingData, setIsLoadingData] = useState(false);

    const handlePokemonSearch = async () => {
        setFilteredPokemon(undefined);
        try {
            setIsLoadingData(true);
            const res = await api.get(`/pokemon/${filterText}`);
            const pokemon: Pokemon = {
                id: res.data.id,
                name: res.data.name,
                image: res.data.sprites.front_default,
                weight: res.data.weight,
                height: res.data.height,
                types: res.data.types,
                abilities: res.data.abilities,
                stats: res.data.stats,
            }
            setFilteredPokemon(pokemon);
        } catch (error) {
            console.error(error);
            setShowEmptyMessage(true);
        } finally {
            setIsLoadingData(false);
        }
    };

    useEffect(() => {
        if (filterText === '') {
            setFilteredPokemon(undefined);
            if (showEmptyMessage) {
                setShowEmptyMessage(false);
            }
        }
    }, [filterText]);

    return (
        <div className='container'>
            <Title>Desafio Pokédex</Title>
            <div className='filterContainer'>
                <Input 
                    value={filterText}
                    className='inputFilter'
                    placeholder="Nome ou Número do Pokémon"
                    allowClear
                    onPressEnter={e => {
                        e.preventDefault();
                        handlePokemonSearch();
                    }}
                    onChange={e => setFilterText(e.target.value)} 
                />
                <Button 
                    type='primary'
                    style={{backgroundColor: '#d1092b', borderColor: '#d1092b'}}
                    icon={<SearchOutlined />}
                    loading={isLoadingData}
                    onClick={e => {
                        e.preventDefault();
                        handlePokemonSearch();
                    }} 
                >Pesquisar</Button>
            </div>
            <div className='filteredPokemonContainer'>
                {filteredPokemon 
                    ? <PokemonCard type='filter' pokemon={filteredPokemon} />
                    : filterText !== '' 
                        ? <span className={showEmptyMessage ? 'emptyMessage' : 'emptyMessageHidden'}>Pokémon não encontrado! Verifique se o nome (ou número) está correto.</span>
                        : <></>
                }
            </div>
            <Pokedex />
         </div>   
    );
};

export default Home;