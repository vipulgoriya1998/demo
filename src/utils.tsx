import {
  Badge,
  Checkbox,
  MantineProvider,
  Progress,
  MantineColor,
} from "@mantine/core";
import { _ } from "gridjs-react";
import { html } from "gridjs";
import { TColumn } from "gridjs/dist/src/types";
import {
  IPatient,
  PatientState,
  SortColumn,
  SortColumnPosition,
  SortOrder,
} from "./types";
import defaultSortIcon from "./assets/icons/defaultSortIcon.svg";
import upSortIcon from "./assets/icons/upSortIcon.svg";
import downSortIcon from "./assets/icons/downSortIcon.svg";

const sortIcon = (sortOrder: SortOrder, key: SortColumn) => {
  if (sortOrder.column === key) {
    const icon =
      sortOrder.sort === SortColumnPosition.UP ? upSortIcon : downSortIcon;
    return (
      <div className="mt-[2px] w-[20px]">
        <img src={icon} alt="" />
      </div>
    );
  }
  return (
    <div className="mt-[2px] opacity-20 w-[20px]">
      <img src={defaultSortIcon} alt="" />
    </div>
  );
};

const handleSortingColumn = (
  column: SortColumn,
  setSortOrder: (val: SortOrder) => void,
  sortOrder: SortOrder,
  handleSortingFilter: (val: SortOrder) => void,
) => {
  // Determine the new sort position (UP or DOWN) based on the current sort order
  const sortPosition =
    sortOrder.sort === SortColumnPosition.UP &&
    sortOrder.sort &&
    sortOrder.column === column
      ? SortColumnPosition.DOWN
      : SortColumnPosition.UP;

  setSortOrder({
    column: column,
    sort: sortPosition,
  });
  handleSortingFilter({
    column: column,
    sort: sortPosition,
  });
};

