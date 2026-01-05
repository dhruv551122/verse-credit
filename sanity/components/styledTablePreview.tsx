import { StyledTable } from "@/sanity.types";
import { Card } from "@sanity/ui";
import { PortableText } from "next-sanity";
import { PreviewProps } from "sanity";

export default function StyledTablePreview(
  value: PreviewProps & {
    rows?: StyledTable["rows"];
  }
) {
  if (!value?.rows?.length) {
    return (
      <div className="flex justify-between items-center">
        <strong>Table ({value.rows?.length ?? 0} rows)</strong>
        {typeof value.actions === "function" ? (
          <value.actions layout="compact" />
        ) : (
          <div style={{ display: "flex", gap: 4 }}>{value.actions}</div>
        )}
      </div>
    );
  }

  return (
    <Card padding={3} radius={2} shadow={1}>
      <div className="flex justify-between items-center">
        <strong>Table ({value.rows?.length ?? 0} rows)</strong>
        {typeof value.actions === "function" ? (
          <value.actions layout="compact" />
        ) : (
          <div style={{ display: "flex", gap: 4 }}>{value.actions}</div>
        )}
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {value.rows?.map((row, i: number) => (
            <tr key={i}>
              {row.cells?.map((cell, j: number) => {
                return (
                  <td
                    key={j}
                    style={{
                      border: "1px solid #ddd",
                      padding: "6px",
                      backgroundColor: cell?.bgColor?.value,
                      color: cell?.textColor?.value,
                      verticalAlign: "top",
                    }}
                  >
                    {cell.content && <PortableText value={cell.content} />}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
