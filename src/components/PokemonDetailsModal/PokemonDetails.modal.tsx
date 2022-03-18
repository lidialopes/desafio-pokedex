import React, { useEffect, useImperativeHandle, useState } from 'react';
import axios from 'axios';
import { Collapse, Descriptions, Image, List, Modal, Popover, Tag } from 'antd';

import './PokemonDetails.modal.css';
import Pokemon from '../../model/Pokemon';
import PokemonCard from '../PokemonCard/PokemonCard';
import api from '../../services/api';

const { Panel } = Collapse;

export interface PokemonDetailsModalRef {
    open: (pokemon: Pokemon) => void;
}

const PokemonDetailsModal = React.forwardRef<PokemonDetailsModalRef>((props, ref) => {
    const [state, setState] = useState<{visible: boolean, pokemon?: Pokemon}>({visible: false});
    const [sameTypePokemons, setSameTypePokemons] = useState<Pokemon[]>([]);  

    const fetchSameTypePokemons = async (text: string) => {
        try {
            const res = await api.get(`/type/${text}`);
            const pokemonList = res.data.pokemon.map((item: Pokemon) => { return {
                id: item.id,
                name: item.name,
                image: item.sprites?.front_default,
                weight: item.weight,
                height: item.height,
                types: item.types,
                abilities: item.abilities,
                stats: item.stats,
            }});
            setSameTypePokemons(pokemonList);
        } catch (error) {
            console.error(error);
        } 
    }

    useImperativeHandle(ref, () => ({
        open: (pokemon: Pokemon) => {
            setState({visible: true, pokemon});
        }
    }));

    return (
        <Modal
            visible={state.visible}
            title={state.pokemon?.name}
            okButtonProps={{hidden: true}}
            cancelButtonProps={{hidden: true}}
            onCancel={() => setState({visible: false})}
            footer={null}
        >
            <div className='detailsModalContainer'>
                <div>
                    <Image width={150} className='detailsModalImg' src={state.pokemon?.image} />
                </div>
                <div className='detailsModalInfo'>
                    <Descriptions labelStyle={{fontWeight: 500}} title='Características'>
                        <Descriptions.Item span={4} label='Nome'>
                            {state.pokemon?.name}
                        </Descriptions.Item>
                        <Descriptions.Item span={4} label='Peso'>
                            {state.pokemon?.weight}
                        </Descriptions.Item>
                        <Descriptions.Item span={4} label='Tamanho'>
                            {state.pokemon?.height}
                        </Descriptions.Item>
                        <Descriptions.Item span={4} label='Tipos'>
                            {state.pokemon?.types.map(item => 
                            //    <Popover 
                            //         trigger='click'
                            //         content={<List
                            //             grid={{ gutter: 16, column: 4 }}
                            //             dataSource={sameTypePokemons}
                            //             renderItem={item => 
                            //                 <List.Item>
                            //                     <PokemonCard type='pokedex' pokemon={item}/>
                            //                 </List.Item>
                            //             }
                            //         />}
                            //     >
                                   <Tag key={JSON.stringify(item.type)} color='red' onClick={() => fetchSameTypePokemons(item.type.name)}>{item.type.name}</Tag>
                            //    </Popover>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item span={4} label='Habilidades'>
                            {state.pokemon?.abilities.map(item => <Tag key={JSON.stringify(item.ability)} color='red'>{item.ability.name}</Tag>)}
                        </Descriptions.Item>
                        <Descriptions.Item span={4} label='Estatísticas de velocidade'>
                            {state.pokemon?.stats.find(item => item.stat.name === 'speed')?.base_stat}
                        </Descriptions.Item>
                        <Descriptions.Item span={4} label='Defesa'>
                            {state.pokemon?.stats.find(item => item.stat.name === 'defense')?.base_stat}
                        </Descriptions.Item>
                        <Descriptions.Item span={4} label='Ataque'>
                            {state.pokemon?.stats.find(item => item.stat.name === 'attack')?.base_stat}
                        </Descriptions.Item>
                        <Descriptions.Item label='Hp'>
                            {state.pokemon?.stats.find(item => item.stat.name === 'hp')?.base_stat}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
        </Modal>
    );
});

export default PokemonDetailsModal;