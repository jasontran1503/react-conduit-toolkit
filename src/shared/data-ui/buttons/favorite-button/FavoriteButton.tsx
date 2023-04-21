import { Article } from 'shared/data-access/common/configs/appModels';
import { useAppDispatch } from 'shared/data-access/common/configs/hooks';
import { toggleFavorite } from './favoriteButtonSlice';

const FavoriteButton = ({
  children,
  className,
  article
}: {
  children: JSX.Element;
  className?: string;
  article: Article;
}) => {
  const dispatch = useAppDispatch();

  const onToggleFavorite = async () => {
    await dispatch(toggleFavorite({ favorited: article.favorited, slug: article.slug }));
  };

  return (
    <button
      className={`btn btn-sm ${className} ${
        article.favorited ? 'btn-primary' : 'btn-outline-primary'
      }`}
      onClick={onToggleFavorite}
    >
      <i className="ion-heart"></i>&nbsp;
      {children}
    </button>
  );
};

export default FavoriteButton;
