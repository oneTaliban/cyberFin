import React, {useState, useEffect} from "react";
import {analyticsAPI} from '../services/analytics';

export const useAnalytics = () => {
    const [financialHealth, setFinancialHealth] = useState(null);
    const [spendingTrends, setSpendingTrends] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFinancialHealth = async () => {
        try {
            const response = await analyticsAPI.getFinancialHealth();
            setFinancialHealth(response.data);
        } catch (error) {
            console.error("Error fetching financial health: ", error);
        }
    };

    const fetchingSpendingTrends = async () => {
        try {
            const response = await analyticsAPI.getSpendingTrends();
            setSpendingTrends(response.data);
        } catch (error) {
            console.errorr("Error fetching spending trends: ", error);
        }
    };

    useEffect(() => {
        const fetchData =  async () => {
            setLoading(true);
            await Promise.all([fetchFinancialHealth(), fetchingSpendingTrends()]);
            setLoading(false);
        };
        fetchData();
    }, []);

    return {
        financialHealth,
        spendingTrends,
        loading,
    };
};