// @flow

export const changeSort = (field: string, direction: string): Object => (
  state: Object,
  props: Object
): Object => {
  const { sort } = state;
  return {
    sort: {
      field,
      direction,
    },
  };
};

export const changePage = (activePage: number): Object => (
  state: Object,
  props: Object
): Object => ({
  pagination: {
    ...state.pagination,
    activePage,
  },
});

export const addRule = (rule: Object): Object => (
  state: Object,
  props: Object
): Object => ({
  queryRules: [...state.queryRules, rule],
});

export const removeRule = (rule: Object): Object => (
  state: Object,
  props: Object
): Object => ({
  queryRules: state.queryRules.filter(
    (x) => x.field !== rule.field || x.condition !== rule.condition
  ),
});
