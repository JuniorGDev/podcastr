import {createContext} from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    isPlaying: boolean;
    currentEpisodeIndex: number; //cria um indice que aponta a posição do episodio. Para determinar para qual vai. 
    play: (episode: Episode) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
};



export const PlayerContext = createContext({} as PlayerContextData);