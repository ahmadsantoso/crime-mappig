import {
    action,
    thunk
} from "easy-peasy";
import Cookie from "js-cookie";

const operatorModel = {
    currentOperator: null,

    //set CurrenOperator
    setCurrentOperator: action((state, operator) => {
        state.currentOperator = operator;
    }),
};

export const storeModel = {
    operator: operatorModel

};