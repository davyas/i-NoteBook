'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAuth } from '@/contexts/auth-context'
import { Eye, EyeOff, Key, History, LogOut } from 'lucide-react'

// Sample access logs - In production, this would come from an API
const SAMPLE_LOGS = [
  {
    id: '1',
    action: 'Viewed Mathematics Book',
    timestamp: '2024-01-04T10:30:00Z',
    device: 'Chrome / Windows'
  },
  {
    id: '2',
    action: 'Downloaded Question Paper',
    timestamp: '2024-01-04T09:15:00Z',
    device: 'Safari / iOS'
  },
  {
    id: '3',
    action: 'Changed Password',
    timestamp: '2024-01-03T16:45:00Z',
    device: 'Firefox / macOS'
  }
];

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentPin, setCurrentPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPin, setShowPin] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [pinError, setPinError] = useState('')

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match')
      return
    }

    // In production, this would call an API
    console.log('Password changed')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handlePinChange = (e: React.FormEvent) => {
    e.preventDefault()
    setPinError('')

    if (newPin !== confirmPin) {
      setPinError('New PINs do not match')
      return
    }

    if (!/^\d{4}$/.test(newPin)) {
      setPinError('PIN must be 4 digits')
      return
    }

    // In production, this would call an API
    console.log('PIN changed')
    setCurrentPin('')
    setNewPin('')
    setConfirmPin('')
  }

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[#2D3748]">Account Settings</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-[#00B0F0]/10">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your account password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="border-[#00B0F0]/20 focus-visible:ring-[#00B0F0]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border-[#00B0F0]/20 focus-visible:ring-[#00B0F0]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-[#00B0F0]/20 focus-visible:ring-[#00B0F0]"
                  />
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00B0F0] to-[#0077A7] hover:opacity-90"
                >
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-[#00B0F0]/10">
            <CardHeader>
              <CardTitle>Change PIN</CardTitle>
              <CardDescription>
                Update your exam access PIN
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePinChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPin">Current PIN</Label>
                  <div className="relative">
                    <Input
                      id="currentPin"
                      type={showPin ? "text" : "password"}
                      value={currentPin}
                      onChange={(e) => setCurrentPin(e.target.value)}
                      maxLength={4}
                      className="border-[#00B0F0]/20 focus-visible:ring-[#00B0F0]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPin(!showPin)}
                    >
                      {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPin">New PIN</Label>
                  <Input
                    id="newPin"
                    type="password"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    maxLength={4}
                    className="border-[#00B0F0]/20 focus-visible:ring-[#00B0F0]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPin">Confirm New PIN</Label>
                  <Input
                    id="confirmPin"
                    type="password"
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    maxLength={4}
                    className="border-[#00B0F0]/20 focus-visible:ring-[#00B0F0]"
                  />
                </div>
                {pinError && (
                  <p className="text-red-500 text-sm">{pinError}</p>
                )}
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00B0F0] to-[#0077A7] hover:opacity-90"
                >
                  Update PIN
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="border-[#00B0F0]/10">
          <CardHeader>
            <CardTitle>Access Logs</CardTitle>
            <CardDescription>
              Recent activity on your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Device</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SAMPLE_LOGS.map(log => (
                  <TableRow key={log.id}>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{log.device}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-[#00B0F0]/10">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>
              Careful, these actions cannot be undone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive"
              onClick={() => {
                if (confirm('Are you sure you want to logout?')) {
                  logout()
                }
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout from all devices
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}