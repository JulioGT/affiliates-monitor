// console.log(auth);
const initState = {
  categoryError: false,
  categoryLoading: true,
  categoryCreated: false
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CATEGORY_ERROR':
      if (action.errorCode === 401) {
        return {
          ...state,
          categoryError: true,
          categoryLoading: true,
          categoryCreated: false,
          categoryErrorCode: 401
        };
      }
      return {
        ...state,
        categoryError: true,
        categoryLoading: false,
        categoryCreated: false,
        categoryErrorCode: 200
      };
    case 'CATEGORY_SUCCESS':
      // console.log('REDUCER: CATEGORY_SUCCESS');
      return {
        ...state,
        ...action.category,
        categoryError: false,
        categoryLoading: false,
        categoryCreated: false,
        categoryErrorCode: 200
      };
    case 'CATEGORY_LOADING':
      // console.log('USER_LOADING');
      return {
        ...state,
        ...action.category,
        categoryError: false,
        categoryLoading: true,
        categoryCreated: false,
        categoryErrorCode: 200
      };
    case 'CREATE_CATEGORY_SUCCESS':
      return {
        ...state,
        categoryError: false,
        categoryLoading: true,
        categoryCreated: true,
        categoryErrorCode: 200
      };
    case 'GET_SPECIFIC_CATEGORY_SUCCESS':
      // console.log(action.currentCategory);
      return {
        ...state,
        currentCategory: action.currentCategory,
        categoryError: false,
        categoryLoading: false,
        categoryCreated: false,
        categoryErrorCode: 200
      };
    case 'UPDATE_CATEGORY_NAME':
      // console.log(action.currentCategory);
      return {
        ...state,
        currentCategory: { name: action.newCategoryName },
        categoryError: false,
        categoryLoading: false,
        categoryCreated: false,
        categoryErrorCode: 200
      };
    default:
      // console.log('default');
      return {
        ...state,
        ...action.category,
        categoryError: false,
        categoryLoading: true,
        categoryCreated: false,
        categoryErrorCode: 200
      };
  }
};

export default categoryReducer;
