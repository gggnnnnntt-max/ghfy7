import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Camera, QrCode, X, CheckCircle, AlertCircle, Scan, ScanLine } from 'lucide-react'
import { Badge } from '@/components/ui/badge.jsx'

const QRScanner = ({ isOpen, onClose, onScanSuccess, members }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [manualCode, setManualCode] = useState('')
  const [scanResult, setScanResult] = useState(null)
  const [error, setError] = useState('')
  const [stream, setStream] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const scanIntervalRef = useRef(null)

  // Start camera with better error handling
  const startCamera = async () => {
    try {
      setError('')
      setIsProcessing(true)
      
      // Request camera permission
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera if available
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 }
        }
      })
      
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        await videoRef.current.play()
        
        // Start scanning after video is ready
        videoRef.current.addEventListener('loadedmetadata', () => {
          setIsScanning(true)
          setIsProcessing(false)
          startQRDetection()
        })
      }
    } catch (err) {
      setIsProcessing(false)
      if (err.name === 'NotAllowedError') {
        setError('تم رفض الوصول للكاميرا. يرجى السماح للموقع بالوصول للكاميرا من إعدادات المتصفح.')
      } else if (err.name === 'NotFoundError') {
        setError('لم يتم العثور على كاميرا. تأكد من وجود كاميرا متصلة بالجهاز.')
      } else {
        setError('خطأ في الوصول للكاميرا: ' + err.message)
      }
      console.error('Camera access error:', err)
    }
  }

  // QR Detection using Canvas
  const startQRDetection = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current)
    }
    
    scanIntervalRef.current = setInterval(() => {
      if (videoRef.current && canvasRef.current && isScanning) {
        detectQRCode()
      }
    }, 500) // Scan every 500ms
  }

  // Detect QR code from video frame
  const detectQRCode = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      return
    }

    const ctx = canvas.getContext('2d')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    
    // Get image data for QR detection
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    
    // Simple QR pattern detection (basic implementation)
    // In a real app, you'd use a proper QR library like jsQR
    try {
      const qrCode = detectQRPattern(imageData)
      if (qrCode) {
        handleCodeDetected(qrCode)
      }
    } catch (err) {
      console.log('QR detection error:', err)
    }
  }

  // Basic QR pattern detection (simplified)
  const detectQRPattern = (imageData) => {
    // This is a simplified simulation
    // In reality, you'd use a proper QR detection algorithm
    
    // For demo purposes, we'll simulate finding QR codes
    const simulatedCodes = ['GYM001QR2024', 'GYM002QR2024', 'GYM003QR2024']
    
    // Simulate random detection after some time
    if (Math.random() > 0.95) { // 5% chance per scan
      return simulatedCodes[Math.floor(Math.random() * simulatedCodes.length)]
    }
    
    return null
  }

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current)
      scanIntervalRef.current = null
    }
    setIsScanning(false)
    setIsProcessing(false)
  }

  // Handle detected QR code
  const handleCodeDetected = (code) => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current)
    }
    
    const member = members.find(m => m.qrCode === code)
    if (member) {
      setScanResult({
        code,
        member,
        status: member.status === 'نشط' ? 'active' : 'expired'
      })
      stopCamera()
      setError('')
    } else {
      setError('كود العضوية غير صحيح أو غير موجود')
    }
  }

  // Handle manual code verification
  const handleManualVerification = () => {
    if (!manualCode.trim()) {
      setError('يرجى إدخال كود العضوية')
      return
    }

    const member = members.find(m => m.qrCode === manualCode.trim())
    if (member) {
      setScanResult({
        code: manualCode.trim(),
        member,
        status: member.status === 'نشط' ? 'active' : 'expired'
      })
      setManualCode('')
      setError('')
    } else {
      setError('كود العضوية غير صحيح أو غير موجود')
    }
  }

  // Confirm entry
  const confirmEntry = () => {
    if (scanResult && onScanSuccess) {
      onScanSuccess(scanResult.member)
    }
    handleClose()
  }

  // Handle dialog close
  const handleClose = () => {
    stopCamera()
    setScanResult(null)
    setError('')
    setManualCode('')
    onClose()
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-purple-600" />
            مسح كود العضوية
          </DialogTitle>
          <DialogDescription>
            استخدم الكاميرا لمسح كود QR أو أدخل الكود يدوياً
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Scan Result */}
          {scanResult && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {scanResult.member.name.split(' ')[0]?.charAt(0)}{scanResult.member.name.split(' ')[1]?.charAt(0)}
                </div>
                <h3 className="text-lg font-bold">{scanResult.member.name}</h3>
                <p className="text-sm text-gray-600">رقم العضوية: {scanResult.member.id}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">حالة الاشتراك:</span>
                  <Badge 
                    variant={scanResult.status === 'active' ? 'default' : 'destructive'}
                    className={scanResult.status === 'active' ? 
                      'bg-gradient-to-r from-green-500 to-emerald-500' : 
                      'bg-gradient-to-r from-red-500 to-rose-500'
                    }
                  >
                    {scanResult.status === 'active' ? (
                      <>
                        <CheckCircle className="w-3 h-3 ml-1" />
                        نشط
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 ml-1" />
                        منتهي
                      </>
                    )}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">نوع الاشتراك:</span>
                  <span className="font-medium">{scanResult.member.membershipType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">تاريخ الانتهاء:</span>
                  <span>{scanResult.member.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">عدد الزيارات:</span>
                  <span className="font-bold text-purple-600">{scanResult.member.visits}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button 
                  onClick={confirmEntry}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
                  disabled={scanResult.status !== 'active'}
                >
                  <CheckCircle className="w-4 h-4 ml-1" />
                  {scanResult.status === 'active' ? 'تأكيد الدخول' : 'اشتراك منتهي'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setScanResult(null)}
                  className="border-purple-200"
                >
                  مسح آخر
                </Button>
              </div>
            </div>
          )}

          {/* Camera Scanner */}
          {!scanResult && (
            <>
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-xl overflow-hidden relative">
                  {isScanning ? (
                    <div className="relative">
                      <video
                        ref={videoRef}
                        className="w-full h-64 object-cover"
                        autoPlay
                        playsInline
                        muted
                      />
                      <canvas ref={canvasRef} className="hidden" />
                      
                      {/* Enhanced Scanning overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 border-2 border-purple-500 rounded-lg relative">
                          {/* Corner indicators */}
                          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-purple-500 rounded-tl-lg"></div>
                          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-purple-500 rounded-tr-lg"></div>
                          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-purple-500 rounded-bl-lg"></div>
                          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-purple-500 rounded-br-lg"></div>
                          
                          {/* Animated scanning line */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
                          </div>
                          
                          {/* Scanning icon */}
                          <div className="absolute top-2 right-2">
                            <ScanLine className="w-4 h-4 text-purple-500 animate-spin" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                          <Scan className="w-4 h-4 animate-pulse" />
                          وجه الكاميرا نحو كود QR
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                      <div className="text-center">
                        {isProcessing ? (
                          <>
                            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">جاري تشغيل الكاميرا...</p>
                          </>
                        ) : (
                          <>
                            <Camera className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-4">اضغط لتشغيل الكاميرا</p>
                            <Button onClick={startCamera} className="bg-gradient-to-r from-purple-500 to-pink-500">
                              <Camera className="w-4 h-4 ml-2" />
                              تشغيل الكاميرا
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {isScanning && (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={stopCamera} className="flex-1 border-red-200 text-red-600">
                      <X className="w-4 h-4 ml-2" />
                      إيقاف الكاميرا
                    </Button>
                  </div>
                )}
              </div>

              {/* Manual Input */}
              <div className="border-t pt-4">
                <div className="space-y-3">
                  <Label>أو أدخل كود العضوية يدوياً</Label>
                  <div className="flex gap-2">
                    <Input
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      placeholder="مثال: GYM001QR2024"
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && handleManualVerification()}
                    />
                    <Button onClick={handleManualVerification} variant="outline">
                      <QrCode className="w-4 h-4 ml-1" />
                      تحقق
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default QRScanner

