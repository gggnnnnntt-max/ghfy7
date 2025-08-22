import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import QRScanner from './components/QRScanner.jsx'
import AddMemberDialog from './components/AddMemberDialog.jsx'
import EditMemberDialog from './components/EditMemberDialog.jsx'
import EditServiceDialog from './components/EditServiceDialog.jsx'
import { 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Search, 
  Edit, 
  MessageCircle,
  QrCode,
  FileText,
  Settings,
  CreditCard,
  UserPlus,
  RefreshCw,
  Bell,
  Download,
  Eye,
  Camera,
  CheckCircle,
  XCircle,
  Star,
  Gift,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  Smartphone,
  Mail,
  Phone,
  Crown,
  Heart
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell, AreaChart, Area } from 'recharts'
import './App.css'

function App() {
  // State management
  const [activeTab, setActiveTab] = useState('dashboard')
  const [members, setMembers] = useState([
    {
      id: 'GYM001',
      name: 'سارة أحمد محمد',
      phone: '0501234567',
      email: 'sara.ahmed@example.com',
      membershipType: 'VIP شهري',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      status: 'نشط',
      qrCode: 'GYM001QR2024',
      visits: 18,
      totalSpent: 1200,
      lastVisit: '2024-01-20',
      notes: 'عضوة مميزة - تفضل التمارين الصباحية'
    },
    {
      id: 'GYM002',
      name: 'فاطمة محمد علي',
      phone: '0507654321',
      email: 'fatima.mohammed@example.com',
      membershipType: 'بلاتينيوم ثلاثة أشهر',
      startDate: '2024-01-01',
      endDate: '2024-04-01',
      status: 'نشط',
      qrCode: 'GYM002QR2024',
      visits: 32,
      totalSpent: 2100,
      lastVisit: '2024-01-20',
      notes: 'تحب تمارين اليوغا والبيلاتس'
    },
    {
      id: 'GYM003',
      name: 'نورا سالم خالد',
      phone: '0551234567',
      email: 'nora.salem@example.com',
      membershipType: 'عادي شهري',
      startDate: '2023-12-15',
      endDate: '2024-01-15',
      status: 'منتهي',
      qrCode: 'GYM003QR2024',
      visits: 12,
      totalSpent: 400,
      lastVisit: '2024-01-10',
      notes: 'تحتاج تذكير للتجديد'
    }
  ])

  const [services, setServices] = useState([
    { id: 1, name: 'اشتراك عادي شهري', price: 200, category: 'اشتراك', discount: 0, description: 'اشتراك أساسي يشمل جميع الأجهزة' },
    { id: 2, name: 'اشتراك VIP شهري', price: 350, category: 'اشتراك', discount: 0, description: 'اشتراك مميز مع مدرب شخصي' },
    { id: 3, name: 'اشتراك عادي ثلاثة أشهر', price: 550, category: 'اشتراك', discount: 50, description: 'اشتراك ثلاثة أشهر بخصم 50 ريال' },
    { id: 4, name: 'جلسة واحدة', price: 30, category: 'جلسة', discount: 0, description: 'جلسة تدريب واحدة' },
    { id: 5, name: 'مشروب بروتين', price: 18, category: 'منتج', discount: 0, description: 'مشروب بروتين طبيعي' }
  ])

  const [sales, setSales] = useState([
    { id: 1, date: '2024-01-20', member: 'سارة أحمد محمد', service: 'اشتراك VIP شهري', amount: 350, paymentMethod: 'نقدي', time: '09:30' },
    { id: 2, date: '2024-01-20', member: 'فاطمة محمد علي', service: 'مشروب بروتين', amount: 18, paymentMethod: 'بطاقة', time: '10:15' },
    { id: 3, date: '2024-01-19', member: 'نورا سالم خالد', service: 'جلسة واحدة', amount: 30, paymentMethod: 'نقدي', time: '16:45' }
  ])

   const [searchTerm, setSearchTerm] = useState("")
  const [selectedMember, setSelectedMember] = useState(null)
  const [showMemberDetails, setShowMemberDetails] = useState(false)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [showEditMember, setShowEditMember] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [showEditService, setShowEditService] = useState(false)// Calculate statistics
  const todayRevenue = sales
    .filter(sale => sale.date === '2024-01-20')
    .reduce((sum, sale) => sum + sale.amount, 0)

  const activeMembers = members.filter(member => member.status === 'نشط').length
  const totalMembers = members.length
  const todayVisits = 15
  const expiringMembers = members.filter(member => {
    const endDate = new Date(member.endDate)
    const today = new Date()
    const diffTime = endDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }).length

  // Chart data
  const weeklyRevenue = [
    { day: 'السبت', revenue: 680, visits: 25 },
    { day: 'الأحد', revenue: 520, visits: 18 },
    { day: 'الاثنين', revenue: 750, visits: 32 },
    { day: 'الثلاثاء', revenue: 420, visits: 15 },
    { day: 'الأربعاء', revenue: 890, visits: 28 },
    { day: 'الخميس', revenue: 650, visits: 22 },
    { day: 'الجمعة', revenue: 380, visits: 12 }
  ]

  // Send WhatsApp message - Open WhatsApp directly
  const sendWhatsApp = (member) => {
    const message = `📋 تفاصيل عضويتك

👤 الاسم: ${member.name}
🆔 رقم العضوية: ${member.id}
💎 نوع الاشتراك: ${member.membershipType}
📅 تاريخ الانتهاء: ${member.endDate}
✅ حالة الاشتراك: ${member.status}
🔗 كود العضوية: ${member.qrCode}
👥 عدد الزيارات: ${member.visits}

شكراً لك! 🌟`
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${member.phone.replace(/^0/, '966')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // Add new member
  const handleAddMember = (newMember) => {
    setMembers(prev => [...prev, newMember])
    
    // Add to sales record
    const newSale = {
      id: sales.length + 1,
      date: new Date().toISOString().split('T')[0],
      member: newMember.name,
      service: newMember.membershipType,
      amount: newMember.totalSpent,
      paymentMethod: 'نقدي',
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    }
    setSales(prev => [...prev, newSale])
  }

  // Update service price
  const handleUpdateService = (serviceId, newPrice, newDiscount = 0) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, price: newPrice, discount: newDiscount }
        : service
    ))
  }

  // Save edited member
  const handleSaveMember = (updatedMember) => {
    setMembers(prev => prev.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ))
  }

  // Save edited service
  const handleSaveService = (updatedService) => {
    setServices(prev => prev.map(service => 
      service.id === updatedService.id ? updatedService : service
    ))
  }

  // Handle QR scan success
  const handleQRScanSuccess = (member) => {
    // Update visit count
    const updatedMembers = members.map(m => 
      m.id === member.id ? { ...m, visits: m.visits + 1, lastVisit: new Date().toISOString().split('T')[0] } : m
    )
    setMembers(updatedMembers)
    
    // Show member details
    setSelectedMember(member)
    setShowMemberDetails(true)
    
    // Show success message
    alert(`مرحباً ${member.name}! تم تسجيل دخولك بنجاح. عدد زياراتك: ${member.visits + 1}`)
  }

  // Filter members
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.qrCode.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50" dir="rtl">
      {/* Modern Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  نظام كاشير صالات الحديد النسائية
                </h1>
                <p className="text-sm text-gray-600">إدارة شاملة ومتطورة للمشتركات والمبيعات</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowQRScanner(true)}
              >
                <Camera className="w-4 h-4" />
                مسح QR
              </Button>
              
              <div className="flex items-center space-x-2 space-x-reverse bg-green-50 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">متصل</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/50 backdrop-blur-sm p-1 rounded-2xl border border-purple-100">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Users className="w-4 h-4" />
              إدارة المشتركات
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <CreditCard className="w-4 h-4" />
              المبيعات
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <PieChart className="w-4 h-4" />
              التقارير
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Settings className="w-4 h-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Enhanced Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 text-white border-0 shadow-xl">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">الإيرادات اليوم</CardTitle>
                  <DollarSign className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{todayRevenue.toLocaleString()} ريال</div>
                  <p className="text-xs opacity-80 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% من الأمس
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden bg-gradient-to-br from-pink-500 to-rose-600 text-white border-0 shadow-xl">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">المشتركات النشطات</CardTitle>
                  <Users className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{activeMembers}</div>
                  <p className="text-xs opacity-80">من أصل {totalMembers} عضوة</p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-xl">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">الزيارات اليوم</CardTitle>
                  <Activity className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{todayVisits}</div>
                  <p className="text-xs opacity-80">متوسط يومي ممتاز</p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600 text-white border-0 shadow-xl">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">تنتهي قريباً</CardTitle>
                  <Bell className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{expiringMembers}</div>
                  <p className="text-xs opacity-80">خلال 7 أيام</p>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Chart */}
            <Card className="bg-white/70 backdrop-blur-sm border-purple-100 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  الإيرادات الأسبوعية
                </CardTitle>
                <CardDescription>تحليل الإيرادات والزيارات</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={weeklyRevenue}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8b5cf6" 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="البحث بالاسم أو الجوال أو رقم العضوية أو كود QR..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 w-80 bg-white/70 backdrop-blur-sm border-purple-200"
                  />
                </div>
              </div>
              <Button 
                onClick={() => setShowAddMember(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة مشتركة جديدة
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map(member => (
                <Card key={member.id} className="hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-purple-100 overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {member.name.split(' ')[0]?.charAt(0)}{member.name.split(' ')[1]?.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-lg leading-tight">{member.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <Crown className="w-3 h-3" />
                            {member.id}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge 
                        variant={member.status === 'نشط' ? 'default' : 'destructive'}
                        className={member.status === 'نشط' ? 
                          'bg-gradient-to-r from-green-500 to-emerald-500' : 
                          'bg-gradient-to-r from-red-500 to-rose-500'
                        }
                      >
                        {member.status === 'نشط' ? <CheckCircle className="w-3 h-3 ml-1" /> : <XCircle className="w-3 h-3 ml-1" />}
                        {member.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4 text-purple-500" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4 text-purple-500" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Star className="w-4 h-4 text-purple-500" />
                        <span>{member.membershipType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span>{member.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Activity className="w-4 h-4 text-purple-500" />
                        <span>{member.visits} زيارة</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4 text-purple-500" />
                        <span>{member.totalSpent} ريال</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                      <div className="flex items-center justify-center mb-2">
                        <QrCode className="w-12 h-12 text-purple-600" />
                      </div>
                      <p className="text-center font-mono text-sm font-bold text-purple-700">{member.qrCode}</p>
                      <p className="text-center text-xs text-gray-600 mt-1">كود العضوية</p>
                    </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          className="flex-1 border-purple-200"
                          onClick={() => sendWhatsApp(member)}
                        >
                          <Whatsapp className="w-4 h-4 ml-1" />
                          واتساب
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 border-purple-200"
                          onClick={() => {
                            setSelectedMember(member)
                            setShowMemberDetails(true)
                          }}
                        >
                          <Info className="w-4 h-4 ml-1" />
                          تفاصيل
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 border-blue-200"
                          onClick={() => {
                            setEditingMember(member)
                            setShowEditMember(true)
                          }}
                        >
                          <Edit className="w-4 h-4 ml-1" />
                          تعديل
                        </Button>
                      </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Member Details Dialog */}
            <Dialog open={showMemberDetails} onOpenChange={setShowMemberDetails}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-purple-600" />
                    تفاصيل العضوية الكاملة
                  </DialogTitle>
                </DialogHeader>
                {selectedMember && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold border-4 border-purple-200">
                        {selectedMember.name.split(' ')[0]?.charAt(0)}{selectedMember.name.split(' ')[1]?.charAt(0)}
                      </div>
                      <h3 className="text-xl font-bold">{selectedMember.name}</h3>
                      <p className="text-gray-600">رقم العضوية: {selectedMember.id}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                      <div className="flex items-center justify-center mb-4">
                        <QrCode className="w-16 h-16 text-purple-600" />
                      </div>
                      <p className="text-center font-mono text-lg font-bold text-purple-700">{selectedMember.qrCode}</p>
                      <p className="text-center text-sm text-gray-600 mt-2">امسح هذا الكود للدخول</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">الحالة:</span>
                          <Badge variant={selectedMember.status === 'نشط' ? 'default' : 'destructive'}>
                            {selectedMember.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">نوع الاشتراك:</span>
                          <span className="font-medium">{selectedMember.membershipType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">تاريخ الانتهاء:</span>
                          <span>{selectedMember.endDate}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">عدد الزيارات:</span>
                          <span className="font-bold text-purple-600">{selectedMember.visits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">إجمالي الإنفاق:</span>
                          <span className="font-bold text-green-600">{selectedMember.totalSpent} ريال</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">آخر زيارة:</span>
                          <span>{selectedMember.lastVisit}</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={() => sendWhatsApp(selectedMember)}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
                    >
                      <MessageCircle className="w-4 h-4 ml-1" />
                      إرسال واتساب
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-purple-100 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  المبيعات الأخيرة
                </CardTitle>
                <CardDescription>سجل جميع العمليات المالية</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>التاريخ والوقت</TableHead>
                      <TableHead>المشتركة</TableHead>
                      <TableHead>الخدمة</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>طريقة الدفع</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sales.map(sale => (
                      <TableRow key={sale.id} className="hover:bg-purple-50/50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{sale.date}</div>
                            <div className="text-sm text-gray-500">{sale.time}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{sale.member}</TableCell>
                        <TableCell>{sale.service}</TableCell>
                        <TableCell>
                          <span className="font-bold text-green-600">{sale.amount} ريال</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {sale.paymentMethod}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    الإيرادات الشهرية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">15,750 ريال</div>
                  <p className="text-green-100 mb-4">إجمالي الإيرادات هذا الشهر</p>
                  <Button variant="outline" className="border-white text-green-600 hover:bg-white">
                    <Download className="w-4 h-4 ml-2" />
                    تحميل التقرير
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    تقرير المشتركات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>المشتركات النشطة:</span>
                      <span className="font-bold">{activeMembers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المشتركات المنتهية:</span>
                      <span className="font-bold">{members.filter(m => m.status === 'منتهي').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>إجمالي العضوات:</span>
                      <span className="font-bold">{totalMembers}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 border-white text-blue-600 hover:bg-white">
                    <Download className="w-4 h-4 ml-2" />
                    تحميل التقرير
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    تقرير النشاط
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>زيارات اليوم:</span>
                      <span className="font-bold">{todayVisits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>متوسط الزيارات:</span>
                      <span className="font-bold">22</span>
                    </div>
                    <div className="flex justify-between">
                      <span>معدل الحضور:</span>
                      <span className="font-bold">85%</span>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 border-white text-purple-600 hover:bg-white">
                    <Download className="w-4 h-4 ml-2" />
                    تحميل التقرير
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-purple-100 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  إعدادات الأسعار والعروض
                </CardTitle>
                <CardDescription>إدارة أسعار الخدمات والعروض الترويجية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map(service => (
                    <div key={service.id} className="flex items-center justify-between p-4 border border-purple-100 rounded-xl bg-white/50">
                      <div className="flex-1">
                        <h4 className="font-medium text-lg">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <Badge variant="outline" className="mt-1">
                          {service.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            {service.price - (service.discount || 0)} ريال
                          </div>
                          {service.discount > 0 && (
                            <div className="text-sm text-gray-500 line-through">
                              {service.price} ريال
                            </div>
                          )}
                        </div>
                        {service.discount > 0 && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500">
                            <Gift className="w-3 h-3 ml-1" />
                            خصم {service.discount} ريال
                          </Badge>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingService(service)
                            setShowEditService(true)
                          }}
                        >
                          <Edit className="w-4 h-4 ml-1" />
                          تعديل
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* QR Scanner Component */}
      <QRScanner
        isOpen={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        onScanSuccess={handleQRScanSuccess}
        members={members}
      />

      {/* Add Member Dialog */}
      <AddMemberDialog
        isOpen={showAddMember}
        onClose={() => setShowAddMember(false)}
        onAddMember={handleAddMember}
        services={services}
      />

      {/* Edit Member Dialog */}
      <EditMemberDialog
        isOpen={showEditMember}
        onClose={() => setShowEditMember(false)}
        onSaveMember={handleSaveMember}
        member={editingMember}
        services={services}
      />

      {/* Edit Service Dialog */}
      <EditServiceDialog
        isOpen={showEditService}
        onClose={() => setShowEditService(false)}
        onSaveService={handleSaveService}
        service={editingService}
      />
    </div>
  )
}

export default App

