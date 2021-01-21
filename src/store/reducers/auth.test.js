import reducer, {initialState} from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("Auth reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it("should store the token upon login", () => {
        expect(reducer(initialState, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: "some-token",
            userId: "Some-user-id"})).toEqual({
                ...initialState, 
                token: "some-token",
                userId: "Some-user-id"});
    });
}); 