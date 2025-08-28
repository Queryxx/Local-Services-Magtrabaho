import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  ArrowLeft,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Briefcase,
  TrendingUp,
  Filter,
} from "lucide-react-native";
import { Transaction, ClientTransaction, WorkerTransaction, isClientTransaction, isWorkerTransaction } from "../types/transaction";
import { LinearGradient } from "expo-linear-gradient";

export default function TransactionHistory() {
  const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">("all");
  const [userType, setUserType] = useState<"client" | "worker">("client");

  // Mock transaction data for clients
  const clientTransactions: ClientTransaction[] = [
    {
      id: "1",
      title: "Laundry Service",
      worker: "Maria Santos",
      date: "May 12, 2023",
      amount: "₱450.00",
      status: "completed",
      type: "expense",
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    },
    {
      id: "2",
      title: "Construction Work",
      worker: "Juan dela Cruz",
      date: "May 5, 2023",
      amount: "₱875.00",
      status: "completed",
      type: "expense",
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    },
    {
      id: "3",
      title: "Math Tutoring",
      worker: "Ana Reyes",
      date: "Apr 28, 2023",
      amount: "₱1,200.00",
      status: "pending",
      type: "expense",
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    },
    {
      id: "4",
      title: "Rice Field Work",
      worker: "Pedro Mendoza",
      date: "Apr 20, 2023",
      amount: "₱320.00",
      status: "completed",
      type: "expense",
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    },
    {
      id: "5",
      title: "Private Driver",
      worker: "Ramon Hernandez",
      date: "Apr 15, 2023",
      amount: "₱180.00",
      status: "completed",
      type: "expense",
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    },
  ];

  // Mock transaction data for workers
  const workerTransactions: WorkerTransaction[] = [
    {
      id: "1",
      title: "Laundry Service",
      client: "Rosario Ramos",
      date: "May 12, 2023",
      amount: "₱450.00",
      status: "completed",
      type: "income",
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    },
    {
      id: "2",
      title: "Construction Work",
      client: "Antonio Gonzales",
      date: "May 5, 2023",
      amount: "₱875.00",
      status: "completed",
      type: "income",
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    },
    {
      id: "3",
      title: "Math Tutoring",
      client: "Isabella Cruz",
      date: "Apr 28, 2023",
      amount: "₱1,200.00",
      status: "pending",
      type: "income",
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    },
    {
      id: "4",
      title: "Rice Field Work",
      client: "Fernando Torres",
      date: "Apr 20, 2023",
      amount: "₱320.00",
      status: "completed",
      type: "income",
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    },
    {
      id: "5",
      title: "Private Driver",
      client: "Carmen Velasco",
      date: "Apr 15, 2023",
      amount: "₱180.00",
      status: "completed",
      type: "income",
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    },
  ];

  const transactions = userType === "client" ? clientTransactions : workerTransactions;

  const filteredTransactions = transactions.filter(transaction => {
    if (activeTab === "all") return true;
    return transaction.type === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100";
      case "pending":
        return "bg-amber-100";
      case "cancelled":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-700";
      case "pending":
        return "text-amber-700";
      case "cancelled":
        return "text-red-700";
      default:
        return "text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle color="#10b981" size={16} />;
      case "pending":
        return <Clock color="#f59e0b" size={16} />;
      case "cancelled":
        return <XCircle color="#ef4444" size={16} />;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <LinearGradient
        colors={["#6366f1", "#8b5cf6"]}
        className="px-6 pt-12 pb-8 rounded-b-3xl"
      >
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity className="w-10 h-10 items-center justify-center">
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Transaction History</Text>
          <TouchableOpacity className="w-10 h-10 items-center justify-center">
            <Filter color="white" size={20} />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-center mb-6">
          <View className="bg-white/20 rounded-full p-1 flex-row">
            <TouchableOpacity 
              className={`px-4 py-2 rounded-full ${userType === "client" ? "bg-white" : ""}`}
              onPress={() => setUserType("client")}
            >
              <Text className={`${userType === "client" ? "text-indigo-600 font-bold" : "text-white"}`}>
                Client
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`px-4 py-2 rounded-full ${userType === "worker" ? "bg-white" : ""}`}
              onPress={() => setUserType("worker")}
            >
              <Text className={`${userType === "worker" ? "text-indigo-600 font-bold" : "text-white"}`}>
                Worker
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white/20 rounded-2xl p-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white/80">Total Balance</Text>
              <Text className="text-white text-2xl font-bold">
                {userType === "client" ? "-₱2,045.00" : "₱2,945.00"}
              </Text>
            </View>
            <View className="bg-white/20 w-10 h-10 rounded-full items-center justify-center">
              <Text className="text-white text-xl font-bold">₱</Text>
            </View>
          </View>
          
          <View className="flex-row justify-between mt-4">
            <View className="items-center">
              <Text className="text-white/80 text-sm">Income</Text>
              <Text className="text-white font-bold">₱2,945.00</Text>
            </View>
            <View className="items-center">
              <Text className="text-white/80 text-sm">Expenses</Text>
              <Text className="text-white font-bold">-₱2,045.00</Text>
            </View>
            <View className="items-center">
              <Text className="text-white/80 text-sm">Net</Text>
              <Text className="text-white font-bold">₱900.00</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View className="flex-1 px-6 -mt-6">
        <View className="flex-row bg-white rounded-xl p-2 mb-6 shadow-sm">
          <TouchableOpacity 
            className={`flex-1 items-center py-2 rounded-lg ${activeTab === "all" ? "bg-indigo-500" : ""}`}
            onPress={() => setActiveTab("all")}
          >
            <Text className={`font-medium ${activeTab === "all" ? "text-white" : "text-gray-700"}`}>
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 items-center py-2 rounded-lg ${activeTab === "income" ? "bg-indigo-500" : ""}`}
            onPress={() => setActiveTab("income")}
          >
            <Text className={`font-medium ${activeTab === "income" ? "text-white" : "text-gray-700"}`}>
              Income
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 items-center py-2 rounded-lg ${activeTab === "expense" ? "bg-indigo-500" : ""}`}
            onPress={() => setActiveTab("expense")}
          >
            <Text className={`font-medium ${activeTab === "expense" ? "text-white" : "text-gray-700"}`}>
              Expenses
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
        >
          {filteredTransactions.map((transaction) => (
            <View 
              key={transaction.id} 
              className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-row">
                  <Image 
                    source={{ uri: transaction.avatar }} 
                    className="w-12 h-12 rounded-full mr-3" 
                  />
                  <View>
                    <Text className="font-bold text-gray-800">{transaction.title}</Text>
                    <Text className="text-gray-600">
                      {isClientTransaction(transaction) ? 
                        transaction.worker : 
                        isWorkerTransaction(transaction) ? transaction.client : ''
                      }
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Calendar size={14} color="#9ca3af" className="mr-1" />
                      <Text className="text-gray-500 text-sm">{transaction.date}</Text>
                    </View>
                  </View>
                </View>
                
                <View className="items-end">
                  <Text className={`font-bold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "income" ? "+" : "-"}{transaction.amount}
                  </Text>
                  <View className={`flex-row items-center px-2 py-1 rounded-full mt-2 ${getStatusColor(transaction.status)}`}>
                    {getStatusIcon(transaction.status)}
                    <Text className={`text-xs ml-1 ${getStatusTextColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
          
          {filteredTransactions.length === 0 && (
            <View className="bg-white rounded-2xl p-8 items-center justify-center">
              <Briefcase color="#9ca3af" size={48} />
              <Text className="text-gray-500 mt-4 text-center">
                No transactions found for this filter
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}