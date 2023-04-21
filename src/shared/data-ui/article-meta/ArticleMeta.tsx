import { Link } from 'react-router-dom';
import { Article } from 'shared/data-access/common/configs/appModels';
import { formatDate } from 'shared/data-access/common/logic/formatDate';

const ArticleMeta = ({ article, children }: { article: Article; children: JSX.Element }) => {
  return (
    <div className="article-meta">
      <Link to={`/profile/${article.author.username}`}>
        <img src={article.author.image} />
      </Link>
      <div className="info">
        <Link to={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">{formatDate(new Date(article.createdAt))}</span>
      </div>
      {children}
    </div>
  );
};

export default ArticleMeta;
