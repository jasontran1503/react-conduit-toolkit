import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';
import ArticleMeta from 'shared/data-ui/article-meta/ArticleMeta';
import Buttons from 'shared/data-ui/buttons/Buttons';
import { deleteArticle, getArticleBySlug, selectArticleBySlug } from './articleSlice';
import Comment from './comment/Comment';

const Article = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const article = useAppSelector(selectArticleBySlug);
  const slug = useParams<{ slug: string }>().slug;

  useEffect(() => {
    let ignore = false;

    const fetchArticle = async () => {
      if (!ignore) {
        if (slug) {
          await dispatch(getArticleBySlug(slug)).unwrap();
        }
      }
    };

    fetchArticle();

    return () => {
      ignore = true;
    };
  }, [slug]);

  const onDeleteArticle = async (slug: string) => {
    await dispatch(deleteArticle(slug)).unwrap();
    navigate('/');
  };

  return (
    <>
      {article && (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{article.title}</h1>

              <ArticleMeta article={article}>
                <Buttons article={article} onDeleteArticle={onDeleteArticle} />
              </ArticleMeta>
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{article.body}</p>
              </div>
            </div>

            <hr />

            <div className="article-actions">
              <ArticleMeta article={article}>
                <Buttons article={article} onDeleteArticle={onDeleteArticle} />
              </ArticleMeta>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <Comment slug={slug} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Article;
