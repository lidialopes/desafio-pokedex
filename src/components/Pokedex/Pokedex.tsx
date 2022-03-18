import React from 'react';
import { Divider, List } from 'antd';

import './Pokedex.css';
import PokemonCard from '../PokemonCard/PokemonCard';
import PokedexContext from '../../contexts/PokedexContext';

const Pokedex: React.FC = () => {
    return (
        <PokedexContext.Consumer>
            {({pokedex, setPokedex}) => (
                <div className='pokedexContainer'>
                    <Divider orientation='left'>Pokédex</Divider>
                    <div className='pokedexContent'>
                        <List
                            grid={{ gutter: 16, column: 4 }}
                            dataSource={pokedex}
                            renderItem={item => 
                                <List.Item>
                                    <PokemonCard type='pokedex' pokemon={item}/>
                                </List.Item>
                            }
                        />
                    </div>
                </div>
            )}
        </PokedexContext.Consumer>
    );
}

export default Pokedex;