export const headersObj = {
  GreenAlert: false,
  AmberAlert: false,
  RedAlert: false,
  At: false,
  From: false,
  EntrySubscribed: false,
  ExitSubscribed: false,
};
export const isRowAllSelected = (row) => {
  const isChecked = Object.keys(headersObj).every(
    (key) => row[key] === true || row[key] === null
  );
  const isSomeChecked = Object.keys(headersObj).some(
    (key) => row[key] === true
  );
  const isIndeterminate = isSomeChecked && !isChecked;
  return { isChecked, isIndeterminate };
};
