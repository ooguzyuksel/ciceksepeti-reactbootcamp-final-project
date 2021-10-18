export const elementCapitalizer = (el1) => {
  let capital = el1?.toString().charAt(0).toUpperCase();
  let rest = el1?.toString().slice(1);
  let compose = capital?.concat(rest);
  return compose;
};
