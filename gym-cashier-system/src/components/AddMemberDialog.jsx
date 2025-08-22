import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { UserPlus, Save, X, Crown, QrCode, Calendar, Phone, Mail, User } from 'lucide-react'

const AddMemberDialog = ({ isOpen, onClose, onAddMember, services }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    membershipType: '',
    duration: '1', // months
    notes: '',
    discount: 0
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate member ID
  const generateMemberId = () => {
    const timestamp = Date.now().toString().slice(-4)
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0')
    return `GYM${timestamp}${random}`
  }

  // Generate QR Code
  const generateQRCode = (memberId) => {
    return `${memberId}QR2024`
  }

  // Calculate dates
  const calculateDates = (duration) => {
    const startDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + parseInt(duration))
    
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    }
  }

  // Calculate price with discount
  const calculatePrice = () => {
    const selectedService = services.find(s => s.name === formData.membershipType)
    if (!selectedService) return 0
    
    const basePrice = selectedService.price * parseInt(formData.duration)
    const discountAmount = (basePrice * formData.discount) / 100
    return basePrice - discountAmount
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الجوال مطلوب'
    } else if (!/^05\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'رقم الجوال غير صحيح (يجب أن يبدأ بـ 05 ويحتوي على 10 أرقام)'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح'
    }
    
    if (!formData.membershipType) {
      newErrors.membershipType = 'نوع الاشتراك مطلوب'
    }
    
    if (formData.discount < 0 || formData.discount > 100) {
      newErrors.discount = 'نسبة الخصم يجب أن تكون بين 0 و 100'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const memberId = generateMemberId()
      const qrCode = generateQRCode(memberId)
      const { startDate, endDate } = calculateDates(formData.duration)
      const finalPrice = calculatePrice()
      
      const newMember = {
        id: memberId,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        membershipType: formData.membershipType,
        startDate,
        endDate,
        status: 'نشط',
        qrCode,
        visits: 0,
        totalSpent: finalPrice,
        lastVisit: null,
        notes: formData.notes.trim(),
        discount: formData.discount,
        duration: parseInt(formData.duration)
      }
      
      onAddMember(newMember)
      handleClose()
      
      // Show success message
      alert(`تم إضافة العضوة بنجاح!\nرقم العضوية: ${memberId}\nكود QR: ${qrCode}\nالمبلغ المطلوب: ${finalPrice} ريال`)
      
    } catch (error) {
      console.error('Error adding member:', error)
      alert('حدث خطأ أثناء إضافة العضوة')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle form close
  const handleClose = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      membershipType: '',
      duration: '1',
      notes: '',
      discount: 0
    })
    setErrors({})
    setIsSubmitting(false)
    onClose()
  }

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-purple-600" />
            إضافة مشتركة جديدة
          </DialogTitle>
          <DialogDescription>
            أدخل معلومات العضوة الجديدة لإنشاء اشتراك
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-600" />
              المعلومات الشخصية
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">الاسم الكامل *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="مثال: سارة أحمد محمد"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="phone">رقم الجوال *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="0501234567"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@email.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Membership Information */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Crown className="w-4 h-4 text-blue-600" />
              معلومات الاشتراك
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="membershipType">نوع الاشتراك *</Label>
                <Select value={formData.membershipType} onValueChange={(value) => handleInputChange('membershipType', value)}>
                  <SelectTrigger className={errors.membershipType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="اختر نوع الاشتراك" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.filter(s => s.category === 'اشتراك').map(service => (
                      <SelectItem key={service.id} value={service.name}>
                        {service.name} - {service.price} ريال
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.membershipType && <p className="text-red-500 text-sm mt-1">{errors.membershipType}</p>}
              </div>
              
              <div>
                <Label htmlFor="duration">المدة (بالأشهر)</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">شهر واحد</SelectItem>
                    <SelectItem value="3">3 أشهر</SelectItem>
                    <SelectItem value="6">6 أشهر</SelectItem>
                    <SelectItem value="12">سنة كاملة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="discount">نسبة الخصم (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={(e) => handleInputChange('discount', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className={errors.discount ? 'border-red-500' : ''}
                />
                {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount}</p>}
              </div>
            </div>
            
            {/* Price Calculation */}
            {formData.membershipType && (
              <div className="mt-4 p-3 bg-white rounded-lg border">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">المبلغ الإجمالي:</span>
                  <div className="text-right">
                    {formData.discount > 0 && (
                      <div className="text-sm text-gray-500 line-through">
                        {(services.find(s => s.name === formData.membershipType)?.price * parseInt(formData.duration) || 0).toLocaleString()} ريال
                      </div>
                    )}
                    <div className="text-lg font-bold text-green-600">
                      {calculatePrice().toLocaleString()} ريال
                    </div>
                    {formData.discount > 0 && (
                      <div className="text-sm text-orange-600">
                        خصم {formData.discount}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <Label htmlFor="notes">ملاحظات إضافية</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="أي ملاحظات خاصة بالعضوة..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  جاري الإضافة...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 ml-2" />
                  إضافة العضوة
                </>
              )}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
              className="border-gray-300"
            >
              <X className="w-4 h-4 ml-2" />
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddMemberDialog

