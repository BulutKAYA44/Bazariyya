import React from "react";
import styled from "styled-components";
import media from "../../utils/media";

const TableContainer = styled.table`
  border-spacing: 1rem;
  border-collapse: initial;

  .value {
    word-break: break-all;
  }

  ${media.xs`
    border-spacing: 0.5rem;
  `}
`;

function Table({ header, data, className = "" }) {
  return (
    <div>
      {header && (
        <>
          <h5>{header}</h5>
        </>
      )}
      <TableContainer className={className}>
        <tbody>
          {data.map((item, idx) => {
            return (
              <tr key={idx}>
                <td className="font-weight-bold">{`${item.name}:`}</td>
                <td className="value">{item.type === "html" ? <div dangerouslySetInnerHTML={{ __html: item.value }} /> : item.value}</td>
              </tr>
            );
          })}
        </tbody>
      </TableContainer>
    </div>
  );
}

export default Table;
