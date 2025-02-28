'use client';

import { useEffect, useState } from 'react';
import { useCreateStore } from '@/store/createStore';

export default function ContractsPage() {
  const [yamlData, setYamlData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { contracts } = useCreateStore();

  useEffect(() => {
    const fetchContractsData = async () => {
      try {
        const response = await fetch(`/api/editor/metadata?contracts=${JSON.stringify(contracts)}`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setYamlData(data.yaml);
      } catch (err) {
        // @ts-ignore
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchContractsData();
  }, []);

  if (loading)
    return (
      <div className={'flex flex-col gap-2 p-8'}>
        <h1>loading...</h1>
      </div>
    );
  if (error) return <div className={'flex flex-col gap-2 p-8'}>ERROR</div>;

  return (
    <div className={'flex flex-col gap-2 p-8'}>
      <h1>Contract metadata:</h1>
      <pre>{yamlData}</pre>
    </div>
  );
}
