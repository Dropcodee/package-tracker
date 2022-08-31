const constants = Object.freeze({
  CREATE_RESOURCE_ERROR_MSG: 'Error creating this resource' as string,
  CREATE_RESOURCE_SUCCESS_MSG: 'resource successfully created' as string,
  DELETE_RESOURCE_ERROR_MSG: 'error deleting resource with given id' as string,
  DELETE_RESOURCE_SUCCESS_MSG: 'Successfully deleted resource' as string,
  UPDATE_RESOURCE_ERROR_MSG: 'Error updating resource' as string,
  UPDATE_RESOURCE_SUCCESS_MSG: 'Successfully updated resource' as string,
  FETCH_RESOURCE_ERROR_MSG: 'Error fetching resource(s)' as string,
  FETCH_RESOURCE_SUCCESS_MSG: 'Successfully retrieved resource(s)' as string,
  DELIVERY_STATUS: Object.freeze({
    OPEN: 'open',
    IN_TRANSIT: 'in-transit',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    PICKED_UP: 'picked-up',
  }),
});

export default constants;
