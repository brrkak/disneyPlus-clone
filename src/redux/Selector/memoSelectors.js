import { createSelector } from "@reduxjs/toolkit";

const commonSelector = state => state.persistedReducer

export const memoLoginSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.profile
)

export const memoIdSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.profile.id
);

export const memoNameSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.profile.name
)
export const memoNumberSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.profile.number
)

export const memoPwSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.profile.pw
);

export const memoUserInfoSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.login.userInfo
)

export const memoLogoutSelector = createSelector(
    [commonSelector],
    commonSelector => commonSelector.profile
)

export const memoLoginAuthSelector = createSelector(
    [commonSelector],
    (commonSelector) => commonSelector.login.isAuthenticated
) 