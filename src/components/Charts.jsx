import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@mui/material";
import { colorToken } from "../utils/theme";

const data = [
  {
    type: "Jan",
    sales: 380,
  },
  {
    type: "Feb",
    sales: 990,
  },
  {
    type: "Mar",
    sales: 610,
  },
  {
    type: "Apr",
    sales: 450,
  },
  {
    type: "May",
    sales: 880,
  },
  {
    type: "Jun",
    sales: 950,
  },
  {
    type: "July",
    sales: 650,
  },
  {
    type: "Aug",
    sales: 850,
  },
  {
    type: "Sept",
    sales: 800,
  },
  {
    type: "Oct",
    sales: 900,
  },
  {
    type: "Nov",
    sales: 538,
  },
  {
    type: "Dec",
    sales: 750,
  },
];

const Charts = () => {
  const theme = useTheme();
  const colors = colorToken(theme.palette.mode);

  return (
    <ResponsiveContainer width={"90%"} height={350}>
      <BarChart
        width={"100%"}
        barSize={40}
        data={data}
        margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill={colors.green[100]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Charts;
