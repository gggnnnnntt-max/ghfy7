import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Save, X, DollarSign, Percent, Tag, Package } from 'lucide-react'

const EditServiceDialog = ({ isOpen, onClose, onSaveService, service }) => {
  const [formData, setFormData] = useState(service || {})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (service) {
      setFormData({
        ...service,
        discount: service.discount || 0,
        description: service.description || ''
      })
    }
  }, [service])

  // Calculate discounted price
  const calculateDiscountedPrice = () => {
    if (!formData.price || !formData.discount) return formData.price || 0
    return formData.price - (formData.price * formData.discount / 100)
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name?.trim()) {
      newErrors.name = 'اسم الخدمة مطلوب'
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'السعر يجب أن يكون أكبر من صفر'
    }
    
    if (formData.discount < 0 || formData.discount > 100) {
      newErrors.discount = 'نسبة الخصم يجب أن تكون بين 0 و 100'
    }
    
    if (!formData.category) {
      newErrors.category = 'فئة الخدمة مطلوبة'
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
      const updatedService = {
        ...formData,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0,
        finalPrice: calculateDiscountedPrice()
      }
      
      onSaveService(updatedService)
      handleClose()
      
      alert(`تم تحديث خدمة "${updatedService.name}" بنجاح!`)
      
    } catch (error) {
      console.error('Error saving service:', error)
      alert('حدث خطأ أثناء حفظ الخدمة')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle form close
  const handleClose = () => {
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

  if (!formData || !service) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            تعديل الخدمة والأسعار
          </DialogTitle>
          <DialogDescription>
            تعديل معلومات الخدمة والأسعار والخصومات
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Information */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-600" />
              معلومات الخدمة
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">اسم الخدمة *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="مثال: اشتراك شهري VIP"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="category">فئة الخدمة *</Label>
                <Select value={formData.category || ''} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="اشتراك">اشتراك</SelectItem>
                    <SelectItem value="جلسة">جلسة واحدة</SelectItem>
                    <SelectItem value="منتج">منتج</SelectItem>
                    <SelectItem value="خدمة إضافية">خدمة إضافية</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="description">وصف الخدمة</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="وصف مختصر للخدمة..."
                rows={2}
              />
            </div>
          </div>

          {/* Pricing Information */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              معلومات التسعير
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">السعر الأساسي (ريال) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price || ''}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  placeholder="200"
                  className={errors.price ? 'border-red-500' : ''}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
              
              <div>
                <Label htmlFor="discount">نسبة الخصم (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.discount || 0}
                  onChange={(e) => handleInputChange('discount', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className={errors.discount ? 'border-red-500' : ''}
                />
                {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount}</p>}
              </div>
            </div>
            
            {/* Price Preview */}
            <div className="mt-4 p-4 bg-white rounded-lg border">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">معاينة السعر:</span>
                <div className="text-right">
                  {formData.discount > 0 && (
                    <div className="text-sm text-gray-500 line-through">
                      {(formData.price || 0).toLocaleString()} ريال
                    </div>
                  )}
                  <div className="text-xl font-bold text-green-600">
                    {calculateDiscountedPrice().toLocaleString()} ريال
                  </div>
                  {formData.discount > 0 && (
                    <Badge variant="secondary" className="mt-1 bg-orange-100 text-orange-700">
                      <Percent className="w-3 h-3 ml-1" />
                      خصم {formData.discount}%
                    </Badge>
                  )}
                </div>
              </div>
              
              {formData.discount > 0 && (
                <div className="mt-2 text-sm text-green-600">
                  توفير: {((formData.price || 0) - calculateDiscountedPrice()).toLocaleString()} ريال
                </div>
              )}
            </div>
          </div>

          {/* Service Status */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
            <h3 className="font-semibold text-lg mb-4">حالة الخدمة</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">الحالة</Label>
                <Select value={formData.status || 'متاح'} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="متاح">متاح</SelectItem>
                    <SelectItem value="غير متاح">غير متاح</SelectItem>
                    <SelectItem value="قريباً">قريباً</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="duration">المدة (للاشتراكات)</Label>
                <Select value={String(formData.duration || 1)} onValueChange={(value) => handleInputChange('duration', parseInt(value))}>
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
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 ml-2" />
                  حفظ التعديلات
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

export default EditServiceDialog

