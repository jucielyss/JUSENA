
import React from 'react';
import { Job } from './types';

export const COLORS = {
  primary: '#2563eb',   // Azul 600
  secondary: '#16a34a', // Verde 600
  warning: '#f59e0b',   // Amarelo/Amber 500
  accent: '#475569',    // Cinza 600 (Slate)
  background: '#020617' // Cinza 950 (Slate)
};

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Repositor de Estoque',
    company: 'Mercado do Bairro',
    companyType: 'market',
    salary: 'R$ 1.450,00',
    shift: 'morning',
    distance: 0.5,
    location: { lat: -23.5505, lng: -46.6333, address: 'Rua das Flores, 123' },
    description: 'Organização de prateleiras e controle de validade.',
    requirements: ['Agilidade', 'Morar perto'],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Atendente de Balcão',
    company: 'Padaria Pão de Mel',
    companyType: 'bakery',
    salary: 'R$ 1.600,00',
    shift: 'afternoon',
    distance: 1.2,
    location: { lat: -23.5520, lng: -46.6350, address: 'Av. Paulista, 456' },
    description: 'Atendimento ao cliente e preparo de lanches rápidos.',
    requirements: ['Boa comunicação', 'Higiene'],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Auxiliar de Cozinha',
    company: 'Restaurante Sabor Local',
    companyType: 'restaurant',
    salary: 'R$ 1.800,00',
    shift: 'night',
    distance: 2.5,
    location: { lat: -23.5480, lng: -46.6300, address: 'Rua Augusta, 789' },
    description: 'Auxílio no preparo de pratos e limpeza da cozinha.',
    requirements: ['Disponibilidade noturna', 'Trabalho em equipe'],
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Operador de Caixa',
    company: 'Farmácia Saúde Total',
    companyType: 'pharmacy',
    salary: 'R$ 1.550,00',
    shift: 'flexible',
    distance: 0.8,
    location: { lat: -23.5510, lng: -46.6320, address: 'Rua São Bento, 101' },
    description: 'Operação de caixa e organização de perfumaria.',
    requirements: ['Conhecimento básico de informática'],
    createdAt: new Date().toISOString()
  }
];
