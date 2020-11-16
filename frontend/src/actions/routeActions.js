
export const setNewLocation = (newLocation) => {

  return (dispatch) => {
    dispatch({
      type: 'SET_LOCATION',
      newLocation: newLocation
    });

  }
};

