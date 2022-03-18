import { Card, Image, Tooltip } from 'antd'
import { MinusOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';

import './PokemonCard.css';
import Pokemon from '../../model/Pokemon';
import PokedexContext from '../../contexts/PokedexContext';
import { createRef, useRef } from 'react';
import PokemonDetailsModal, { PokemonDetailsModalRef } from '../PokemonDetailsModal/PokemonDetails.modal';

export type CardType = 'pokedex' | 'filter';
export type CardSize = 'default' | 'small';

export interface PokemonCardProps {
    type: CardType;
    size?: CardSize;
    pokemon: Pokemon;
    onShowDetails?: (pokemon: Pokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = (props) => {
    const pokemonDetailsModalRef = createRef<PokemonDetailsModalRef>(); 

    return (
        <PokedexContext.Consumer>
            {({pokedex, setPokedex}) => (
                <Card 
                    title={props.pokemon.name} 
                    size={props.size ?? 'small'} 
                    className='cardContainer'
                    headStyle={{backgroundColor: '#d1092b', color: 'white'}}
                    actions={props.type === 'pokedex' 
                        ? [
                            <Tooltip title='Excluir da Pokédex'>
                                <MinusOutlined key='remove' 
                                    className='cardAction'
                                    onClick={() => setPokedex(pokedex.filter(item => item.id !== props.pokemon.id))} 
                                />
                            </Tooltip>,
                            <Tooltip title='Ver detalhes'>
                                <InfoCircleOutlined key='details' 
                                    className='cardAction'
                                    onClick={() => pokemonDetailsModalRef.current?.open(props.pokemon)} 
                                />
                            </Tooltip>
                        ] 
                        : [
                            <Tooltip title={pokedex.includes(props.pokemon) ? 'Pokémon já adicionado à Pokédex' : 'Adicionar à Pokédex'}>
                                <PlusOutlined key='add' 
                                    className={pokedex.includes(props.pokemon) ? 'disabled' : 'cardAction'}
                                    onClick={() => {
                                        if (!pokedex.includes(props.pokemon)) {
                                            setPokedex([...pokedex, props.pokemon])} 
                                        }
                                    } 
                                />
                            </Tooltip>
                        ]
                    }
                >
                    <div className='cardContent'>
                        <Image width={200} src={props.pokemon.image} />
                    </div>
                    <PokemonDetailsModal ref={pokemonDetailsModalRef} />
                </Card>
            )}
        </PokedexContext.Consumer>
    );
}

export default PokemonCard;