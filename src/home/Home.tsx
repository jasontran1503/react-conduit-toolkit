import { useEffect, useState } from 'react';
import { selectCurrentUser } from 'shared/data-access/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';
import Articles from 'shared/data-ui/articles/Articles';
import Feed from './feed/Feed';
import {
  getArticlesByTag,
  getGlobalFeed,
  getYourFeed,
  HomeArticlesType,
  selectArticlesStatus,
  selectHomeArticles
} from './homeSlice';
import { Tags } from './tags/Tags';

const Home = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const articles = useAppSelector(selectHomeArticles);
  const status = useAppSelector(selectArticlesStatus);

  const [articlesType, setArticlesType] = useState<HomeArticlesType>('global');
  const [tag, setTag] = useState<string>('');

  const onSelectArticlesType = (type: HomeArticlesType) => {
    setArticlesType(type);
    setTag('');
  };
  const onSelectTag = (tag: string) => {
    setArticlesType('tag');
    setTag(tag);
  };

  useEffect(() => {
    let ignore = false;

    const fetchArticles = async () => {
      if (!ignore) {
        switch (articlesType) {
          case 'feed':
            await dispatch(getYourFeed()).unwrap();
            break;
          case 'global':
            await dispatch(getGlobalFeed()).unwrap();
            break;
          case 'tag':
            await dispatch(getArticlesByTag(tag)).unwrap();
            break;
          default:
            await dispatch(getYourFeed()).unwrap();
        }
      }
    };

    fetchArticles();

    return () => {
      ignore = true;
    };
  }, [articlesType]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Feed
              user={user}
              articlesType={articlesType}
              tag={tag}
              onSelectArticlesType={onSelectArticlesType}
            />

            <Articles status={status} articles={articles} />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags onSelectTag={onSelectTag} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
