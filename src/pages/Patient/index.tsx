import { useMemo, useState } from "react";
import { TextInput } from "@mantine/core";
import {
  gridAdherenceColumn,
  gridCheckboxColumn,
  gridNameColumn,
  gridTableColumns,
  gridRomColumn,
} from "../../utils";
import { PatientList } from "../../const";
import GridTable from "../../components/GridTable/GridTable";
import "../../components/GridTable/GridTable.css";
import {
  IPatient,
  SortColumn,
  SortColumnPosition,
  SortOrder,
} from "../../types";

const PatientTable = () => {
  const [patientList, setPatientList] = useState<IPatient[]>(PatientList);
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    column: null,
    sort: null,
  });

  const data = useMemo(() => {
    return (
      patientList.map((ele: IPatient) => {
        const surgeryProcedure = ele?.currentProtocol?.surgeryProcedure;
        const surgeryPart = ele?.currentProtocol?.surgeryPart;
        const procedure =
          surgeryPart && surgeryProcedure
            ? `${surgeryPart}: ${surgeryProcedure.toLowerCase()}`
            : "N/A";

        return [
          gridCheckboxColumn(),
          gridNameColumn(ele),
          ele?.currentProtocol?.startDate || "",
          ele?.currentProtocol?.completionDate || "",
          procedure || "",
          gridAdherenceColumn(ele),
          gridRomColumn(ele),
        ];
      }) || []
    );
  }, [patientList, sortOrder]);

  const handleSearchFilter = (e: any) => {
    const value = e.target.value;
    if (!value.trim()) {
      return setPatientList(PatientList);
    }
    const filteredData = PatientList.filter((ele) =>
      ele.name?.toLowerCase().includes(value?.trim().toLowerCase()),
    );
    setPatientList(filteredData);
  };

  const handleSortingFilter = ({ column, sort }: SortOrder) => {
    let sortingData = patientList;
    if (column === SortColumn.NAME) {
      sortingData = sortingData.sort((a: IPatient, b: IPatient) =>
        // Compares two patient names alphabetically, taking locale into account.
        sort === SortColumnPosition.UP
          ? a.name?.localeCompare(b.name)
          : b.name?.localeCompare(a.name),
      );
    }

    if (column === SortColumn.START_DATE) {
      sortingData = sortingData.sort((a: IPatient, b: IPatient) => {
        const startDateA = Date.parse(a?.currentProtocol?.startDate as string);
        const startDateB = Date.parse(b?.currentProtocol?.startDate as string);
        return sort === SortColumnPosition.UP
          ? startDateA - startDateB
          : startDateB - startDateA;
      });
    }

    if (column === SortColumn.END_DATE) {
      sortingData = sortingData.sort((a: IPatient, b: IPatient) => {
        // Parse the completion date
        const completionDateA = Date.parse(
          a?.currentProtocol?.completionDate as string,
        );
        const completionDateB = Date.parse(
          b?.currentProtocol?.completionDate as string,
        );
        return sort === SortColumnPosition.UP
          ? completionDateA - completionDateB
          : completionDateB - completionDateA;
      });
    }

    if (column === SortColumn.PROCEDURE) {
      sortingData = sortingData.sort((a: IPatient, b: IPatient) => {
        const surgeryProcedureA = a?.currentProtocol
          ?.surgeryProcedure as string;
        const surgeryProcedureB = b?.currentProtocol
          ?.surgeryProcedure as string;
        // Compares two surgery procedure strings alphabetically, taking locale into account.
        return sort === SortColumnPosition.UP
          ? surgeryProcedureA?.localeCompare(surgeryProcedureB)
          : surgeryProcedureB?.localeCompare(surgeryProcedureA);
      });
    }

    if (column === SortColumn.ADHERENCE) {
      sortingData = sortingData.sort((a: IPatient, b: IPatient) => {
        const adherenceValueA =
          a.adherenceValue[1] === "N/A" ? 0 : parseInt(a.adherenceValue[1]);
        const adherenceValueB =
          b.adherenceValue[1] === "N/A" ? 0 : parseInt(b.adherenceValue[1]);

        return sort === SortColumnPosition.UP
          ? adherenceValueA - adherenceValueB
          : adherenceValueB - adherenceValueA;
      });
    }

    if (column === SortColumn.ROM) {
      sortingData = sortingData.sort((a: IPatient, b: IPatient) => {
        const romValueA = a.romValue[1] === "N/A" ? 0 : parseInt(a.romValue[1]);
        const romValueB = b.romValue[1] === "N/A" ? 0 : parseInt(b.romValue[1]);

        return sort === SortColumnPosition.UP
          ? romValueA - romValueB
          : romValueB - romValueA;
      });
    }
    setPatientList(sortingData);
  };

  return (
    <div className="p-10">
      <div className="text-3xl font-semibold">Patients</div>
      <TextInput
        size="md"
        radius="md"
        label="Search"
        placeholder="Enter Name"
        onChange={handleSearchFilter}
        className="mt-2 w-[300px]"
        classNames={{
          label: "text-gray-500 text-sm ml-2",
          input:
            "bg-[#edf5f1] text-[#00591b] text-md border-0 font-semibold placeholder:text-[#247547] focus:border-0",
        }}
      />
      <div className="mt-8">
        <GridTable
          data={data}
          columns={gridTableColumns(
            sortOrder,
            setSortOrder,
            handleSortingFilter,
          )}
        />
      </div>
    </div>
  );
};
export default PatientTable;
