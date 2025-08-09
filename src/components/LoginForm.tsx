import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, User, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  onLogin: (userType: string, username: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [userType, setUserType] = useState<string>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let isValid = false;
      let actualUsername = "";

      if (userType === "admin") {
        if (username === "palestine71023" && password === "159200209Cc?") {
          isValid = true;
          actualUsername = "Admin";
        }
      } else if (userType === "multiple") {
        if (username === "aboselem892025" && password === "aymenseleemcardsINFO1125?") {
          isValid = true;
          actualUsername = "abo selem";
        } else if (username === "ahmedfathy892025" && password === "abofathyCARDSINFO@@?") {
          isValid = true;
          actualUsername = "ahmed fathy";
        } else if (username === "ahmedeldeeb982025" && password === "ahmedebrahim179355??SS") {
          isValid = true;
          actualUsername = "ahmed eldeeb";
        } else if (username === "saedzidan982025" && password === "saeedzidan159228Zz%%") {
          isValid = true;
          actualUsername = "saed zidan";
        }
      } else if (userType === "single") {
        // For single user, username should be a mobile number, no password required
        if (username) {
          isValid = true;
          actualUsername = username;
        }
      }

      if (isValid) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: `مرحباً ${actualUsername}`,
        });
        onLogin(userType, actualUsername);
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "اسم المستخدم أو كلمة المرور غير صحيحة",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الدخول",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <Card className="w-full max-w-md shadow-2xl animate-scale-in backdrop-blur-sm bg-white/95 border-0 relative z-10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            تسجيل الدخول
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Label htmlFor="userType">نوع المستخدم</Label>
              <Select value={userType} onValueChange={setUserType} required>
                <SelectTrigger className="transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                  <SelectValue placeholder="اختر نوع المستخدم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">مدير النظام</SelectItem>
                  <SelectItem value="multiple">مستخدم متعدد الخطوط</SelectItem>
                  <SelectItem value="single">مستخدم عادي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={cn(
              "space-y-2 transition-all duration-500 ease-in-out animate-fade-in",
              userType ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )} style={{ animationDelay: '0.4s' }}>
              <Label htmlFor="username">
                {userType === "single" ? "رقم الموبايل" : "اسم المستخدم"}
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300" />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                ) : (
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={userType === "single" ? "أدخل رقم الموبايل" : "أدخل اسم المستخدم"}
                  className="pl-10 text-right transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:shadow-lg"
                  required
                />
              </div>
            </div>

            {userType !== "single" && (
            <div className={cn(
              "space-y-2 transition-all duration-500 ease-in-out animate-fade-in",
              userType && userType !== "single" ? "opacity-100 translate-y-0 max-h-32" : "opacity-0 translate-y-4 max-h-0 overflow-hidden"
            )} style={{ animationDelay: '0.6s' }}>
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="pl-10 pr-10 text-right transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:shadow-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            )}

            <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:hover:scale-100 disabled:hover:shadow-none"
              disabled={loading || !userType}
              >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};