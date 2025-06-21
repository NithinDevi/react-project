export const HEADERS = [
  { label: "Green Temp" },
  { label: "Amber Temp" },
  { label: "Red Temp" },
  { label: "At Location" },
  { label: "From Location" },
  { label: "Location Entry" },
  { label: "Location Exit" },
];

export const filterHeaders = [
  { label: "Green Temp", key: "GreenAlert" },
  { label: "Amber Temp", key: "AmberAlert" },
  { label: "Red Temp", key: "RedAlert" },
  { label: "At Location", key: "At" },
  { label: "From Location", key: "From" },
  { label: "Location Entry", key: "EntrySubscribed" },
  { label: "Location Exit", key: "ExitSubscribed" },
];

export const formatObj = {
  isChecked: false,
  GreenAlert: false,
  AmberAlert: false,
  RedAlert: false,
  At: false,
  From: false,
  EntrySubscribed: false,
  ExitSubscribed: false,
};
