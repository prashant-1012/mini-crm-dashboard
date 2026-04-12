import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchLeads, setSearchQuery, setStatusFilter, setCurrentPage } from '../leadsSlice';
import type { LeadStatus } from '../../../types/api.types';

export const useLeads = () => {
  const dispatch = useAppDispatch();
  const { leads, status, error, searchQuery, statusFilter, currentPage, pageSize } =
    useAppSelector((state) => state.leads);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLeads());
    }
  }, [status, dispatch]);

  // useMemo means this only recalculates when leads/searchQuery/statusFilter changes.
  // Without useMemo, this would re-run on every single render — wasteful.
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  // Pagination math — slice the filtered array for current page
  const totalPages = Math.ceil(filteredLeads.length / pageSize);
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLeads.slice(start, start + pageSize);
  }, [filteredLeads, currentPage, pageSize]);

  return {
    leads: paginatedLeads,
    totalLeads: filteredLeads.length,
    status,
    error,
    searchQuery,
    statusFilter,
    currentPage,
    totalPages,
    pageSize,
    setSearchQuery: (q: string) => dispatch(setSearchQuery(q)),
    setStatusFilter: (s: LeadStatus | 'All') => dispatch(setStatusFilter(s)),
    setCurrentPage: (p: number) => dispatch(setCurrentPage(p)),
  };
};