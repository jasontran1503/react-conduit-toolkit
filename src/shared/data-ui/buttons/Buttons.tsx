import { Link } from 'react-router-dom';
import { selectCurrentUser } from 'shared/data-access/auth/authSlice';
import { Article } from 'shared/data-access/common/configs/appModels';
import { useAppSelector } from 'shared/data-access/common/configs/hooks';
import FavoriteButton from './favorite-button/FavoriteButton';
import FollowButton from './follow-button/FollowButton';

const Buttons = ({ article, onDeleteArticle }: { article: Article; onDeleteArticle: Function }) => {
  const currentUsername = useAppSelector(selectCurrentUser)?.username;

  return (
    <>
      {currentUsername === article.author.username ? (
        <>
          <Link className="btn btn-outline-secondary btn-sm" to={`/editor/${article.slug}`}>
            <i className="ion-edit"></i>
            &nbsp;Edit Article
          </Link>
          <button
            style={{ marginLeft: '0.5rem' }}
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDeleteArticle(article.slug)}
          >
            <i className="ion-trash-a"></i>
            &nbsp;Delete Article
          </button>
        </>
      ) : (
        <>
          <FollowButton following={article.author.following} username={article.author.username} />
          &nbsp;&nbsp;
          <FavoriteButton article={article}>
            <>
              &nbsp; {article.favorited ? 'Unfavorite' : 'Favorite'} Post &nbsp;
              <span className="counter">({article.favoritesCount})</span>
            </>
          </FavoriteButton>
        </>
      )}
    </>
  );
};

export default Buttons;
