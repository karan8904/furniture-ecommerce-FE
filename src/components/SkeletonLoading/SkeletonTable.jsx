import React from "react";
import { Skeleton, TableCell, TableRow } from "@mui/material";

const SkeletonTable = ({ row, column, rowSpan, colSpan }) => {
  return (
    <>
      {Array.from({ length: row }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: column }).map((_, colIndex) => (
            <TableCell key={colIndex} rowSpan={rowSpan} colSpan={colSpan}>
              <Skeleton variant="rounded" width="100%" height={10} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonTable;
