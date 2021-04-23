import {createContext} from 'react';
import { useContext, useState, ReactNode } from 'react';


type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number; //cria um indice que aponta a posição do episodio. Para determinar para qual vai. 
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    playNext: () => void;
    playPrevious: () => void;
    clearPlayerState: () => void;
  };

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLopping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
  
    function play(episode: Episode){
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
      setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
      setIsLopping(!isLooping);
    }

    function toggleShuffle() {
      setIsShuffling(!isShuffling);
    }
  
    function setPlayingState(state: boolean) {
      setIsPlaying(state);
    }

    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;
    const hasPrevious = currentEpisodeIndex > 0;

    function playNext() {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
        if(isShuffling){
          setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if (hasNext) {
          setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }
    }
    function playPrevious() {
        if(hasPrevious) setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }

    function clearPlayerState() {
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);
    }
  
    return (
      <PlayerContext.Provider value={{
      episodeList, 
      currentEpisodeIndex,
      isPlaying, 
      isLooping,
      isShuffling,
      play, 
      togglePlay, 
      toggleLoop,
      toggleShuffle,
      clearPlayerState,
      setPlayingState,
      playList,
      playNext,
      playPrevious,
      hasNext,
      hasPrevious,
      }}>
          {children}
      </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}