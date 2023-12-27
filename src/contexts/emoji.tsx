import { IEmoji } from '@interfaces/emoji';
import { emojiService } from '@services/Emoji';
import React, { createContext, useContext, useEffect, useState } from 'react';
import useMessage from './message';

interface IEmojiContextData {
  loadingEmoji: boolean;
  setLoadingEmoji: React.Dispatch<React.SetStateAction<boolean>>;
  emojiAnimal: IEmoji[];
  setEmojiAnimal: React.Dispatch<React.SetStateAction<IEmoji[]>>;
  emojiBody: IEmoji[];
  setEmojiBody: React.Dispatch<React.SetStateAction<IEmoji[]>>;
  emojiFace: IEmoji[];
  setEmojiFace: React.Dispatch<React.SetStateAction<IEmoji[]>>;
  emojiPeople: IEmoji[];
  setEmojiPeople: React.Dispatch<React.SetStateAction<IEmoji[]>>;
  emojiSymbol: IEmoji[];
  setEmojiSymbol: React.Dispatch<React.SetStateAction<IEmoji[]>>;
}

interface IProps {
  children: React.ReactNode;
}

const EmojiContext = createContext<IEmojiContextData>({} as IEmojiContextData);

export const EmojiProvider: React.FC<IProps> = ({ children }) => {
  const { throwError } = useMessage();

  const [loadingEmoji, setLoadingEmoji] = useState<boolean>(true);
  const [emojiAnimal, setEmojiAnimal] = useState<IEmoji[]>();
  const [emojiBody, setEmojiBody] = useState<IEmoji[]>();
  const [emojiFace, setEmojiFace] = useState<IEmoji[]>();
  const [emojiPeople, setEmojiPeople] = useState<IEmoji[]>();
  const [emojiSymbol, setEmojiSymbol] = useState<IEmoji[]>();

  const fetchData = async () => {
    try {
      const emojis = await emojiService.findEmoji({});
      const { animal, body, face, people, symbol } = emojis;

      setEmojiAnimal(animal);
      setEmojiBody(body);
      setEmojiFace(face);
      setEmojiPeople(people);
      setEmojiSymbol(symbol);
    } catch (error) {
      throwError(error.response.data.message);
    }

    setLoadingEmoji(false);
  };

  useEffect(() => {
    if (
      !emojiAnimal ||
      !emojiBody ||
      !emojiFace ||
      !emojiPeople ||
      !emojiSymbol
    )
      fetchData();
  }, []);

  return (
    <EmojiContext.Provider
      value={{
        loadingEmoji,
        setLoadingEmoji,
        emojiAnimal,
        setEmojiAnimal,
        emojiBody,
        setEmojiBody,
        emojiFace,
        setEmojiFace,
        emojiPeople,
        setEmojiPeople,
        emojiSymbol,
        setEmojiSymbol,
      }}
    >
      {children}
    </EmojiContext.Provider>
  );
};

const useEmoji = () => useContext(EmojiContext);
export default useEmoji;