// Function to format a given date string into a more readable format
const formatDate = (date: string, includeTime = false) => {
  const now = new Date(date);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = now.getFullYear();
  const month = months[now.getMonth()];
  const day = String(now.getDate()).padStart(2, "0");

  // If time should be included in the formatted date
  if (includeTime) {
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;

    return `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
  }

  return `${month} ${day}, ${year}`;
};

export const gridCheckboxColumn = () =>
  _(
    <MantineProvider>
      <Checkbox size="sm" />
    </MantineProvider>,
  );

export const gridNameColumn = (ele: IPatient) =>
  _(
    <MantineProvider>
      <div className="flex items-center">
        <span className="mr-3">{ele.name}</span>
        {ele.state === PatientState.COMPLETED && (
          <Badge color="green" size="xs" className="capitalize">
            Completed
          </Badge>
        )}
        {ele.state === PatientState.ONBOARDED && (
          <Badge color="pink" size="xs" className="capitalize">
            Onboarded
          </Badge>
        )}
        {(ele.state === PatientState.REGISTERED ||
          ele.state === PatientState.CREATED) && (
          <Badge color="orange" size="xs" className="capitalize">
            Invited
          </Badge>
        )}
        {ele.state === PatientState.INACTIVE && (
          <Badge color="gray" size="xs" className="capitalize">
            Inactive
          </Badge>
        )}
      </div>
      <div className="text-xs text-green-700">
        {ele.lastLogin ? (
          <>
            <span>Last login at: </span>
            {formatDate(ele.lastLogin, true)}
          </>
        ) : (
          "No login"
        )}
      </div>
    </MantineProvider>,
  );

export const gridAdherenceColumn = (ele: IPatient) => {
  const color = ele?.adherenceValue[0] as MantineColor;
  const value = ele.adherenceValue[1] as string;
  return _(
    <MantineProvider>
      <div className="flex">
        <Progress
          size="md"
          color={color}
          value={parseInt(value)}
          style={{ marginTop: "9px", width: "100px" }}
        />
        <div className="ml-2"> {value}</div>
      </div>
    </MantineProvider>,
  );
};

export const gridRomColumn = (ele: IPatient) => {
  const color = ele?.adherenceValue[0] as MantineColor;
  const value = ele.adherenceValue[1] as string;
  return _(
    <MantineProvider>
      <Badge color={color}>{value}</Badge>
    </MantineProvider>,
  );
};

// This function returns an array of columns for a grid table, allowing sorting and custom formatting for each column.
export const gridTableColumns = (
  sortOrder: SortOrder,
  setSortOrder: (val: SortOrder) => void,
  handleSortingFilter: (val: SortOrder) => void,
) => {
  const checkBoxColumn: TColumn = {
    id: "checkbox",
    name: html(
      '<svg stroke="currentColor" fill="currentColor" class="text-grayscale-400" stroke-width="0" viewBox="0 0 24 24" height="19px" width="19px" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M17.618 5.968l1.453-1.453 1.414 1.414-1.453 1.453a9 9 0 1 1-1.414-1.414zM12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM11 8h2v6h-2V8zM8 1h8v2H8V1z"></path></g></svg>',
    ),
    width: "10px",
    sort: false,
  };
  const nameColumn: TColumn = {
    id: "name",
    name: _(
      <div
        className="flex gap-3 font-semibold text-black text-md"
        onClick={() =>
          handleSortingColumn(
            SortColumn.NAME,
            setSortOrder,
            sortOrder,
            handleSortingFilter,
          )
        }
      >
        Name
        {sortIcon(sortOrder, SortColumn.NAME)}
      </div>,
    ),
    minWidth: "200px",
  };

  const startDateColumn: TColumn = {
    id: "startDate",
    name: _(
      <div
        className="flex gap-3 font-semibold text-black text-md"
        onClick={() =>
          handleSortingColumn(
            SortColumn.START_DATE,
            setSortOrder,
            sortOrder,
            handleSortingFilter,
          )
        }
      >
        Start Date
        {sortIcon(sortOrder, SortColumn.START_DATE)}
      </div>,
    ),
    minWidth: "100px",
    formatter: (date: string) => (date ? formatDate(date) : ""),
  };

  const endDateColumn: TColumn = {
    id: "endDate",
    name: _(
      <div
        className="flex gap-3 font-semibold text-black text-md"
        onClick={() =>
          handleSortingColumn(
            SortColumn.END_DATE,
            setSortOrder,
            sortOrder,
            handleSortingFilter,
          )
        }
      >
        End Date
        {sortIcon(sortOrder, SortColumn.END_DATE)}
      </div>,
    ),
    minWidth: "100px",
    formatter: (date: string) => (date ? formatDate(date) : ""),
  };

  const procedureColumn: TColumn = {
    id: "procedure",
    name: _(
      <div
        className="flex gap-3 font-semibold text-black text-md"
        onClick={() =>
          handleSortingColumn(
            SortColumn.PROCEDURE,
            setSortOrder,
            sortOrder,
            handleSortingFilter,
          )
        }
      >
        Procedure
        {sortIcon(sortOrder, SortColumn.PROCEDURE)}
      </div>,
    ),
    minWidth: "100px",
  };

  const adherenceColumn: TColumn = {
    id: "adherence",
    name: _(
      <div
        className="flex gap-3 font-semibold text-black text-md"
        onClick={() =>
          handleSortingColumn(
            SortColumn.ADHERENCE,
            setSortOrder,
            sortOrder,
            handleSortingFilter,
          )
        }
      >
        Adherence
        {sortIcon(sortOrder, SortColumn.ADHERENCE)}
      </div>,
    ),
    minWidth: "100px",
  };

  const ROMColumn: TColumn = {
    id: "ROM",
    name: _(
      <div
        className="flex gap-3 font-semibold text-black text-md"
        onClick={() =>
          handleSortingColumn(
            SortColumn.ROM,
            setSortOrder,
            sortOrder,
            handleSortingFilter,
          )
        }
      >
        ROM
        {sortIcon(sortOrder, SortColumn.ROM)}
      </div>,
    ),
    minWidth: "100px",
  };

  return [
    checkBoxColumn,
    nameColumn,
    startDateColumn,
    endDateColumn,
    procedureColumn,
    adherenceColumn,
    ROMColumn,
  ];
};
