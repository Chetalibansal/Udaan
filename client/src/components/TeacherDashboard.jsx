import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Users,
  AlertTriangle,
  Calendar,
  BookOpen,
  Search,
  Filter,
  Send,
  Menu,
  X
} from "lucide-react";

// Mock data
const classStats = {
  totalStudents: 45,
  atRiskStudents: 8,
  averageAttendance: 84,
  averageScore: 78.5
};

const students = [
  { id: 1, name: "Alice Johnson", attendance: 95, avgScore: 88, feeStatus: "Paid", riskLevel: "safe" },
  { id: 2, name: "Bob Smith", attendance: 45, avgScore: 62, feeStatus: "Pending", riskLevel: "danger" },
  { id: 3, name: "Carol Davis", attendance: 78, avgScore: 72, feeStatus: "Paid", riskLevel: "warning" },
  { id: 4, name: "David Wilson", attendance: 92, avgScore: 85, feeStatus: "Paid", riskLevel: "safe" },
  { id: 5, name: "Emma Brown", attendance: 55, avgScore: 58, feeStatus: "Pending", riskLevel: "danger" },
  { id: 6, name: "Frank Miller", attendance: 88, avgScore: 76, feeStatus: "Paid", riskLevel: "safe" },
  { id: 7, name: "Grace Taylor", attendance: 65, avgScore: 68, feeStatus: "Paid", riskLevel: "warning" },
  { id: 8, name: "Henry Anderson", attendance: 90, avgScore: 82, feeStatus: "Paid", riskLevel: "safe" },
];

const riskDistribution = [
  { name: "Safe", value: 28, color: "hsl(var(--success))" },
  { name: "Warning", value: 9, color: "hsl(var(--warning))" },
  { name: "Critical", value: 8, color: "hsl(var(--destructive))" },
];

const monthlyTrends = [
  { month: "Jan", attendance: 88, avgScore: 75 },
  { month: "Feb", attendance: 85, avgScore: 78 },
  { month: "Mar", attendance: 82, avgScore: 76 },
  { month: "Apr", attendance: 84, avgScore: 79 },
  { month: "May", attendance: 86, avgScore: 81 },
  { month: "Jun", attendance: 84, avgScore: 78 },
];

export const TeacherDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  // FIX: Removed <number[]> type annotation
  const [selectedStudents, setSelectedStudents] = useState([]);

  const userName = localStorage.getItem("userName") || "Ms. Johnson";

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // FIX: Removed ": string" from the parameter
  const getRiskBadge = (riskLevel) => {
    switch (riskLevel) {
      case "safe":
        return <Badge className="risk-safe">Safe</Badge>;
      case "warning":
        return <Badge className="risk-warning">Warning</Badge>;
      case "danger":
        return <Badge className="risk-danger">Critical</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "students", label: "Student List", icon: Users },
    { id: "at-risk", label: "At-Risk Students", icon: AlertTriangle },
    { id: "reports", label: "Reports", icon: BookOpen },
    { id: "alerts", label: "Send Alerts", icon: Send },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "students":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Student Management</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>All Students</CardTitle>
                <CardDescription>Complete student roster with performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Avg Score</TableHead>
                      <TableHead>Fee Status</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          <span className={`font-medium ${
                            student.attendance >= 75 ? 'text-success' :
                            student.attendance >= 50 ? 'text-warning' : 'text-destructive'
                          }`}>
                            {student.attendance}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${
                            student.avgScore >= 80 ? 'text-success' :
                            student.avgScore >= 60 ? 'text-warning' : 'text-destructive'
                          }`}>
                            {student.avgScore}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={student.feeStatus === "Paid" ? "default" : "destructive"}>
                            {student.feeStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{getRiskBadge(student.riskLevel)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "at-risk":
        const atRiskStudents = students.filter(s => s.riskLevel === "danger" || s.riskLevel === "warning");
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">At-Risk Students</h2>
            <div className="grid gap-4">
              {atRiskStudents.map((student) => (
                <Card key={student.id} className="dashboard-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      {getRiskBadge(student.riskLevel)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Attendance</p>
                        <p className="font-bold text-lg">{student.attendance}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Score</p>
                        <p className="font-bold text-lg">{student.avgScore}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Fee Status</p>
                        <p className="font-bold text-lg">{student.feeStatus}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm">Contact Parent</Button>
                      <Button size="sm" variant="outline">Schedule Meeting</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Class Overview</h2>
              <Badge variant="outline">Teacher</Badge>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="metric-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{classStats.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">Active enrollments</p>
                </CardContent>
              </Card>

              <Card className="metric-card danger">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{classStats.atRiskStudents}</div>
                  <p className="text-xs text-destructive">Need intervention</p>
                </CardContent>
              </Card>

              <Card className="metric-card warning">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{classStats.averageAttendance}%</div>
                  <p className="text-xs text-warning">Needs improvement</p>
                </CardContent>
              </Card>

              <Card className="metric-card success">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Test Score</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{classStats.averageScore}%</div>
                  <p className="text-xs text-success">Above target</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="chart-container">
                <CardHeader>
                  <CardTitle>Student Risk Distribution</CardTitle>
                  <CardDescription>Current risk level breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center space-x-4 mt-4">
                    {riskDistribution.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}: {item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="chart-container">
                <CardHeader>
                  <CardTitle>Class Performance Trends</CardTitle>
                  <CardDescription>Monthly attendance and score averages</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="attendance" fill="hsl(var(--primary))" name="Attendance %" />
                      <Bar dataKey="avgScore" fill="hsl(var(--success))" name="Avg Score %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent At-Risk Students */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Students Requiring Attention</CardTitle>
                <CardDescription>Students with concerning performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.filter(s => s.riskLevel !== "safe").slice(0, 3).map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Attendance: {student.attendance}% | Score: {student.avgScore}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getRiskBadge(student.riskLevel)}
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b nav-shadow">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-xl font-bold">Teacher Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">Teacher</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-0`}>
          <div className="flex flex-col h-full pt-16 md:pt-4">
            <nav className="flex-1 px-4 py-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};