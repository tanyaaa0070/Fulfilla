"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { CheckCircle, XCircle, AlertTriangle, Bot, ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [stats, setStats] = useState({
    totalUsers: 1248,
    newSignups: 42,
    pendingApprovals: 18,
    openDisputes: 5,
    aiTransactions: 326,
    complianceIssues: 3,
  })

  const [vendorApplications, setVendorApplications] = useState([
    { id: 5001, name: "City Restaurant", type: "Restaurant", date: "2023-06-14" },
    { id: 5002, name: "Green Grocery", type: "Retail Store", date: "2023-06-12" },
    { id: 5003, name: "Farmers Market", type: "Market Stall", date: "2023-06-10" },
  ])

  const approveApplication = (appId, type) => {
    if (type === "vendor") {
      setVendorApplications((prev) => prev.filter((app) => app.id !== appId))
      setStats((prev) => ({ ...prev, pendingApprovals: prev.pendingApprovals - 1 }))
    }
    alert(`Application #${appId} approved successfully!`)
  }

  const rejectApplication = (appId, type) => {
    if (type === "vendor") {
      setVendorApplications((prev) => prev.filter((app) => app.id !== appId))
      setStats((prev) => ({ ...prev, pendingApprovals: prev.pendingApprovals - 1 }))
    }
    alert(`Application #${appId} rejected.`)
  }

  const approveBarterExchange = () => {
    alert("Barter exchange BX-1001 approved successfully!")
  }

  const flagBarterExchange = () => {
    alert("Barter exchange BX-1001 flagged for review.")
  }

  const verifyMapEntry = () => {
    alert("Map entry ME-2001 verified and published.")
  }

  const rejectMapEntry = () => {
    alert("Map entry ME-2001 rejected.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Header with Background */}
      <div
        className="relative h-56 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/placeholder.svg?height=250&width=1200')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/85 to-indigo-600/85"></div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 bg-white/20 rounded-full p-3">
                  <Image src="/logo.png" alt="Fulfilla Logo" fill className="object-contain" />
                </div>
                <div className="text-white">
                  <h1 className="text-4xl font-bold">⚙️ Admin Portal</h1>
                  <p className="text-xl opacity-90">For platform management, monitoring, and ensuring compliance</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="bg-white/20 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3"
                onClick={() => (window.location.href = "/")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 bg-white shadow-lg rounded-lg h-14">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white font-medium"
            >
              📊 Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="approvals"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white font-medium"
            >
              ✅ Approvals
            </TabsTrigger>
            <TabsTrigger
              value="compliance"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white font-medium"
            >
              🛡️ Compliance
            </TabsTrigger>
            <TabsTrigger
              value="ai_oversight"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white font-medium"
            >
              🤖 AI Oversight
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white font-medium"
            >
              👥 Users
            </TabsTrigger>
            <TabsTrigger
              value="disputes"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white font-medium"
            >
              ⚖️ Disputes
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white font-medium"
            >
              📈 Reports
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white font-medium"
            >
              ⚙️ Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">👥 {stats.totalUsers}</div>
                  <div className="text-sm opacity-90">Total Users</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">🆕 {stats.newSignups}</div>
                  <div className="text-sm opacity-90">New Signups</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">⏳ {stats.pendingApprovals}</div>
                  <div className="text-sm opacity-90">Pending Approvals</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-red-400 to-red-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">⚖️ {stats.openDisputes}</div>
                  <div className="text-sm opacity-90">Open Disputes</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">🤖 {stats.aiTransactions}</div>
                  <div className="text-sm opacity-90">AI Transactions</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">⚠️ {stats.complianceIssues}</div>
                  <div className="text-sm opacity-90">Compliance Issues</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <span>📋 Recent Platform Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-green-50 to-white hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <span className="font-medium">✅ New vendor application approved</span>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-blue-50 to-white hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <Bot className="h-6 w-6 text-blue-500" />
                      <span className="font-medium">🤖 AI Bargain Bot completed 15 negotiations</span>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">4 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-orange-50 to-white hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-6 w-6 text-orange-500" />
                      <span className="font-medium">🚨 Safety incident reported in Market Square</span>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">6 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="mt-8">
            <Card className="bg-white shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <span>✅ Pending Vendor Applications</span>
                </CardTitle>
                <CardDescription>Review and approve new vendor registrations</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {vendorApplications.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-6 border border-gray-200 rounded-xl bg-gradient-to-r from-white to-gray-50 hover:shadow-lg transition-all duration-300"
                    >
                      <div>
                        <h3 className="font-bold text-lg mb-2">🏪 {app.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">📂 Type: {app.type}</p>
                        <p className="text-sm text-gray-600">📅 Applied: {app.date}</p>
                      </div>
                      <div className="flex space-x-3">
                        <Button
                          size="sm"
                          onClick={() => approveApplication(app.id, "vendor")}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-3"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />✅ Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => rejectApplication(app.id, "vendor")}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-3"
                        >
                          <XCircle className="h-4 w-4 mr-2" />❌ Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="mt-8">
            <div className="space-y-8">
              {/* Magic Pantry Barter Exchanges */}
              <Card className="bg-white shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <span>🔄 Magic Pantry Barter Exchanges</span>
                    <Badge className="bg-green-100 text-green-800 px-3 py-1">🛡️ Fraud Checks</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 border border-gray-200 rounded-xl bg-gradient-to-r from-white to-gray-50 hover:shadow-lg transition-all duration-300">
                      <div>
                        <h4 className="font-bold text-lg mb-2">🔄 BX-1001</h4>
                        <p className="text-sm text-gray-600 mb-1">👥 VendorA ↔ VendorB</p>
                        <p className="text-sm text-gray-600">🥕 Carrots(10kg) ↔ 🥬 Cabbage(8kg) - ₹29.00</p>
                      </div>
                      <div className="flex space-x-3">
                        <Button
                          size="sm"
                          onClick={approveBarterExchange}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-3"
                        >
                          ✅ Approve
                        </Button>
                        <Button
                          size="sm"
                          onClick={flagBarterExchange}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-3"
                        >
                          🚩 Flag
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Crowd-Sourced Map Entries */}
              <Card className="bg-white shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <span>🗺️ Crowd-Sourced Map Entries</span>
                    <Badge className="bg-orange-100 text-orange-800 px-3 py-1">🚔 Police/Hafta</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 border border-gray-200 rounded-xl bg-gradient-to-r from-white to-gray-50 hover:shadow-lg transition-all duration-300">
                      <div>
                        <h4 className="font-bold text-lg mb-2">📍 ME-2001</h4>
                        <p className="text-sm text-gray-600 mb-1">🏪 Market Square - Police Checkpoint</p>
                        <p className="text-sm text-gray-600">👤 Reported by: VendorX</p>
                      </div>
                      <div className="flex space-x-3">
                        <Button
                          size="sm"
                          onClick={verifyMapEntry}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-3"
                        >
                          ✅ Verify
                        </Button>
                        <Button
                          size="sm"
                          onClick={rejectMapEntry}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-3"
                        >
                          ❌ Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai_oversight" className="mt-8">
            <div className="space-y-8">
              {/* Smart Bargain Bot Transactions */}
              <Card className="bg-white shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <span>🤖 Smart Bargain Bot Transactions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 border border-gray-200 rounded-xl bg-gradient-to-r from-white to-gray-50 hover:shadow-lg transition-all duration-300">
                      <div>
                        <h4 className="font-bold text-lg mb-2">🤖 BB-4001</h4>
                        <p className="text-sm text-gray-600 mb-1">👥 VendorA ↔ SupplierX</p>
                        <p className="text-sm text-gray-600">💰 ₹2.90/kg → ₹2.60/kg (10.3% savings)</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 px-4 py-2 text-lg">✅ Completed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Voice AI Dialect Packs */}
              <Card className="bg-white shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <span>🎤 Voice AI Dialect Packs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 border border-gray-200 rounded-xl bg-gradient-to-r from-white to-gray-50 hover:shadow-lg transition-all duration-300">
                      <div>
                        <h4 className="font-bold text-lg mb-2">🗣️ DP-5001</h4>
                        <p className="text-sm text-gray-600 mb-1">🇮🇳 Hindi - Bhojpuri</p>
                        <p className="text-sm text-gray-600">👨‍🏫 Submitted by: Linguist Team</p>
                      </div>
                      <div className="flex space-x-3">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-3"
                        >
                          ✅ Approve
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-3"
                        >
                          ❌ Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Keep other tab contents with similar enhanced styling */}
        </Tabs>
      </main>
    </div>
  )
}
