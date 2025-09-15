import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { 
  Calendar, 
  BookOpen, 
  DollarSign, 
  AlertTriangle, 
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Heart
} from "lucide-react";

// Mock data for child
const childData = {
  name: "Emma Johnson",
  grade: "Grade 10",
  class: "10-A",
  attendance: 78,
  averageScore: 82,
  feeStatus: "Paid",
  lastUpdated: "2 hours ago"
};

const performanceTrend = [
  { week: "Week 1", score: 75, attendance: 85 },
  { week: "Week 2", score: 78, attendance: 82 },
  { week: "Week 3", score: 82, attendance: 78 },
  { week: "Week 4", score: 85, attendance: 80 },
  { week: "Week 5", score: 82, attendance: 78 },
  { week: "Week 6", score: 88, attendance: 85 },
];

const subjectScores = [
  { subject: "Math", score: 85, trend: "up" },
  { subject: "Science", score: 88, trend: "up" },
  { subject: "English", score: 75, trend: "down" },
  { subject: "History", score: 82, trend: "up" },
  { subject: "Physics", score: 90, trend: "up" },
];

const alerts = [
  { 
    id: 1, 
    type: "warning", 
    message: "Attendance is below 80% this month", 
    time: "Today",
    urgent: true 
  },
  { 
    id: 2, 
    type: "info", 
    message: "Parent-teacher meeting scheduled for next Friday", 
    time: "Yesterday",
    urgent: false 
  },
  { 
    id: 3, 
    type: "success", 
    message: "Great improvement in Science this week!", 
    time: "2 days ago",
    urgent: false 
  },
];

const teacherMessages = [
  {
    id: 1,
    teacher: "Ms. Smith (Math)",
    message: "Emma is showing good progress in algebra. Keep encouraging her practice.",
    time: "3 hours ago",
    subject: "Math Progress Update"
  },
  {
    id: 2,
    teacher: "Mr. Davis (Science)",
    message: "Please ensure Emma completes the chemistry lab report by Friday.",
    time: "1 day ago",
    subject: "Lab Assignment"
  },
  {
    id: 3,
    teacher: "Mrs. Wilson (English)",
    message: "Emma's essay writing has improved significantly. Well done!",
    time: "2 days ago",
    subject: "Writing Improvement"
  },
];

export const ParentDashboard = () => {
  const userName = localStorage.getItem("userName") || "Sarah Johnson";
  
  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 80) return { color: "success", text: "Good", icon: TrendingUp };
    if (percentage >= 60) return { color: "warning", text: "Needs Attention", icon: TrendingDown };
    return { color: "destructive", text: "Critical", icon: TrendingDown };
  };

  const getScoreStatus = (score: number) => {
    if (score >= 85) return { color: "success", text: "Excellent", icon: TrendingUp };
    if (score >= 70) return { color: "warning", text: "Good", icon: TrendingUp };
    return { color: "destructive", text: "Needs Support", icon: TrendingDown };
  };

  const attendanceStatus = getAttendanceStatus(childData.attendance);
  const scoreStatus = getScoreStatus(childData.averageScore);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b nav-shadow">
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold">Parent Dashboard</h1>
            <p className="text-sm text-muted-foreground">Monitoring {childData.name}'s progress</p>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">Parent</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Child Profile Header */}
        <Card className="dashboard-card mb-6">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-lg">{childData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{childData.name}</CardTitle>
                <CardDescription className="text-lg">
                  {childData.grade} • {childData.class}
                </CardDescription>
                <p className="text-xs text-muted-foreground mt-1">
                  Last updated: {childData.lastUpdated}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className={`metric-card ${attendanceStatus.color === 'success' ? 'success' : attendanceStatus.color === 'warning' ? 'warning' : 'danger'}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{childData.attendance}%</div>
                  <p className={`text-sm flex items-center gap-1 mt-1 text-${attendanceStatus.color}`}>
                    <attendanceStatus.icon className="h-4 w-4" />
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
                  <div className="text-3xl font-bold">{childData.averageScore}%</div>
                  <p className={`text-sm flex items-center gap-1 mt-1 text-${scoreStatus.color}`}>
                    <scoreStatus.icon className="h-4 w-4" />
                    {scoreStatus.text}
                  </p>
                </CardContent>
              </Card>

              <Card className="metric-card success">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fee Status</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{childData.feeStatus}</div>
                  <p className="text-sm text-success mt-1 flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    All clear
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="chart-container">
                <CardHeader>
                  <CardTitle>Performance Trend</CardTitle>
                  <CardDescription>Weekly progress over the last 6 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={performanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        name="Test Score %"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="attendance" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={3}
                        name="Attendance %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="chart-container">
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Latest scores by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={subjectScores}>
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

            {/* Subject Details */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Subject Performance Breakdown</CardTitle>
                <CardDescription>Detailed view of performance across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjectScores.map((subject) => (
                    <div key={subject.subject} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{subject.subject}</h4>
                        {subject.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-success" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <div className="text-2xl font-bold mb-1">{subject.score}%</div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${subject.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-6 mt-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Important Alerts</CardTitle>
                <CardDescription>Notifications and updates about your child's performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`p-4 rounded-lg border-l-4 ${
                        alert.type === 'warning' ? 'bg-warning-light border-l-warning' :
                        alert.type === 'success' ? 'bg-success-light border-l-success' :
                        'bg-primary/5 border-l-primary'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-warning" />}
                            {alert.urgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
                          </div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-muted-foreground mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-6 mt-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Messages from Teachers</CardTitle>
                <CardDescription>Communication from your child's teachers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacherMessages.map((message) => (
                    <div key={message.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{message.subject}</h4>
                          <p className="text-sm text-muted-foreground">{message.teacher}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                      </div>
                      <p className="text-sm">{message.message}</p>
                      <Button size="sm" variant="outline" className="mt-3">
                        Reply
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};