import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import { Download, Assessment, People, DirectionsCar, Event } from '@mui/icons-material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminReport = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/reports')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

 const downloadExcel = () => {
  const wb = XLSX.utils.book_new();

  // Convert each category to a sheet
  const sheets = {
    Users: XLSX.utils.json_to_sheet(data.totalUsers),
    Reports: XLSX.utils.json_to_sheet(data.totalReports),
    Licenses: XLSX.utils.json_to_sheet(data.totalLicense),
    Vehicles: XLSX.utils.json_to_sheet(data.totalVehicleReports),
    Appointments: XLSX.utils.json_to_sheet(data.totalappointments),
  };

  // Append sheets to workbook
  for (let sheetName in sheets) {
    XLSX.utils.book_append_sheet(wb, sheets[sheetName], sheetName);
  }

  // Export
  XLSX.writeFile(wb, 'detailed-report.xlsx');
};


const downloadPDF = () => {
  const doc = new jsPDF();
  let y = 20;
  const margin = 10;
  const pageHeight = doc.internal.pageSize.height;

  // Title
  doc.setFontSize(18);
  doc.text("Detailed Admin Report", 60, y);
  y += 10;

  // Utility to draw a box (card style)
  const drawBox = (x, y, w, h) => {
    doc.setDrawColor(180); // Light gray border
    doc.setLineWidth(0.2);
    doc.rect(x, y, w, h);
  };

  // Section handler
const addSection = (title, records) => {
  if (y + 10 > pageHeight) {
    doc.addPage();
    y = 20;
  }

  // Section Header
  doc.setFillColor(230, 230, 250); // Lavender section background
  doc.setTextColor(33, 33, 33);
  doc.setFontSize(14);
  doc.rect(margin, y, 190, 10, 'F');
  doc.text(title, margin + 4, y + 7);
  y += 14;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  records.forEach((record) => {
    const keys = Object.keys(record);
    let contentLines = [];

    keys.forEach((key) => {
      const label = `${key.charAt(0).toUpperCase() + key.slice(1)}: `;
      const value = `${record[key]}`;
      contentLines.push({ label, value });
    });

    const lineHeight = 6;
    const boxHeight = contentLines.length * lineHeight + 6;

    if (y + boxHeight > pageHeight - 10) {
      doc.addPage();
      y = 20;
    }

    drawBox(margin, y, 190, boxHeight);

    let lineY = y + 6;
    contentLines.forEach(({ label, value }) => {
      doc.setFont(undefined, "bold");
      doc.text(label, margin + 4, lineY);

      doc.setFont(undefined, "normal");
      doc.text(value, margin + 50, lineY); // Align values after labels
      lineY += lineHeight;
    });

    y += boxHeight + 6;
  });

  y += 4;
};



  // Add each section
  addSection("Users", data.totalUsers);
  addSection("Reports", data.totalReports);
  addSection("Licenses", data.totalLicense);
  addSection("Vehicles", data.totalVehicleReports);
  addSection("Appointments", data.totalappointments);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Generated on: " + new Date().toLocaleString(), margin, pageHeight - 10);

  // Save file
  doc.save("detailed-report.pdf");
};




  if (!data) return <CircularProgress sx={{ m: 5 }} />;

  const summaryData = [
    { name: 'Users', value: data.totalUsers.length },
    { name: 'Reports', value: data.totalReports.length },
    { name: 'Licenses', value: data.totalLicense.length },
    { name: 'Vehicles', value: data.totalVehicleReports.length },
    { name: 'Appointments', value: data.totalappointments.length }
  ];

  return (
    <Box sx={{ p: 15 }}>
      <Typography variant="h4" gutterBottom>📊 Admin Report Dashboard</Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={2.4}>
          <Card sx={{ bgcolor: '#1976d2', color: '#fff' }}>
            <CardContent>
              <People /><Typography variant="h6">Users</Typography>
              <Typography>{data.totalUsers.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <Card sx={{ bgcolor: '#388e3c', color: '#fff' }}>
            <CardContent>
              <Assessment /><Typography variant="h6">Reports</Typography>
              <Typography>{data.totalReports.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <Card sx={{ bgcolor: '#f57c00', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6">Licenses</Typography>
              <Typography>{data.totalLicense.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <Card sx={{ bgcolor: '#6a1b9a', color: '#fff' }}>
            <CardContent>
              <DirectionsCar /><Typography variant="h6">Vehicles</Typography>
              <Typography>{data.totalVehicleReports.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <Card sx={{ bgcolor: '#c2185b', color: '#fff' }}>
            <CardContent>
              <Event /><Typography variant="h6">Appointments</Typography>
              <Typography>{data.totalappointments.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Pie Chart</Typography>
          <PieChart width={300} height={250}>
            <Pie
              data={summaryData}
              cx="50%"
              cy="50%"
              label
              outerRadius={90}
              dataKey="value"
            >
              {summaryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Bar Chart</Typography>
          <BarChart width={400} height={250} data={summaryData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#1976d2" />
          </BarChart>
        </Grid>
      </Grid>

      {/* Export Buttons */}
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="success" startIcon={<Download />} onClick={downloadExcel} sx={{ mr: 2 }}>
          Download Excel
        </Button>
        <Button variant="contained" color="error" startIcon={<Download />} onClick={downloadPDF}>
          Download PDF
        </Button>
      </Box>
    </Box>
  );
};

export default AdminReport;
