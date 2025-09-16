import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  User, 
  Calendar, 
  BookOpen, 
  DollarSign, 
  Bell, 
  TrendingUp, 
  TrendingDown,
  Menu,
  X
} from "lucide-react";

// Mock data
const attendanceData = [
  { month: "Jan", attendance: 85 },
  { month: "Feb", attendance: 92 },
  { month: "Mar", attendance: 78 },
  { month: "Apr", attendance: 88 },
  { month: "May", attendance: 95 },
  { month: "Jun", attendance: 82 },
];

const testScoreData = [
  { subject: "Math", score: 85 },
  { subject: "Science", score: 92 },
  { subject: "English", score: 78 },
  { subject: "History", score: 88 },
  { subject: "Physics", score: 90 },
];

const notifications = [
  { id: 1, type: "warning", message: "Math assignment due tomorrow", time: "2 hours ago" },
  { id: 2, type: "info", message: "Parent-teacher meeting scheduled", time: "1 day ago" },
  { id: 3, type: "success", message: "Great improvement in Science!", time: "2 days ago" },
];

export const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  
  const userName = localStorage.getItem("userName") || "John Doe";
  const currentAttendance = 82;
  const averageScore = 86.6;
  const feeStatus = "Paid";

  // FIX: Removed ": number" from the parameter
  const getAttendanceStatus = (percentage) => {
    if (percentage >= 75) return { color: "success", text: "Good" };
    if (percentage >= 50) return { color: "warning", text: "Warning" };
    return { color: "destructive", text: "Critical" };
  };

  // FIX: Removed ": number" from the parameter
  const getScoreStatus = (score) => {
    if (score >= 80) return { color: "success", icon: TrendingUp };
    if (score >= 60) return { color: "warning", icon: TrendingUp };
    return { color: "destructive", icon: TrendingDown };
  };

  const attendanceStatus = getAttendanceStatus(currentAttendance);
  const scoreStatus = getScoreStatus(averageScore);

  const menuItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "scores", label: "Test Scores", icon: BookOpen },
    { id: "fees", label: "Fee Status", icon: DollarSign },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "attendance":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Attendance Tracking</h2>
            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Monthly Attendance</CardTitle>
                <CardDescription>Your attendance percentage over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );
      
      case "scores":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Test Scores</h2>
            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Your latest test scores by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={testScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <Badge variant="outline">Student</Badge>
            </div>
            
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className={`metric-card ${attendanceStatus.color === 'success' ? 'success' : attendanceStatus.color === 'warning' ? 'warning' : 'danger'}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentAttendance}%</div>
                  <p className={`text-xs text-${attendanceStatus.color}`}>
                    {attendanceStatus.text}
                  </p>
                </CardContent>
              </Card>

              <Card className={`metric-card ${scoreStatus.color === 'success' ? 'success' : scoreStatus.color === 'warning' ? 'warning' : 'danger'}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
                  <p className={`text-xs text-${scoreStatus.color} flex items-center gap-1`}>
                    <scoreStatus.icon className="h-3 w-3" />
                    Above Average
                  </p>
                </CardContent>
              </Card>

              <Card className="metric-card success">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fee Status</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{feeStatus}</div>
                  <p className="text-xs text-success">
                    All clear
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="chart-container">
                <CardHeader>
                  <CardTitle>Attendance Trend</CardTitle>
                  <CardDescription>Last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="attendance" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="chart-container">
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Latest test scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={testScoreData.slice(0, 4)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Notifications */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Important updates and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-4">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'warning' ? 'bg-warning' :
                        notification.type === 'success' ? 'bg-success' : 'bg-primary'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
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
            <h1 className="text-xl font-bold">Student Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">Student</p>
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