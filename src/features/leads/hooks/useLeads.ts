import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { 
  fetchLeads, 
  setSearchQuery, 
  setStatusFilter, 
  setSourceFilter,
  setAssignedToFilter,
  setCurrentPage,
  addLead,
  updateLead,
  deleteLead
} from '../leadsSlice';
import type { LeadStatus } from '../../../types/api.types';
import type { Lead } from '../leadsTypes';

export const useLeads = () => {
  const dispatch = useAppDispatch();
  const { 
    leads, 
    status, 
    error, 
    searchQuery, 
    statusFilter, 
    sourceFilter,
    assignedToFilter,
    currentPage, 
    pageSize 
  } = useAppSelector((state) => state.leads);

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

      const matchesSource =
        sourceFilter === 'All' || lead.source === sourceFilter;

      const matchesAssigned =
        assignedToFilter === 'All' || lead.assignedTo === assignedToFilter;

      return matchesSearch && matchesStatus && matchesSource && matchesAssigned;
    });
  }, [leads, searchQuery, statusFilter, sourceFilter, assignedToFilter]);

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
    sourceFilter,
    assignedToFilter,
    currentPage,
    totalPages,
    pageSize,
    setSearchQuery: (q: string) => dispatch(setSearchQuery(q)),
    setStatusFilter: (s: LeadStatus | 'All') => dispatch(setStatusFilter(s)),
    setSourceFilter: (s: string) => dispatch(setSourceFilter(s)),
    setAssignedToFilter: (a: string) => dispatch(setAssignedToFilter(a)),
    setCurrentPage: (p: number) => dispatch(setCurrentPage(p)),
    addLead: (l: Lead) => dispatch(addLead(l)),
    updateLead: (l: Lead) => dispatch(updateLead(l)),
    deleteLead: (id: string) => dispatch(deleteLead(id)),
  };
};