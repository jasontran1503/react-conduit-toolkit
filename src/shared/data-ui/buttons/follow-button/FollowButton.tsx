import { useAppDispatch } from 'shared/data-access/common/configs/hooks';
import { toggleFollow } from './followButtonSlice';

const FollowButton = ({ following, username }: { following: boolean; username: string }) => {
  const dispatch = useAppDispatch();

  const onToggleFollow = async () => {
    await dispatch(toggleFollow({ following, username }));
  };

  return (
    <button className="btn btn-sm btn-outline-secondary action-btn" onClick={onToggleFollow}>
      <i className="ion-plus-round"></i>
      &nbsp; {following ? 'Unfollow' : 'Follow'} {username}
    </button>
  );
};

export default FollowButton;
