'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateCopy = { ...state };
  const removeKey = function(actionObject) {
    for (const keyToRemove of actionObject.keysToRemove) {
      delete stateCopy[keyToRemove];
    }
  };

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeKey(action);
        break;

      default: throw new Error("Unexpected 'type' value");
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
