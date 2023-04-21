import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { selectCurrentUser } from 'shared/data-access/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';
import Articles from 'shared/data-ui/articles/Articles';
import FollowButton from 'shared/data-ui/buttons/follow-button/FollowButton';
import {
  getProfile,
  getProfileArticles,
  ProfileArticlesType,
  selectProfile,
  selectProfileArticles,
  selectProfileArticlesStatus
} from './profileSlice';

const Profile = () => {
  const dispatch = useAppDispatch();
  const username = useParams<{ username: string }>().username;

  const profile = useAppSelector(selectProfile);
  const currentUser = useAppSelector(selectCurrentUser);
  const articles = useAppSelector(selectProfileArticles);
  const status = useAppSelector(selectProfileArticlesStatus);

  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [articlesType, setArticlesType] = useState<ProfileArticlesType>('author');

  useEffect(() => {
    let ignore = false;

    setArticlesType('author');

    const fetchProfile = async () => {
      if (!ignore) {
        if (username) {
          setIsOwner(currentUser?.username === username);
          await dispatch(getProfile(username)).unwrap();
        }
      }
    };

    fetchProfile();

    return () => {
      ignore = true;
    };
  }, [username]);

  useEffect(() => {
    let ignore = false;

    const fetchArticles = async () => {
      if (!ignore) {
        if (username) {
          await dispatch(getProfileArticles({ articlesType, username })).unwrap();
        }
      }
    };

    fetchArticles();

    return () => {
      ignore = true;
    };
  }, [username, articlesType]);

  return (
    <>
      {profile && (
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img src={profile.image} className="user-img" />
                  <h4>{profile.username}</h4>
                  <p>{profile.bio}</p>
                  {isOwner ? (
                    <Link to="/settings">
                      <button className="btn btn-sm btn-outline-secondary action-btn">
                        <i className="ion-gear-a"></i>
                        &nbsp; Edit profile settings
                      </button>
                    </Link>
                  ) : (
                    <FollowButton following={profile.following} username={profile.username} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item" onClick={() => setArticlesType('author')}>
                      <a className={`nav-link ${articlesType === 'author' && 'active'}`}>
                        My Articles
                      </a>
                    </li>
                    <li className="nav-item" onClick={() => setArticlesType('favorited')}>
                      <a className={`nav-link ${articlesType === 'favorited' && 'active'}`}>
                        Favorited Articles
                      </a>
                    </li>
                  </ul>
                </div>

                <Articles status={status} articles={articles} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
