import {useLoaderData, Link, Await} from 'react-router';
import {getPost} from '../api/posts';
import {getComments} from '../api/comments';
import {getUser} from '../api/users';
import {
  SimpleSkeletonText,
  Skeleton,
  SkeletonList,
} from '../components/Skeleton';
import {Suspense} from 'react';

function Post() {
  const {commentsPromise, postPromise, userPromise} = useLoaderData();

  return (
    <>
      {' '}
      <h1 className='page-title'>
        <SimpleSkeletonText resolve={postPromise}>
          {(post) => post.title}
        </SimpleSkeletonText>
        <div className='title-btns'>
          <Link
            className='btn btn-outline '
            to='edit'
          >
            Edit{' '}
          </Link>
        </div>
      </h1>
      <span className='page-subtitle'>
        By:{' '}
        <Suspense
          fallback={
            <Skeleton
              short
              inline
            ></Skeleton>
          }
        >
          <Await resolve={userPromise}>
            {(user) => <Link to={`/users/${user.id}`}>{user.name}</Link>}
          </Await>
        </Suspense>
      </span>
      <div>
        <Suspense
          fallback={
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          }
        >
          <Await resolve={postPromise}>{(post) => post.body}</Await>{' '}
        </Suspense>
      </div>
      <h3 className='mt-4 mb-2'>Comments</h3>
      <div className='card-stack'>
        <Suspense
          fallback={
            <SkeletonList amount={4}>
              <div className='card'>
                <div className='card-body'>
                  <div className='text-sm mb-1'>
                    <Skeleton short></Skeleton>
                  </div>
                  <Skeleton></Skeleton>
                  <Skeleton></Skeleton>
                </div>
              </div>
            </SkeletonList>
          }
        >
          <Await resolve={commentsPromise}>
            {(comments) =>
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className='card'
                >
                  <div className='card-body'>
                    <div className='text-sm mb-1'>{comment.email}</div>
                    {comment.body}
                  </div>
                </div>
              ))
            }
          </Await>
        </Suspense>
      </div>
    </>
  );
}

async function loader({request: {signal}, params: {postId}}) {
  const comments = getComments(postId, {signal});
  const post = getPost(postId, {signal});

  return {
    commentsPromise: comments,
    postPromise: post,
    userPromise: post.then((post) => getUser(post.userId, {signal})),
  };
}

export const postRoute = {
  loader,
  element: <Post />,
};
