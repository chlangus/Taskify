import type { CardData } from 'src/types/cardTypes';
import readCardList from 'src/apis/readCardList';
import { useQuery } from '@tanstack/react-query';
import { ColumnData } from 'src/types/columnTypes';
import Card from './Card';
import AddCard from './AddCard';

interface Props {
  columnInfo: ColumnData;
}

export default function Cards({ columnInfo }: Props) {
  const { data } = useQuery({
    queryKey: ['readCardList', columnInfo.id],
    queryFn: () => readCardList(columnInfo.id)
  });
  return (
    <section className="flex flex-col gap-[1rem] tablet:gap-[1.6rem]">
      <AddCard columnInfo={columnInfo} />
      {data?.cards?.map(
        (card: CardData) =>
          card?.columnId === columnInfo?.id && (
            <Card key={card.id} cardData={card} columnInfo={columnInfo} />
          )
      )}
    </section>
  );
}
