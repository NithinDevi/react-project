import { styled, TableCell, tableCellClasses } from "@mui/material";
import {
  COUNTRIES,
  LEGS,
  PARENT_ORG,
  PRODUCE_TYPE,
  USERS,
} from "../../pages/alert/config";
import {
  onProduceTypeSelectAllClick,
  setProduceTypeSelectedIds,
  updateOnProduceNameClick,
  updateOnProduceTypeIconClick,
  updateProduceTypeRowsByHeaderType,
} from "../../store/reducers/produceTypeReducer";
import {
  fetchCountriesData,
  fetchLegsData,
  fetchParentOrgs,
  fetchProduceType,
  fetchUsersData,
} from "../../store/thunk/alertThunks";
import {
  onParentOrgSelectAllClick,
  setParentOrgSelectedIds,
  updateOnParentOrgIconClick,
  updateOnParentOrgNameClick,
  updateParentOrgRowsByHeaderType,
} from "../../store/reducers/parentOrgReducer";
import {
  onUsersSelectAllClick,
  setUsersSelectedIds,
  updateOnUserIconClick,
  updateOnUserNameClick,
  updateUserRowsByHeaderType,
} from "../../store/reducers/usersReducer";
import {
  onLegsTypeSelectAllClick,
  setLegsSelectedIds,
  updateLegsTypeRowsByHeaderType,
  updateOnLegsNameClick,
  updateOnLegsTypeIconClick,
} from "../../store/reducers/legsReducer";
import {
  onCountriesSelectAllClick,
  setCountrisSelectedIds,
  updateCountryTypeRowsByHeaderType,
  updateOnCountryNameClick,
  updateOnCountryTypeIconClick,
} from "../../store/reducers/countryReducer";

export const headerBackgroundColor = (sectionTitle) => {
  if (sectionTitle === "Parent Org") {
    return "#7b8aaa";
  }
  if (sectionTitle === "Legs") {
    return "#7b8aaa";
  }
  return "#27496d";
};

export const StyledTableCell = styled(TableCell)(
  ({ theme, backgroundColor }) => ({
    padding: "8px 64px",
    maxWidth: "200px",
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.white,
      backgroundColor: backgroundColor,
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  })
);

export const getColumnCheckboxState = (data, label, sectionKey) => {
  if (!Array.isArray(data)) {
    return { checked: false, indeterminate: false };
  }
  let total = 0;
  let checkedCount = 0;
  console.log("data:::", sectionKey, data);

  data.forEach((cell) => {
    if (sectionKey !== LEGS) {
      total++;
      if ((cell?.[label] && cell[label] === true) || cell?.isChecked) {
        checkedCount++;
      }
    } else {
      cell.LegTypeSubscriptions.forEach((subRow) => {
        total++;
        if (subRow[label] || subRow.isChecked) {
          checkedCount++;
        }
      });
    }
  });
  return {
    checked: checkedCount === total && total > 0,
    indeterminate: checkedCount > 0 && checkedCount < total,
  };
};

export const getNameChangeAction = (sectionKey) => {
  switch (sectionKey) {
    case PRODUCE_TYPE:
      return updateOnProduceNameClick;
    case PARENT_ORG:
      return updateOnParentOrgNameClick;
    case USERS:
      return updateOnUserNameClick;
    case LEGS:
      return updateOnLegsNameClick;
    case COUNTRIES:
      return updateOnCountryNameClick;

    default:
  }
};

export const getHeaderSelectAction = (sectionKey) => {
  switch (sectionKey) {
    case PRODUCE_TYPE:
      return updateProduceTypeRowsByHeaderType;
    case PARENT_ORG:
      return updateParentOrgRowsByHeaderType;
    case USERS:
      return updateUserRowsByHeaderType;
    case LEGS:
      return updateLegsTypeRowsByHeaderType;
    case COUNTRIES:
      return updateCountryTypeRowsByHeaderType;
    default:
  }
};

export const getIconClickAction = (sectionKey) => {
  switch (sectionKey) {
    case PRODUCE_TYPE:
      return updateOnProduceTypeIconClick;
    case PARENT_ORG:
      return updateOnParentOrgIconClick;
    case USERS:
      return updateOnUserIconClick;
    case LEGS:
      return updateOnLegsTypeIconClick;
    case COUNTRIES:
      return updateOnCountryTypeIconClick;
    default:
  }
};

export const getDataAPICallBySectionType = (sectionKey) => {
  switch (sectionKey) {
    case PRODUCE_TYPE:
      return fetchProduceType;
    case PARENT_ORG:
      return fetchParentOrgs;
    case USERS:
      return fetchUsersData;
    case LEGS:
      return fetchLegsData;
    case COUNTRIES:
      return fetchCountriesData;

    default:
  }
};

export const getSelectAllAction = (sectionKey) => {
  switch (sectionKey) {
    case PRODUCE_TYPE:
      return onProduceTypeSelectAllClick;
    case PARENT_ORG:
      return onParentOrgSelectAllClick;
    case USERS:
      return onUsersSelectAllClick;
    case LEGS:
      return onLegsTypeSelectAllClick;
    case COUNTRIES:
      return onCountriesSelectAllClick;

    default:
  }
};

export const updateSelectedRowsbySectionWise = (sectionKey) => {
  switch (sectionKey) {
    case PRODUCE_TYPE:
      return setProduceTypeSelectedIds;
    case PARENT_ORG:
      return setParentOrgSelectedIds;
    case USERS:
      return setUsersSelectedIds;
    case LEGS:
      return setLegsSelectedIds;
    case COUNTRIES:
      return setCountrisSelectedIds;

    default:
  }
};
