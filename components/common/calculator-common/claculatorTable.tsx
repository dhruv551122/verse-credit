import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CalculatorTable = ({
  data,
}: {
  data: {
    year: number;
    month: number;
    interestForMonth: number;
    balance: number;
    principlePaid: number;
  }[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Month</TableHead>
          <TableHead>Principle Paid</TableHead>
          <TableHead>Interest Charged</TableHead>
          <TableHead>Total Payment</TableHead>
          <TableHead>Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((detail, index) => (
          <TableRow key={index}>
            <TableCell>{detail.month}</TableCell>
            <TableCell>{detail.principlePaid}</TableCell>
            <TableCell>{detail.interestForMonth}</TableCell>
            <TableCell>
              {detail.principlePaid + detail.interestForMonth}
            </TableCell>
            <TableCell>{detail.balance}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CalculatorTable;
