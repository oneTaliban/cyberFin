import api from "./api";

export const analyticsAPI = {
    getFinancialHealth: () => api.get('/analytics/financial-health/'),
    getSpendingTrends: () => api.get('/analytics/spending-trends/'),
    getProductivityTrends: () => api.get('/analytics/productivity-trends/'),
    getBudgetRecommendations: () => api.get('/analytics/budget-recommendations/'),
}