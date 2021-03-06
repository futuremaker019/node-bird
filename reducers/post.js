import shortid from 'shortid';

export const initialState = {
	mainPosts: [
		{
			id: 1,
			User: {
				id: 1,
				nickname: '제로초'
			},
			content: '첫 번째 게시글 #해시태그 #익스프레스',
			Images: [
				{
					id: shortid.generate(),
					src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?update=20180726'
				},
				{
					id: shortid.generate(),
					src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg'
				},
				{
					id: shortid.generate(),
					src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg'
				}
			],
			Comments: [
				{
					id: shortid.generate(),
					User: {
						id: shortid.generate(),
						nickname: 'nero'
					},
					content: '우와 개정판이 나왔군요~'
				},
				{
					id: shortid.generate(),
					User: {
						id: shortid.generate(),
						nickname: 'hero'
					},
					content: '언른 사고싶어요~'
				}
			]
		}
	],
	imagePaths: [],
	addPostLoading: false,
	addPostDone: false,
	addPostError: null,
	addCommentLoading: false,
	addCommentDone: false,
	addCommentError: null
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
	type: ADD_POST_REQUEST,
	data
});

export const addComment = (data) => ({
	type: ADD_COMMENT_REQUEST,
	data
});

const dummyPost = (data) => ({
	id: data.id,
	content: data.content,
	User: {
		id: 1,
		nickname: '제로초'
	},
	Images: [],
	Comments: []
});

const dummyComment = (data) => ({
	id: shortid.generate(),
	content: data,
	User: {
		id: 1,
		nickname: '제로초'
	}
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST_REQUEST:
			return {
				...state,
				addPostLoading: true,
				addPostDone: false,
				addPostError: null
			};
		case ADD_POST_SUCCESS:
			return {
				...state,
				mainPosts: [dummyPost(action.data), ...state.mainPosts],
				addPostLoading: false,
				addPostDone: true
			};
		case ADD_POST_FAILURE:
			return {
				...state,
				addPostLoading: false,
				addPostError: action.error
			};
		case ADD_COMMENT_REQUEST:
			return {
				...state,
				addCommentLoading: true,
				addCommentDone: false,
				addCommentError: null
			};
		case ADD_COMMENT_SUCCESS: {
			// 해당하는 포스트를 아이디로 찾아준다.
			const postIndex = state.mainPosts.findIndex(
				(v) => v.id === action.data.postId
			);

			// 찾은 post를 post 변수에 할당
			const post = { ...state.mainPosts[postIndex] };

			// 해당 post의 comments에 들어온 데이터를 저장한다.
			post.Comments = [dummyComment(action.data.content), ...post.Comments];

			// 최초의 mainPosts를 할당
			const mainPosts = [...state.mainPosts];

			// comment가 변경된 post를 mainPosts에서 찾아서 다시 할당해준다.
			mainPosts[postIndex] = post;

			return {
				...state,
				mainPosts,
				addCommentLoading: false,
				addCommentDone: true
			};
		}
		case ADD_COMMENT_FAILURE:
			return {
				...state,
				addCommentLoading: false,
				addCommentError: action.error
			};
		default:
			return state;
	}
};

export default reducer;
