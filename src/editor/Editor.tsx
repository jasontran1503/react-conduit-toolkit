import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCurrentUser } from 'shared/data-access/auth/authSlice';
import { NewArticle, UpdateArticle } from 'shared/data-access/common/configs/appModels';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';
import ErrorsForm from 'shared/data-ui/errors-form/ErrorsForm';
import {
  createArticle,
  getArticleBySlug,
  selectEditorErrors,
  selectEditorStatus,
  updateArticle
} from './editorSlice';

const Editor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const slug = useParams<{ slug: string }>().slug;
  const errorsForm = useAppSelector(selectEditorErrors);
  const status = useAppSelector(selectEditorStatus);
  const currentUsername = useAppSelector(selectCurrentUser)?.username;
  const [tags, setTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<NewArticle | UpdateArticle>({
    mode: 'onChange'
  });
  const onSubmit: SubmitHandler<NewArticle | UpdateArticle> = async (data) => {
    if (status === 'loading') {
      return;
    }

    setValue('tagList', tags);
    const value = { ...data, tagList: tags };
    if (!slug) {
      const response = await dispatch(createArticle(value as NewArticle)).unwrap();
      navigate(`/article/${response.slug}`);
      return;
    }
    const response = await dispatch(
      updateArticle({ slug, article: value as UpdateArticle })
    ).unwrap();
    navigate(`/article/${response.slug}`);
  };

  useEffect(() => {
    let ignore = false;

    const fetchArticle = async () => {
      if (!ignore) {
        if (slug) {
          const article = await dispatch(getArticleBySlug(slug)).unwrap();
          if (article.author.username === currentUsername) {
            setValue('title', article.title);
            setValue('body', article.body);
            setValue('description', article.description);
            setValue('tagList', article.tagList);
            setTags(article.tagList);
            return;
          }
          navigate('/');
        }
      }
    };

    fetchArticle();

    return () => {
      ignore = true;
    };
  }, [slug]);

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value.trim();

    if (inputValue) {
      setTags([...tags, inputValue]);
      (e.target as HTMLInputElement).value = '';
    }
  };

  const deleteTag = (tagRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagRemove);
    setTags(newTags);
    setValue('tagList', newTags);
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ErrorsForm errors={errorsForm} />
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className={`form-control form-control-lg ${errors.title && 'is-invalid'}`}
                    placeholder="Article Title"
                    {...register('title', { required: 'Title is required' })}
                  />
                  <small className="invalid-feedback">{errors.title?.message}</small>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className={`form-control ${errors.description && 'is-invalid'}`}
                    placeholder="What's this article about?"
                    {...register('description', { required: 'Description is required' })}
                  />
                  <small className="invalid-feedback">{errors.description?.message}</small>
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className={`form-control ${errors.body && 'is-invalid'}`}
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    {...register('body', { required: 'Body is required' })}
                  ></textarea>
                  <small className="invalid-feedback">{errors.body?.message}</small>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        addTag(e);
                      }
                    }}
                  />
                  {tags.length > 0 && (
                    <div className="tag-list">
                      {tags.map((tag, index) => (
                        <span key={index} className="tag-pill tag-default">
                          <i className="ion-close-round" onClick={() => deleteTag(tag)}></i>
                          {' ' + tag}
                        </span>
                      ))}
                    </div>
                  )}
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
