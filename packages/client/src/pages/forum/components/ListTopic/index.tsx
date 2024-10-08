import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ChatsEntity } from '../../../../api/chats/chats.entity';
import { getChats } from '../../../../api/chats/chats.resource';
import { ListForum } from '../../../../components/ListForum';
import { TopicCard } from '../../../../components/TopicCard';

export const ListTopic = () => {
  const [topics, setTopics] = useState<ChatsEntity | []>([]);

  const [currantPage, setCurrantPage] = useState(1);

  const changeCurantPage = (page: number) => {
    setCurrantPage(page);
  };

  useEffect(() => {
    getChats().then((data) => setTopics(data));
  }, []);

  return (
    <ListForum
      list={topics.slice(10 * (currantPage - 1), 10 * currantPage)}
      changePage={changeCurantPage}
      maxLength={topics.length}
    >
      {(card) => (
        <Link
          to={`/topic/${card.id}`}
          key={card.id}
        >
          <TopicCard card={{ ...card, content: card.shortDescription }} />
        </Link>
      )}
    </ListForum>
  );
};
