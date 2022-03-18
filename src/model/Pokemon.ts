import Ability from "./Ability";
import PokeathlonStat from "./PokeathlonStat";
import Type from "./Type";

export default class {
    id!: number;
    name!: string;
    image!: string;
    weight!: number;
    height!: number
    types!: Type[];
    abilities!: Ability[];
    stats!: PokeathlonStat[];
    sprites?: {
        front_default: string;
    }
};