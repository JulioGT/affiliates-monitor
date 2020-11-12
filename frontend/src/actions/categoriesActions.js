import axios from 'axios';

export const displayNextCategoriesSet = (token, url) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${url}`,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((categorydata) => {
        // console.log('CAT OK: ', categorydata);

        dispatch({
          type: 'CATEGORY_SUCCESS',
          category: {
            ...categorydata
          }
        });
      })
      .catch((err) => {
        try {
          // console.log(err);
          if (err.response.status === 401) {
            dispatch({
              type: 'CATEGORY_ERROR',
              err,
              errorCode: 401
            });
          }
          dispatch({ type: 'CATEGORY_ERROR', err, errorCode: 400 });
        } catch {
          //LogOut
          dispatch({ type: 'CATEGORY_ERROR', err, errorCode: 401 });
        }
      });
  };
};

export const createCategory = (categoryName, token) => {
  // console.log(categoryName, token);
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_CATEGORIES}`,
      headers: {
        Authorization: 'Token '.concat(token),
        'Content-Type': 'application/json'
      },
      data: {
        name: categoryName,
        verticals: []
      }
    })
      .then((categorydata) => {
        // console.log(categorydata.data);
        dispatch({
          type: 'CREATE_CATEGORY_SUCCESS',
          createCategory: true
        });
      })
      .catch((err) => {
        dispatch({ type: 'CATEGORY_ERROR', err });
      });
  };
};

export const getSpecificCategory = (token, url) => {
  //Get all Users Info from API
  return (dispatch) => {
    axios({
      method: 'GET',
      url: url,
      headers: {
        Authorization: 'Token '.concat(token)
      }
    })
      .then((categorydata) => {
        // console.log(categorydata.data);
        dispatch({
          type: 'GET_SPECIFIC_CATEGORY_SUCCESS',
          currentCategory: categorydata.data
        });
      })
      .catch((err) => {
        // console.log('CAT ERR ', err);
        dispatch({ type: 'CATEGORY_ERROR', err });
      });
  };
};

export const changeCategoryName = (value) => {
  //Get all Users Info from API
  return (dispatch) => {
    // console.log(categorydata.data);
    dispatch({
      type: 'UPDATE_CATEGORY_NAME',
      newCategoryName: value
    });
  };
};
