"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchCompanies, fetchCountries, fetchPosts } from "@/lib/api";
import type { Company, Country, Post } from "@/types/emissions";

export function useDashboardData() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [countriesData, companiesData, postsData] = await Promise.all([
        fetchCountries(),
        fetchCompanies(),
        fetchPosts(),
      ]);

      setCountries(countriesData);
      setCompanies(companiesData);
      setPosts(postsData);
    } catch (err) {
      setError("Failed to load dashboard data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void loadData();
    });
  }, [loadData]);

  return {
    countries,
    companies,
    posts,
    loading,
    error,
    refetch: loadData,
  };
}