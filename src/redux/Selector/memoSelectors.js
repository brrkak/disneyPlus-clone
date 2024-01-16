import { createSelector } from "@reduxjs/toolkit";

const commonSelector = state => state.persistedReducer

export const memoLoginSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.login
)

export const memoIdSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.login.id
);

export const memoNameSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.login.name
)
export const memoNumberSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.login.number
)

export const memoPwSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.login.pw
);

export const memoUserInfoSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.login.userInfo
)

export const memoLogoutSelector = createSelector(
    [commonSelector],
    commonSelector => commonSelector.login
)

export const memoLoginAuthSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.login.isAuthenticated
)

export const memoProfileImageSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.profile.upload
)