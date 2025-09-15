import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, User, Users, Heart } from "lucide-react";

export const DemoHelperCard = () => {
  return (
    <Card className="dashboard-card border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Demo Guide</CardTitle>
        </div>
        <CardDescription>
          Try different user roles to explore the educational analytics platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Student Dashboard</p>
                <p className="text-sm text-muted-foreground">Personal performance view</p>
              </div>
            </div>
            <Badge variant="outline">student@demo.com</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="font-medium">Teacher Dashboard</p>
                <p className="text-sm text-muted-foreground">Class overview & risk analysis</p>
              </div>
            </div>
            <Badge variant="outline">teacher@demo.com</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center">
                <Heart className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="font-medium">Admin Dashboard</p>
                <p className="text-sm text-muted-foreground">System monitoring and user creation</p>
              </div>
            </div>
            <Badge variant="outline">admin@demo.com</Badge>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            <strong>Password:</strong> demo123 for all accounts
          </p>
        </div>
      </CardContent>
    </Card>
  );
};